import { D } from "@mobily/ts-belt";
import {
	DidNotReportReason,
	Incident,
	IncidentFile,
	IncidentIdentification,
	IncidentImpact,
	IncidentOrgs,
	IncidentType,
	UserGenderIdentity,
	UserIdentity,
} from "@prisma/client";
import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { Children } from "react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { CSRFError } from "remix-utils/csrf/server";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { SpamError } from "remix-utils/honeypot/server";
import invariant from "tiny-invariant";

import Section from "~/components/Section";
import TextLink from "~/components/TextLink";
import UnorderedList from "~/components/UnorderedList";
import { csrf } from "~/csrf.server";
import { honeypot } from "~/honeypot.server";
import { deleteIncident, getIncident } from "~/models/incidents.server";
import { requireUserId } from "~/session.server";
import {
	formatDateWithoutTime,
	formatPhoneNumber,
	getFormDataValue,
	isImage,
} from "~/utils";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	try {
		await requireUserId(request);

		const { id } = params;

		invariant(id, "Incident ID is required");

		const incident = await getIncident({ id });

		console.log(incident);

		if (!incident) {
			throw new Error("Incident not found");
		}

		return { incident };
	} catch (err) {
		console.error(err);

		if (err instanceof Error) {
			return new Response(err.message, { status: 500 });
		}

		return new Response("An error occurred", { status: 500 });
	}
};

function ListItem({ children }: React.PropsWithChildren) {
	const childrenArray = Children.toArray(children);

	const [first, second] = childrenArray;

	return (
		<li className="grid grid-cols-12 gap-2">
			<div className="col-span-3 sm:col-span-2">{first}</div>
			<div className="col-span-9 sm:col-span-10">{second}</div>
		</li>
	);
}

export const action: ActionFunction = async ({ params, request }) => {
	try {
		await csrf.validate(request);

		invariant(params.id, "Incident ID is required");

		const form = await request.formData();

		honeypot.check(form);

		const { id } = params;
		const action = getFormDataValue(form, "action");

		if (action === "delete") {
			await deleteIncident({ id });
			return redirect("/dashboard");
		}

		return redirect(`/dashboard/${id}`);
	} catch (err) {
		if (err instanceof CSRFError) {
			return new Response("Forbidden", { status: 403 });
		}
		if (err instanceof SpamError) {
			return new Response("Spam detected", { status: 400 });
		}
		return new Response("Something went wrong", { status: 500 });
	}
};

export default function IncidentPage() {
	const data = useLoaderData<typeof loader>();

	const { incident } = data as {
		incident: Incident & {
			files: IncidentFile[];
			type: IncidentType[];
			identification: IncidentIdentification[];
			impact: IncidentImpact[];
			didNotReportReasons: DidNotReportReason[];
			wantsSharedWithOrgs: IncidentOrgs[];
			identities: UserIdentity[];
			genderIdentities: UserGenderIdentity[];
		};
	};

	return (
		<Section className="py-4 sm:py-6 md:py-12">
			<div className="md:bg-bg0 space-y-8 md:rounded-lg md:border md:border-divider md:p-6">
				<header className="flex flex-col items-start justify-between gap-2 border-b pb-4 md:flex-row">
					<h2 className="text-3xl font-bold text-fg">Incident Details</h2>

					<div className="flex w-full items-center justify-between gap-8 md:w-auto md:justify-end">
						<TextLink href={`mailto:${incident.userEmail}`} external>
							Email User
						</TextLink>

						<Form action={`/dashboard/${incident.id}`} method="POST">
							<AuthenticityTokenInput />
							<HoneypotInputs />

							<button
								className="rounded border border-border bg-bg2 px-2 py-1 text-sm hover:bg-bg3 hover:shadow"
								type="submit"
								name="action"
								value="delete"
							>
								Delete
							</button>
						</Form>
					</div>
				</header>

				<section>
					<h3 className="mb-4 text-xl font-bold text-fg">
						Incident Information
					</h3>
					<ul className="space-y-2">
						<ListItem>
							<span className="font-medium">ID:</span>
							<strong>{incident.id}</strong>
						</ListItem>
						<ListItem>
							<span className="font-medium">Date:</span>
							<strong>{formatDateWithoutTime(incident.date)}</strong>
						</ListItem>
						<ListItem>
							<span className="font-medium">Province:</span>
							<strong>{incident.province}</strong>
						</ListItem>
						<ListItem>
							<span className="font-medium">Location:</span>
							<strong>{incident.location}</strong>
						</ListItem>
						<ListItem>
							<span className="font-medium">Type:</span>
							<strong>{incident.type.map(D.get("name")).join(", ")}</strong>
						</ListItem>
					</ul>
				</section>

				<section>
					<h3 className="mb-4 text-xl font-bold text-fg">Description</h3>
					<div className="prose text-fg2">
						{incident.description.split("\n").map((line, index) => (
							<p key={index}>{line.trim()}</p>
						))}
					</div>
				</section>

				<section>
					<h3 className="mb-4 text-xl font-bold text-fg">User Information</h3>
					<ul className="space-y-2">
						<ListItem>
							<span className="font-medium">Name:</span>
							<strong>
								{incident.userFirstName} {incident.userLastName}
							</strong>
						</ListItem>
						<ListItem>
							<span className="font-medium">Email:</span>
							<strong>{incident.userEmail}</strong>
						</ListItem>
						<ListItem>
							<span className="font-medium">Phone:</span>
							<strong>{formatPhoneNumber(incident.userPhoneNumber)}</strong>
						</ListItem>
					</ul>
				</section>

				<section>
					<h3 className="text-xl font-bold text-fg">Status</h3>
					<ul className="space-y-2">
						<li>
							<span className="font-medium">Wants contact from us?</span>{" "}
							<strong>{incident.wantsContact ? "Yes" : "No"}</strong>
						</li>
						<li>
							<span className="font-medium">
								Should forward to partner organizations?
							</span>{" "}
							<strong>
								{incident.wantsSharedWithOrgs.length
									? incident.wantsSharedWithOrgs.map(D.get("name")).join(", ")
									: "No"}
							</strong>
						</li>
					</ul>
				</section>

				<section>
					<h3 className="mb-4 text-lg font-bold text-fg">Files</h3>
					<UnorderedList>
						{incident.files.map((file) => (
							<li key={file.id} className="group relative">
								<TextLink href={file.href} external>
									{file.href.split("/").pop()} ({file.contentType})
								</TextLink>
								{isImage(file.contentType) ? (
									<img
										src={file.href}
										alt="File preview"
										className="absolute bottom-full left-0 z-50 mb-2 hidden w-40 rounded border border-gray-200 bg-white shadow-lg group-hover:block"
									/>
								) : (
									<div className="absolute bottom-full left-0 z-50 mb-2 hidden w-48 rounded border border-gray-200 bg-white p-2 text-center text-red-600 shadow-lg group-hover:block">
										No Preview Available
									</div>
								)}
							</li>
						))}
					</UnorderedList>
				</section>
			</div>
		</Section>
	);
}
