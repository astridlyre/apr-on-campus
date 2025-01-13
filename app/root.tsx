import { User } from "@prisma/client";
import { Partytown } from "@qwik.dev/partytown/react";
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
import Paragraph from "~/components/Paragraph";
import Section from "~/components/Section";
import TextLink from "~/components/TextLink";
import { csrf } from "~/csrf.server";
import { honeypot } from "~/honeypot.server";
import Layout from "~/layout";
import { getUser } from "~/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    type: "image/png",
    href: "/favicon-96x96.png",
    sizes: "96x96",
  },
  {
    rel: "shortcut icon",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/apple-touch-icon.png",
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  const [token, cookieHeader] = await csrf.commitToken();
  const headers = cookieHeader ? { "set-cookie": cookieHeader } : undefined;
  const honeypotInputProps = honeypot.getInputProps();
  return data({ user, token, honeypotInputProps }, { headers });
};

export default function App() {
  const data = useLoaderData<typeof loader>();
  const { token, honeypotInputProps, user } = data as unknown as {
    token: string;
    honeypotInputProps: Record<string, string>;
    user: User;
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="APR on Campus is a reporting platform that collects and documents instances of Anti-Palestinian Racism (APR) in Canadian educational institutions."
        />
        <meta name="author" content="APR on Campus" />
        <meta property="og:title" content="APR on Campus" />
        <meta
          property="og:description"
          content="APR on Campus is a reporting platform that collects and documents instances of Anti-Palestinian Racism (APR) in Canadian educational institutions."
        />
        <meta property="og:url" content="https://apr-on-campus.org/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://apr-on-campus.org/" />
        <meta name="twitter:title" content="APR on Campus" />
        <meta
          name="twitter:description"
          content="APR on Campus is a reporting platform that collects and documents instances of Anti-Palestinian Racism (APR) in Canadian educational institutions."
        />
        <meta name="apple-mobile-web-app-title" content="APR on Campus" />
        <Partytown forward={["dataLayer.push"]} />
        <script
          type="text/partytown"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L0CZ4FVN1Y"
        />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-L0CZ4FVN1Y');
      `,
          }}
        />
        <Links />
        <Meta />
      </head>
      <body>
        <AuthenticityTokenProvider token={token}>
          <HoneypotProvider {...honeypotInputProps}>
            <Outlet context={user} />
          </HoneypotProvider>
        </AuthenticityTokenProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="APR on Campus is a reporting platform that collects and documents instances of Anti-Palestinian Racism (APR) in Canadian educational institutions."
        />
        <meta name="author" content="APR on Campus" />
        <meta property="og:title" content="APR on Campus" />
        <meta
          property="og:description"
          content="APR on Campus is a reporting platform that collects and documents instances of Anti-Palestinian Racism (APR) in Canadian educational institutions."
        />
        <meta property="og:url" content="https://apr-on-campus.org/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://apr-on-campus.org/" />
        <meta name="twitter:title" content="APR on Campus" />
        <meta
          name="twitter:description"
          content="APR on Campus is a reporting platform that collects and documents instances of Anti-Palestinian Racism (APR) in Canadian educational institutions."
        />
        <meta name="apple-mobile-web-app-title" content="APR on Campus" />
        <Partytown forward={["dataLayer.push"]} />
        <script
          type="text/partytown"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-L0CZ4FVN1Y"
        />
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-L0CZ4FVN1Y');
      `,
          }}
        />
        <Links />
        <Meta />
      </head>
      <body>
        <Layout>
          <Section title={message}>
            <Paragraph>{details}</Paragraph>
            {stack ? (
              <pre className="w-full overflow-x-auto p-4">
                <code>{stack}</code>
              </pre>
            ) : null}

            <TextLink href="/">Why not go back home?</TextLink>
          </Section>
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
