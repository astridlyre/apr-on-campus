import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { User } from "~/models/user.server";

export const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string,
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data as Record<string, unknown>;
}

function isUser(user: unknown): user is User {
  return (
    user != null &&
    typeof user === "object" &&
    "email" in user &&
    typeof user.email === "string"
  );
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
}

export function getFormDataValue(formData: FormData, key: string) {
  const value = formData.get(key);
  if (value == null) {
    return "";
  }
  if (value instanceof File) {
    return "";
  }
  return value.trim();
}

export function getFormDataValues(formData: FormData, key: string): string[] {
  const values = formData.getAll(key);
  return values.map((value) => (value as string).trim());
}

const timeFormatter = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "medium",
  timeStyle: "short",
});

const formatter = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "medium",
});

export const formatDate = (dateOrString: string | Date) => {
  const date = new Date(dateOrString);
  return formatter.format(date);
};

// We want the date to show the same in any timezone. The date string is stored
// in UTC, so we want to compensate for the user's local timezone.
export const formatDateWithoutTime = (dateOrString: string | Date) => {
  const date = new Date(dateOrString);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return formatter.format(date);
};

export const formatDateAndTime = (dateOrString: string | Date) => {
  const date = new Date(dateOrString);
  return timeFormatter.format(date);
};

export function validateEmail(email: unknown): email is string {
  return (
    typeof email === "string" &&
    email.length > 3 &&
    email.length < 255 &&
    /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i.test(
      email,
    )
  );
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function plural(
  items: unknown[] | { length: number },
  word: string,
  pluralForm?: string,
) {
  if (!Array.isArray(items)) {
    throw new TypeError("Expected an array");
  }
  if (typeof word !== "string") {
    throw new TypeError("Expected a string");
  }
  const pluralWord = pluralForm || `${word}s`;
  return items.length === 1 ? word : pluralWord;
}
