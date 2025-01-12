import type { Incident } from "@prisma/client";

import { prisma } from "~/db.server";

export function getIncident({ id }: Pick<Incident, "id">) {
	return prisma.incident.findUnique({
		where: { id, isActive: true },
		include: { files: true },
	});
}

export function getIncidents() {
	return prisma.incident.findMany({ where: { isActive: true } });
}

export function createIncident(
	init: Pick<
		Incident,
		| "date"
		| "province"
		| "location"
		| "description"
		| "type"
		| "userFirstName"
		| "userLastName"
		| "userEmail"
		| "userPhoneNumber"
		| "userCity"
		| "userProvince"
		| "wasReported"
		| "wantsForwarded"
	> & { files: { href: string; contentType: string }[] },
) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { files, ...rest } = init;
	return prisma.incident.create({ data: rest });
}

export function deleteIncident({ id }: Pick<Incident, "id">) {
	return prisma.incident.update({
		where: { id },
		data: { isActive: false },
	});
}
