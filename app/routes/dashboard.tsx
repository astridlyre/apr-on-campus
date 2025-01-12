import { D } from "@mobily/ts-belt";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import Heading from "~/components/Heading";
import Incident from "~/components/Incident";
import Section from "~/components/Section";
import { getIncidents } from "~/models/incidents.server";
import { requireUserId } from "~/session.server";

export const meta: MetaFunction = () => [
  { title: "Dashboard | APR on Campus" },
  { name: "description", content: "View submitted incidents and reports" },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireUserId(request);

  const incidents = await getIncidents();

  return { incidents };
};

export default function Dashboard() {
  const data = useLoaderData<typeof loader>();

  return (
    <Section>
      <Heading level={1}>Incident Dashboard</Heading>
      {data.incidents.map((incident) => (
        <Incident
          key={incident.id}
          incident={D.merge(incident, {
            createdAt: new Date(incident.createdAt),
            updatedAt: new Date(incident.updatedAt),
          })}
        />
      ))}
    </Section>
  );
}
