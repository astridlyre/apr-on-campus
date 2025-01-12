import type { Incident } from "@prisma/client";

export default function Incident({ incident }: { incident: Incident }) {
  return <div>{incident.id}</div>;
}
