import { User } from "@prisma/client";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  data,
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { HoneypotProvider } from "remix-utils/honeypot/react";

import stylesheet from "~/app.css?url";
import Footer from "~/components/Footer";
import Navigation from "~/components/Navigation";
import Paragraph from "~/components/Paragraph";
import Section from "~/components/Section";
import TextLink from "~/components/TextLink";
import { csrf } from "~/csrf.server";
import { honeypot } from "~/honeypot.server";
import { getUser } from "~/session.server";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  const [token, cookieHeader] = await csrf.commitToken();
  const headers = cookieHeader ? { "set-cookie": cookieHeader } : undefined;
  const honeypotInputProps = honeypot.getInputProps();
  return data({ user, token, honeypotInputProps }, { headers });
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex min-h-screen flex-col">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const { token, honeypotInputProps, user } = data as unknown as {
    token: string;
    honeypotInputProps: Record<string, string>;
    user: User;
  };

  return (
    <AuthenticityTokenProvider token={token}>
      <HoneypotProvider {...honeypotInputProps}>
        <Navigation user={user} />
        <main className="flex-1">
          <Outlet context={user} />
        </main>
        <Footer />
      </HoneypotProvider>
    </AuthenticityTokenProvider>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Section title={message}>
          <Paragraph>{details}</Paragraph>
          {stack ? (
            <pre className="w-full overflow-x-auto p-4">
              <code>{stack}</code>
            </pre>
          ) : null}

          <TextLink href="/">Why not go back home?</TextLink>
        </Section>
      </main>
      <Footer />
    </>
  );
}
