import { A, D, pipe, S } from "@mobily/ts-belt";
import { format } from "date-fns";

import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Paragraph from "~/components/Paragraph";
import { provinces } from "~/incidents";
import { paragraphify } from "~/utils";

import { PAGES, type PageProps } from "./state";

export default function Summary({ state, setPage }: PageProps) {
	return (
		<>
			<Heading className="mt-0" level={4}>
				Summary
			</Heading>

			<Paragraph>
				You are about to submit the following incident report:
			</Paragraph>

			<div className="flex gap-2 items-start justify-between">
				<ul className="flex flex-col">
					<li>
						<strong>First Name:</strong> {state.userFirstName}
					</li>
					{state.userLastName ? (
						<li>
							<strong>Last Name:</strong> {state.userLastName}
						</li>
					) : null}
					<li>
						<strong>Email:</strong> {state.userEmail}
					</li>
					<li>
						<strong>Date of Incident:</strong>{" "}
						{format(new Date(state.date), "MMMM d, yyyy")}
					</li>
					<li>
						<strong>Province:</strong>{" "}
						{provinces.find((p) => p.value === state.province)?.label}
					</li>
				</ul>

				<Button
					variant="text"
					type="button"
					onClick={() => {
						setPage(PAGES.CONTACT_INFORMATION);
					}}
				>
					Edit
				</Button>
			</div>

			<br />

			<div className="flex gap-2 items-start justify-between">
				<ul className="flex flex-col">
					<li>
						<strong>Who it happened to:</strong> {state.subject}
					</li>
					<li>
						<strong>Where it occured:</strong>{" "}
						{pipe(
							state.location,
							D.deleteKey("Other"),
							D.keys,
							A.append(state.locationOther),
							A.filter(S.isNotEmpty),
							A.join(", "),
						)}
					</li>
				</ul>

				<Button
					variant="text"
					type="button"
					onClick={() => {
						setPage(PAGES.WHERE_DID_IT_HAPPEN);
					}}
				>
					Edit
				</Button>
			</div>

			<br />

			<div className="flex gap-2 items-start justify-between">
				<ul className="flex flex-col">
					<li>
						<strong>Educational Institution:</strong> {state.campus}
					</li>
					<li>
						<strong>Can we share your story with advocacy groups?</strong>{" "}
						{state.wantsShared}
					</li>
					{state.wantsShared === "Yes" ? (
						<li>
							<strong>Story will be shared with: </strong>
							{Object.keys(state.wantsSharedWithOrgs).join(", ")}
						</li>
					) : null}
					{state.wantsShared === "Yes" ? (
						<li>
							<strong>
								Can the advocacy groups share your anonymized story?
							</strong>{" "}
							{state.allowsSocialShare}
						</li>
					) : null}
				</ul>

				<Button
					variant="text"
					type="button"
					onClick={() => {
						setPage(PAGES.INSTITUTION_INVOLVEMENT);
					}}
				>
					Edit
				</Button>
			</div>

			<br />

			<div className="flex gap-2 items-start justify-between">
				<ul className="flex flex-col">
					<li>
						<strong>This incident involved:</strong>{" "}
						{pipe(
							state.type,
							D.deleteKey("Other"),
							D.keys,
							A.append(state.typeOther),
							A.filter(S.isNotEmpty),
							A.join(", "),
						)}
					</li>
					<li>
						<strong>Your experience:</strong>{" "}
						{paragraphify(state.description)
							.filter(Boolean)
							.map((paragraph, idx) => (
								<p key={idx} className="my-2">
									{paragraph}
								</p>
							))}
					</li>
				</ul>
				<Button
					variant="text"
					type="button"
					onClick={() => {
						setPage(PAGES.WHAT_WAS_INVOLVED);
					}}
				>
					Edit
				</Button>
			</div>

			<br />

			<div className="flex gap-2 items-start justify-between">
				<ul className="flex flex-col">
					<li>
						<strong>How it has impacted you:</strong>{" "}
						{pipe(state.impact, D.keys, A.filter(S.isNotEmpty), A.join(", "))}
					</li>

					{state.impactDescription ? (
						<li>
							<strong>Description:</strong>{" "}
							{paragraphify(state.impactDescription).map((paragraph, idx) => (
								<p key={idx} className="my-2">
									{paragraph}
								</p>
							))}
						</li>
					) : null}

					{state.wasFirstExperience ? (
						<li>
							<strong>Was this your first experience with APR?</strong>{" "}
							{state.wasFirstExperience}
						</li>
					) : null}

					<li>
						<strong>Was this a result of systemic racism?</strong>{" "}
						{state.wasSystemic}
					</li>
				</ul>

				<Button
					variant="text"
					type="button"
					onClick={() => {
						setPage(PAGES.WHAT_WAS_IMPACT);
					}}
				>
					Edit
				</Button>
			</div>
		</>
	);
}
