import { createCookie } from "@remix-run/node";
import { CSRF } from "remix-utils/csrf/server";

if (!process.env.CSRF_SECRET) {
	throw new Error("CSRF_SECRET is required");
}

export const cookie = createCookie("csrf", {
	path: "/",
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax",
	secrets: [process.env.CSRF_SECRET],
});

export const csrf = new CSRF({
	cookie,
	formDataKey: "csrf",
	secret: process.env.CSRF_SECRET,
});
