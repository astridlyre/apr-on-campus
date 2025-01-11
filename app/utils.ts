import { G } from "@mobily/ts-belt";

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
	return file.size > 10 * 1024 * 1024; // 10 MB
}

export const maxFiles = 10;
