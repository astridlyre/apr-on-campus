import { D } from "@mobily/ts-belt";
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

export async function createIncident(
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
	const { files, ...rest } = init;
	const incident = await prisma.incident.create({ data: rest });

	if (files.length) {
		await prisma.incidentFile.createMany({
			data: files.map((file) => ({
				incidentId: incident.id,
				href: file.href,
				contentType: file.contentType,
			})),
		});
	}

	return D.merge(incident, { files });
}

export function deleteIncident({ id }: Pick<Incident, "id">) {
	return prisma.incident.update({
		where: { id },
		data: { isActive: false },
	});
}
