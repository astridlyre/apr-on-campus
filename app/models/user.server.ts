import type { Password, User } from "@prisma/client";
import argon2 from "argon2";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
	return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
	return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
	const hashedPassword = await argon2.hash(password);

	return prisma.user.create({
		data: {
			email,
			password: {
				create: {
					hash: hashedPassword,
				},
			},
		},
	});
}

export async function deleteUserByEmail(email: User["email"]) {
	return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
	email: User["email"],
	password: Password["hash"],
) {
	const userWithPassword = await prisma.user.findUnique({
		where: { email },
		include: {
			password: true,
		},
	});

	if (!userWithPassword || !userWithPassword.password) {
		return null;
	}

	try {
		const isValid = await argon2.verify(
			userWithPassword.password.hash,
			password,
		);

		if (!isValid) {
			return null;
		}
	} catch (err) {
		console.error(err);
		return null;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: _password, ...userWithoutPassword } = userWithPassword;

	return userWithoutPassword;
}
