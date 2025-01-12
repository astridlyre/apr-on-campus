import { D } from "@mobily/ts-belt";
import { User } from "@prisma/client";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Form,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";

import Button from "~/components/Button";
import IncidentPreview from "~/components/Incident";
import Layout from "~/layout";
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
  const user = useOutletContext<User>();
  const data = useLoaderData<typeof loader>();

  return (
    <Layout noFooter>
      <div className="grid flex-grow grid-cols-12 border-t-4 border-t-slate-700">
        <div className="col-span-3 flex flex-col gap-[1px] border-r-2">
          <div className="col-span-3 flex flex-grow flex-col gap-[1px] overflow-y-auto">
            {data.incidents.map((incident) => (
              <IncidentPreview
                key={incident.id}
                incident={D.merge(incident, {
                  createdAt: new Date(incident.createdAt),
                  updatedAt: new Date(incident.updatedAt),
                })}
              />
            ))}
          </div>

          <Form
            action="/logout"
            method="POST"
            className="flex justify-between gap-2 p-4"
          >
            <span className="text-fg2">{user.email}</span>
            <Button variant="text" type="submit">
              Logout
            </Button>
          </Form>
        </div>

        <div className="col-span-9">
          <Outlet />
        </div>
      </div>
    </Layout>
  );
}
