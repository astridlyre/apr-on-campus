import { D } from "@mobily/ts-belt";
import type { Incident } from "@prisma/client";

import { prisma } from "~/db.server";

export function getIncident({ id }: Pick<Incident, "id">) {
	return prisma.incident.findUnique({
		where: { id, isActive: true },
		include: {
			location: true,
			impact: true,
			type: true,
			wantsSharedWithOrgs: true,
			identities: true,
			genderIdentities: true,
		},
	});
}

export function getIncidents() {
	return prisma.incident.findMany({
		where: { isActive: true },
		include: {
			location: true,
			impact: true,
			type: true,
			wantsSharedWithOrgs: true,
			identities: true,
			genderIdentities: true,
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
		| "userAffiliation"
		| "campus"
		| "date"
		| "description"
		| "province"
		| "subject"
		| "impactDescription"
		| "wasFirstExperience"
		| "additionalInformation"
		| "wantsContact"
		| "wasSystemic"
		| "gender"
		| "disability"
		| "identityDescription"
		| "didReport"
	> & {
		location: string[];
		impact: string[];
		type: string[];
		wantsSharedWithOrgs: string[];
		identities: string[];
		genderIdentities: string[];
	},
) {
	const {
		location,
		impact,
		type,
		wantsSharedWithOrgs,
		identities,
		genderIdentities,
		...rest
	} = init;

	const incident = await prisma.incident.create({ data: rest });

	if (location.length) {
		await prisma.incidentLocation.createMany({
			data: location.map((i) => ({ name: i, incidentId: incident.id })),
		});
	}

	if (identities.length) {
		await prisma.userIdentity.createMany({
			data: identities.map((i) => ({ name: i, incidentId: incident.id })),
		});
	}

	if (genderIdentities.length) {
		await prisma.userGenderIdentity.createMany({
			data: genderIdentities.map((i) => ({ name: i, incidentId: incident.id })),
		});
	}

	if (wantsSharedWithOrgs.length) {
		await prisma.incidentOrgs.createMany({
			data: wantsSharedWithOrgs.map((i) => ({
				name: i,
				incidentId: incident.id,
			})),
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

	return D.merge(incident, {
		genderIdentities,
		identities,
		impact,
		location,
		type,
		wantsSharedWithOrgs,
	});
}

export function deleteIncident({ id }: Pick<Incident, "id">) {
	return prisma.incident.update({
		where: { id },
		data: { isActive: false },
	});
}
