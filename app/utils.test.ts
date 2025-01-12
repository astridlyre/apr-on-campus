/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";

import { safeRedirect, validateEmail } from "./utils";

const DEFAULT_REDIRECT = "/default";

describe("safeRedirect", () => {
	it('returns defaultRedirect if "to" is null', () => {
		expect(safeRedirect(null, DEFAULT_REDIRECT)).toBe(DEFAULT_REDIRECT);
	});

	it('returns defaultRedirect if "to" is undefined', () => {
		expect(safeRedirect(undefined, DEFAULT_REDIRECT)).toBe(DEFAULT_REDIRECT);
	});

	it('returns defaultRedirect if "to" is not a string', () => {
		expect(safeRedirect(123 as any, DEFAULT_REDIRECT)).toBe(DEFAULT_REDIRECT);
		expect(safeRedirect({} as any, DEFAULT_REDIRECT)).toBe(DEFAULT_REDIRECT);
	});

	it('returns defaultRedirect if "to" starts with "//"', () => {
		expect(safeRedirect("//example.com", DEFAULT_REDIRECT)).toBe(
			DEFAULT_REDIRECT,
		);
	});

	it('returns defaultRedirect if "to" does not start with "/"', () => {
		expect(safeRedirect("http://example.com", DEFAULT_REDIRECT)).toBe(
			DEFAULT_REDIRECT,
		);
		expect(safeRedirect("example", DEFAULT_REDIRECT)).toBe(DEFAULT_REDIRECT);
	});

	it('returns "to" if it is a safe relative path', () => {
		expect(safeRedirect("/home", DEFAULT_REDIRECT)).toBe("/home");
		expect(safeRedirect("/about", DEFAULT_REDIRECT)).toBe("/about");
	});

	it("handles edge cases with special characters", () => {
		expect(safeRedirect("/path-with-special-char%20", DEFAULT_REDIRECT)).toBe(
			"/path-with-special-char%20",
		);
		expect(safeRedirect("/#anchor", DEFAULT_REDIRECT)).toBe("/#anchor");
	});

	it("uses the default redirect if none is provided", () => {
		expect(safeRedirect("/path", undefined)).toBe("/path");
		expect(safeRedirect(null, undefined)).toBe("/");
	});

	it('returns defaultRedirect when "to" is empty string', () => {
		expect(safeRedirect("", DEFAULT_REDIRECT)).toBe(DEFAULT_REDIRECT);
	});
});

describe("validateEmail", () => {
	it("returns true for a valid email address", () => {
		expect(validateEmail("test@example.com")).toBe(true);
		expect(validateEmail("user.name+tag@sub.domain.com")).toBe(true);
		expect(validateEmail("A_USER123@domain.io")).toBe(true);
		expect(validateEmail("user-name@domain.co.uk")).toBe(true);
	});

	it("returns false for null and undefined", () => {
		expect(validateEmail(null)).toBe(false);
		expect(validateEmail(undefined)).toBe(false);
	});

	it("returns false for non-string inputs", () => {
		expect(validateEmail(123)).toBe(false);
		expect(validateEmail({})).toBe(false);
		expect(validateEmail([])).toBe(false);
		expect(validateEmail(true)).toBe(false);
	});

	it("returns false for invalid email formats", () => {
		expect(validateEmail("")).toBe(false); // Empty string
		expect(validateEmail("plainaddress")).toBe(false); // Missing @
		expect(validateEmail("@domain.com")).toBe(false); // Missing local part
		expect(validateEmail("user@")).toBe(false); // Missing domain
		expect(validateEmail("user@domain")).toBe(false); // Missing TLD
		expect(validateEmail("user@domain..com")).toBe(false); // Double dots in domain
		expect(validateEmail("user@@domain.com")).toBe(false); // Double @
	});

	it("returns false for emails with invalid characters", () => {
		expect(validateEmail("user name@domain.com")).toBe(false); // Space in email
		expect(validateEmail("user<>@domain.com")).toBe(false); // Invalid special characters
		expect(validateEmail("user@domain#com")).toBe(false); // Invalid special characters in domain
	});

	it("handles edge cases", () => {
		expect(validateEmail("user@domain.c")).toBe(false); // TLD too short
		expect(validateEmail("user@domain.123")).toBe(false); // Numeric TLD
	});

	it("returns true for valid emails with capital letters", () => {
		expect(validateEmail("USER@DOMAIN.COM")).toBe(true);
		expect(validateEmail("User.Name@Sub.Domain.Org")).toBe(true);
	});

	it("returns true for valid emails with special characters in the local part", () => {
		expect(validateEmail("user+tag@example.com")).toBe(true);
		expect(validateEmail("user.name@example.com")).toBe(true);
		expect(validateEmail("user_name@example.com")).toBe(true);
		expect(validateEmail("user-name@example.com")).toBe(true);
	});

	it("returns false for overly long emails", () => {
		const longEmail = "a".repeat(64) + "@" + "b".repeat(255 - 64 - 5) + ".com";
		expect(validateEmail(longEmail)).toBe(false);
	});
});
