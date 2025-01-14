import { D } from "@mobily/ts-belt";
import { User } from "@prisma/client";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
	Form,
	Outlet,
	useLoaderData,
	useLocation,
	useOutletContext,
} from "@remix-run/react";
import clsx from "clsx";
import { useEffect, useState } from "react";

import Button from "~/components/Button";
import IncidentPreview from "~/components/Incident";
import TextInput from "~/components/TextInput";
import TextLink from "~/components/TextLink";
import Layout from "~/layout";
import { getIncidents } from "~/models/incidents.server";
import { requireUserId } from "~/session.server";
import { plural } from "~/utils";

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
	const location = useLocation();
	const user = useOutletContext<User>();
	const data = useLoaderData<typeof loader>();
	const [id, setId] = useState("");

	const [showIncidentList, setShowIncidentList] = useState(true);

	const handleShowAllIncidents = () => {
		setShowIncidentList(true);
	};

	useEffect(() => {
		setShowIncidentList(false);
		setId("");
	}, [location.pathname]);

	return (
		<Layout noFooter className="md:h-screen md:overflow-y-hidden">
			<div className="grid flex-grow grid-cols-12 border-t-4 border-t-fg md:h-screen">
				<div
					className={clsx(
						"md-page-height col-span-12 flex-col gap-[1px] border-r-2 border-r-border bg-bg md:col-span-3 md:flex",
						showIncidentList ? "flex" : "hidden",
					)}
				>
					<div className="md-page-height overflow-y-scroll">
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

					<div className="border-t-2 border-t-border p-4">
						<Form method="GET" action={`/dashboard/${id}`}>
							<TextInput
								hideOptionalText
								type="text"
								label="Find Incident by ID"
								name="id"
								value={id}
								onChange={(evt) => {
									setId(evt.target.value);
								}}
							/>
						</Form>

						<p className="mt-2">
							<TextLink external href="/incidents/csv">
								Download Incident Report CSV
							</TextLink>
						</p>

						<p className="mt-2 mb-6 text-sm">
							{data.incidents.length} {plural(data.incidents, "incident")}
						</p>

						<Form
							action="/logout"
							method="POST"
							className="flex justify-between gap-2"
						>
							<span className="text-fg2">{user.email}</span>
							<Button variant="text" type="submit">
								Logout
							</Button>
						</Form>
					</div>
				</div>

				<div
					className={clsx(
						"col-span-12 pb-16 md:col-span-9 md:block md:overflow-y-scroll",
						showIncidentList ? "hidden" : "block",
					)}
				>
					<button
						className="flex items-center gap-1 p-4 text-secondary md:hidden"
						onClick={handleShowAllIncidents}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="15 18 9 12 15 6"></polyline>
						</svg>

						<span> Show All Incidents</span>
					</button>

					<Outlet />
				</div>
			</div>
		</Layout>
	);
}
