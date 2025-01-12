import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { data, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { CSRFError } from "remix-utils/csrf/server";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { SpamError } from "remix-utils/honeypot/server";

import Button from "~/components/Button";
import Checkbox from "~/components/Checkbox";
import Section from "~/components/Section";
import TextInput from "~/components/TextInput";
import { csrf } from "~/csrf.server";
import { honeypot } from "~/honeypot.server";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/edit");
  return {};
};

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    await csrf.validate(request);

    const formData = await request.formData();

    honeypot.check(formData);

    const email = formData.get("email");
    const password = formData.get("password");
    const redirectTo = safeRedirect(formData.get("redirectTo"), "/dashboard");
    const remember = formData.get("remember");

    if (!validateEmail(email)) {
      return data(
        { errors: { email: "Email is invalid", password: null } },
        { status: 400 },
      );
    }

    if (typeof password !== "string" || password.length === 0) {
      return data(
        { errors: { email: null, password: "Password is required" } },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return data(
        { errors: { email: null, password: "Password is too short" } },
        { status: 400 },
      );
    }

    const user = await verifyLogin(email, password);

    if (!user) {
      return data(
        { errors: { email: "Invalid email or password", password: null } },
        { status: 400 },
      );
    }

    return createUserSession({
      redirectTo,
      remember: remember === "on" ? true : false,
      request,
      userId: user.id,
    });
  } catch (err) {
    if (err instanceof CSRFError) {
      return new Response("Invalid form submission", { status: 400 });
    }
    if (err instanceof SpamError) {
      return new Response("Spam detected", { status: 400 });
    }
    return new Response("Something went wrong", { status: 500 });
  }
};

export const meta: MetaFunction = () => [{ title: "Login" }];

export default function LoginPage() {
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/edit";
  const actionData = useActionData<typeof action>();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  const isSubmitting = navigation.formAction === "/login";

  return (
    <Section title="Login">
      <Form method="post" action="/login" className="max-w-64 space-y-6">
        <AuthenticityTokenInput />
        <HoneypotInputs />

        <TextInput
          size={16}
          aria-describedby="email-error"
          aria-invalid={actionData?.errors?.email ? true : undefined}
          autoComplete="email"
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
          id="email"
          label="Email"
          name="email"
          ref={emailRef}
          required
          type="email"
        />
        {actionData?.errors?.email ? (
          <div className="" id="email-error">
            {actionData.errors.email}
          </div>
        ) : null}

        <TextInput
          size={16}
          id="password"
          ref={passwordRef}
          name="password"
          type="password"
          autoComplete="current-password"
          aria-invalid={actionData?.errors?.password ? true : undefined}
          aria-describedby="password-error"
          label="Password"
          required
        />
        {actionData?.errors?.password ? (
          <div className="" id="password-error">
            {actionData.errors.password}
          </div>
        ) : null}

        <input type="hidden" name="redirectTo" value={redirectTo} />

        <div>
          <Button
            className="min-w-32"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          >
            Log in
          </Button>

          {isSubmitting ? <div className="loader" /> : null}
        </div>

        <Checkbox id="remember" name="remember" label="Remember Me" />
      </Form>
    </Section>
  );
}
