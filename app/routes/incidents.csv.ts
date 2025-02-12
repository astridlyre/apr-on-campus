import { D, pipe } from "@mobily/ts-belt";
import { type LoaderFunction } from "@remix-run/node";
import { stringify } from "csv-stringify";
import { format } from "date-fns";

import { getIncidents } from "~/models/incidents.server";
import { requireUserId } from "~/session.server";

function toBooleanString(arg: unknown) {
	return String(Boolean(arg));
}

function parseArray(items: { name: string }[]) {
	return items.map(D.get("name")).join("|");
}

export const loader: LoaderFunction = async ({ request }) => {
	await requireUserId(request);

	const incidents = await getIncidents();
	const enriched = incidents.map((incident) =>
		pipe(
			incident,
			D.merge({
				wantsContact: toBooleanString(incident.wantsContact),
				didReport: toBooleanString(incident.didReport),
				identification: parseArray(incident.identification),
				impact: parseArray(incident.impact),
				type: parseArray(incident.type),
				didNotReportReasons: parseArray(incident.didNotReportReasons),
				identities: parseArray(incident.identities),
				genderIdentities: parseArray(incident.genderIdentities),
				wantsSharedWithOrgs: parseArray(incident.wantsSharedWithOrgs),
				createdAt: format(new Date(incident.createdAt), "yyyy-MM-dd HH:mm:ss"),
			}),
			D.deleteKeys(["updatedAt", "isActive", "version", "files"]),
		),
	);

	const data = await new Promise<string>((resolve, reject) => {
		stringify(enriched, { quoted: true, header: true }, (err, output) => {
			if (err) reject(err);
			else resolve(output);
		});
	});

	return new Response(data, { headers: { "Content-Type": "text/csv" } });
};
