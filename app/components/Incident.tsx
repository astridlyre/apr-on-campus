import type { Incident } from "@prisma/client";
import { NavLink } from "@remix-run/react";

import { capitalize, formatDateWithoutTime } from "~/utils";

export default function IncidentPreview({ incident }: { incident: Incident }) {
	return (
		<NavLink
			to={`/dashboard/${incident.id}`}
			className="incident block bg-bg p-4 hover:bg-bg3"
		>
			<h3 className="text-md font-bold text-fg">{capitalize(incident.type)}</h3>
			<p className="text-xs text-fg2">
				{formatDateWithoutTime(incident.date)} - {incident.province}
			</p>
			<p className="truncate text-sm text-fg">{incident.location}</p>
		</NavLink>
	);
}
