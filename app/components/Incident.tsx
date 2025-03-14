import { D } from "@mobily/ts-belt";
import type { Incident, IncidentLocation } from "@prisma/client";
import { NavLink } from "@remix-run/react";

import { capitalize, formatDateWithoutTime } from "~/utils";

export default function IncidentPreview({
	incident,
}: { incident: Incident & { location: IncidentLocation[] } }) {
	return (
		<NavLink
			to={`/dashboard/${incident.id}`}
			className="incident block bg-bg p-4 hover:bg-bg3"
		>
			<h3 className="text-md font-bold text-fg">
				{capitalize(incident.userFirstName)}
			</h3>
			<p className="text-xs text-fg2">
				{formatDateWithoutTime(incident.date)} - {incident.province}
			</p>
			<p className="truncate text-sm text-fg">
				{incident.location.map(D.get("name")).join(", ")}
			</p>
		</NavLink>
	);
}
