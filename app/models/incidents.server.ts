import { D } from "@mobily/ts-belt";
import type { Incident } from "@prisma/client";

import { prisma } from "~/db.server";

export function getIncident({ id }: Pick<Incident, "id">) {
	return prisma.incident.findUnique({
		where: { id, isActive: true },
		include: {
			files: true,
			identification: true,
			impact: true,
			type: true,
			didNotReportReasons: true,
		},
	});
}

export function getIncidents() {
	return prisma.incident.findMany({
		where: { isActive: true },
		include: {
			files: true,
			identification: true,
			impact: true,
			type: true,
			didNotReportReasons: true,
		},
		orderBy: { createdAt: "desc" },
	});
}

export async function createIncident(
	init: Pick<
		Incident,
		| "userFirstName"
		| "userLastName"
		| "userEmail"
		| "userPhoneNumber"
		| "userAffiliation"
		| "campus"
		| "date"
		| "description"
		| "location"
		| "province"
		| "subject"
		| "impactDescription"
		| "wasFirstExperience"
		| "additionalInformation"
		| "wantsContact"
		| "wantsSharedWithOrgs"
		| "didReport"
	> & {
		files: { href: string; contentType: string }[];
		identification: string[];
		impact: string[];
		type: string[];
		didNotReportReason: string[];
	},
) {
	const { files, identification, impact, type, didNotReportReason, ...rest } =
		init;

	console.log(init);

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

	if (identification.length) {
		await prisma.incidentIdentification.createMany({
			data: identification.map((i) => ({ name: i, incidentId: incident.id })),
		});
	}

	if (impact.length) {
		await prisma.incidentImpact.createMany({
			data: impact.map((i) => ({ name: i, incidentId: incident.id })),
		});
	}

	if (type.length) {
		await prisma.incidentType.createMany({
			data: type.map((i) => ({ name: i, incidentId: incident.id })),
		});
	}

	if (didNotReportReason.length) {
		await prisma.didNotReportReason.createMany({
			data: didNotReportReason.map((i) => ({
				name: i,
				incidentId: incident.id,
			})),
		});
	}

	return D.merge(incident, {
		files,
		identification,
		impact,
		type,
		didNotReportReason,
	});
}

export function deleteIncident({ id }: Pick<Incident, "id">) {
	return prisma.incident.update({
		where: { id },
		data: { isActive: false },
	});
}
