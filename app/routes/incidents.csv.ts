import { D, pipe } from "@mobily/ts-belt";
import { Incident } from "@prisma/client";
import { type LoaderFunction } from "@remix-run/node";
import { stringify } from "csv-stringify";
import { format } from "date-fns";

import { getIncidents } from "~/models/incidents.server";
import { requireUserId } from "~/session.server";

function toBooleanString(arg: unknown) {
	return String(Boolean(arg));
}

function enrich(incidents: Incident[]) {
	return incidents.map((incident) =>
		pipe(
			incident,
			D.merge({
				createdAt: format(new Date(incident.createdAt), "yyyy-MM-dd HH:mm:ss"),
				wantsContact: toBooleanString(incident.wantsContact),
				wantsSharedWithOrgs: toBooleanString(incident.wantsSharedWithOrgs),
			}),
			D.deleteKeys(["updatedAt", "isActive", "version"]),
		),
	);
}

export const loader: LoaderFunction = async ({ request }) => {
	await requireUserId(request);

	const incidents = await getIncidents();

	const data = await new Promise<string>((resolve, reject) => {
		stringify(
			enrich(incidents),
			{ quoted: true, header: true },
			(err, output) => {
				if (err) reject(err);
				else resolve(output);
			},
		);
	});

	return new Response(data, { headers: { "Content-Type": "text/csv" } });
};
