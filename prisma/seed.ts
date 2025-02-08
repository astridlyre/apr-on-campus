import { G } from "@mobily/ts-belt";
import { PrismaClient } from "@prisma/client";
import argon2 from "argon2";
import invariant from "tiny-invariant";

const prisma = new PrismaClient();

async function main() {
	const userEmail = process.env.SEED_USER_EMAIL;
	const userPassword = process.env.SEED_USER_PASSWORD;

	invariant(G.isString(userEmail), "Invalid seed user data");
	invariant(G.isString(userPassword), "Invalid seed user data");

	await prisma.user.deleteMany();

	const hashedPassword = await argon2.hash(userPassword);

	await prisma.user.upsert({
		where: { email: userEmail },
		update: {},
		create: {
			email: userEmail,
			isAdmin: true,
			password: { create: { hash: hashedPassword } },
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (err) => {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	});
