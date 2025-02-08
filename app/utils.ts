import { G, S } from "@mobily/ts-belt";
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

export function isParsedFile(
	maybeFile: unknown,
): maybeFile is { href: string; contentType: string } {
	return (
		G.isObject(maybeFile) &&
		G.isString(maybeFile.href) &&
		G.isString(maybeFile.contentType)
	);
}

export function isTooBig(file: File) {
	return file.size > 250 * 1024 * 1024; // 250 MB
}

export const maxFiles = 10;

export function getFormFiles(formData: FormData): string[] {
	const keys = Array.from(formData.keys()).filter(S.startsWith("file-"));
	if (!keys.length) {
		return [];
	}
	return keys.map((key) => formData.get(key)).filter(G.isString);
}

export function humanReadableSize(file: File) {
	const units = ["B", "KB", "MB", "GB", "TB"];
	let size = file.size;

	for (const unit of units) {
		if (size < 1024) {
			return `${Math.round(size * 100) / 100} ${unit}`;
		}
		size /= 1024;
	}

	return `${size} PB`;
}

export function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Normalizes a phone number to its raw digits.
 * Ensures the phone number is valid for US/Canada.
 */
export function normalizePhoneNumber(phoneNumber: string) {
	const digits = phoneNumber.replace(/\D/g, "");

	if (/^1?([2-9][0-8][0-9])([2-9][0-9]{2})([0-9]{4})$/.test(digits)) {
		// Remove leading '1' if present (for country code)
		const normalized = digits.length === 11 ? digits.slice(1) : digits;
		return normalized;
	}

	// If the phone number is not valid, return the original string
	return phoneNumber;
}

/**
 * Formats a normalized phone number into a human-readable string.
 */
export function formatPhoneNumber(normalizedPhoneNumber: string) {
	if (
		!/^([2-9][0-8][0-9])([2-9][0-9]{2})([0-9]{4})$/.test(normalizedPhoneNumber)
	) {
		return normalizedPhoneNumber;
	}

	const areaCode = normalizedPhoneNumber.slice(0, 3);
	const centralOfficeCode = normalizedPhoneNumber.slice(3, 6);
	const lineNumber = normalizedPhoneNumber.slice(6);

	return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
}

export function isImage(contentType: string) {
	return contentType?.startsWith("image/");
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
