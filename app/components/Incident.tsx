import type { Incident } from "@prisma/client";
import { NavLink } from "@remix-run/react";

import { capitalize, formatDateWithoutTime } from "~/utils";

export default function IncidentPreview({ incident }: { incident: Incident }) {
  return (
    <NavLink
      to={`/dashboard/${incident.id}`}
      className="incident block bg-slate-100 p-4 hover:bg-slate-200"
    >
      <h3 className="text-lg font-bold text-slate-900">
        {capitalize(incident.type)}
      </h3>
      <p className="text-sm text-fg2">
        {formatDateWithoutTime(incident.date)} - {incident.province}
      </p>
      <p className="truncate text-sm text-fg">{incident.location}</p>
    </NavLink>
  );
}
