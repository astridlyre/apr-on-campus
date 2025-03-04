import { A, D, G, N, pipe } from "@mobily/ts-belt";
import {
	data,
	redirect,
	type ActionFunction,
	type MetaFunction,
} from "@remix-run/node";
import { Form, useNavigation, useSubmit } from "@remix-run/react";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { CSRFError } from "remix-utils/csrf/server";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { SpamError } from "remix-utils/honeypot/server";

import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Section from "~/components/Section";
import Pages from "~/form/Pages";
import { initialState, PAGES, State } from "~/form/state";
import { honeypot } from "~/honeypot.server";
import validateIncident from "~/incidents.server";
import Layout from "~/layout";
import { createIncident } from "~/models/incidents.server";
import confirmedTemplate from "~/services/emails/confirmed.template";
import sendEmail from "~/services/emails.server";
import { getFormDataValue, getFormDataValues } from "~/utils";

export const meta: MetaFunction = () => [
	{ title: "Report | APR on Campus" },
	{ name: "description", content: "Report an incident of APR on Campus" },
];

export const action: ActionFunction = async ({ request }) => {
	try {
		const form = await request.formData();

		honeypot.check(form);

		const rawIncident = {
			userFirstName: getFormDataValue(form, "userFirstName"),
			userLastName: getFormDataValue(form, "userLastName"),
			userEmail: getFormDataValue(form, "userEmail"),
			userAffiliation: getFormDataValue(form, "userAffiliation"),
			date: getFormDataValue(form, "date"),
			province: getFormDataValue(form, "province"),
			subject: getFormDataValue(form, "subject"),
			location: getFormDataValue(form, "location"),
			locationOther: getFormDataValue(form, "locationOther"),
			campus: getFormDataValue(form, "campus"),
			wantsContact: getFormDataValue(form, "wantsContact"),
			wantsShared: getFormDataValue(form, "wantsShared"),
			wantsSharedWithOrgs: getFormDataValues(form, "wantsSharedWithOrgs"),
			allowsSocialShare: getFormDataValue(form, "allowsSocialShare"),
			didReport: getFormDataValue(form, "didReport"),
			type: getFormDataValues(form, "type"),
			typeOther: getFormDataValue(form, "typeOther"),
			description: getFormDataValue(form, "description"),
			impact: getFormDataValues(form, "impact"),
			impactDescription: getFormDataValue(form, "impactDescription"),
			wasFirstExperience: getFormDataValue(form, "wasFirstExperience"),
			wasFirstExperienceOther: getFormDataValue(
				form,
				"wasFirstExperienceOther",
			),
			wasSystemic: getFormDataValue(form, "wasSystemic"),
			identities: getFormDataValues(form, "identities"),
			identitiesOther: getFormDataValue(form, "identitiesOther"),
			gender: getFormDataValue(form, "gender"),
			genderOther: getFormDataValue(form, "genderOther"),
			genderIdentities: getFormDataValues(form, "genderIdentities"),
			genderIdentitiesOther: getFormDataValue(form, "genderIdentitiesOther"),
			disability: getFormDataValue(form, "disability"),
			identityDescription: getFormDataValue(form, "identityDescription"),
			additionalInformation: getFormDataValue(form, "additionalInformation"),
		};

		const { incident, errors } = validateIncident(rawIncident);

		if (!incident) {
			return data({ errors }, 422);
		}

		const createdIncident = await createIncident(incident);

		const emailUser = {
			firstName: incident.userFirstName,
			email: incident.userEmail,
		};

		const subject = "Thank you for your report - APR on Campus";

		sendEmail({
			to: incident.userEmail,
			subject,
			text: confirmedTemplate.text({
				subject,
				user: emailUser,
				incident: createdIncident,
			}),
			html: confirmedTemplate.html({
				subject,
				user: emailUser,
				incident: createdIncident,
			}),
		});

		return redirect("/confirmed");
	} catch (err) {
		console.error(err);

		if (err instanceof CSRFError) {
			return new Response("Forbidden", { status: 403 });
		}
		if (err instanceof SpamError) {
			return new Response("Spam detected", { status: 400 });
		}
		return new Response("Something went wrong", { status: 500 });
	}
};

export default function Report() {
	const submit = useSubmit();
	const navigation = useNavigation();
	const [page, setPage] = useState(PAGES.CONTACT_INFORMATION);
	const [state, setState] = useState<State>(initialState);

	useDebounce(() => {
		if (!globalThis.localStorage) {
			return;
		}

		if (state !== initialState) {
			globalThis.localStorage.setItem(
				"APR_INCIDENT_REPORT_STATE",
				JSON.stringify(state),
			);
		}
	}, 1000);

	useEffect(() => {
		if (state !== initialState) {
			return;
		}

		if (!globalThis.localStorage) {
			return;
		}

		const savedState = globalThis.localStorage.getItem(
			"APR_INCIDENT_REPORT_STATE",
		);
		if (!savedState) {
			return;
		}

		try {
			const parsedState = JSON.parse(savedState);
			if (parsedState) {
				setState(parsedState);
			}
		} catch (err) {
			console.error(err);
		}
	}, [state]);

	const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		if (page !== PAGES.SUMMARY) {
			setPage(N.add(1));
			return;
		}

		const formData = pipe(
			state,
			D.deleteKey("isSubmitting"),
			D.toPairs,
			A.reduce(new FormData(evt.currentTarget), (formData, [key, value]) => {
				formData.delete(key);

				if (G.isObject(value)) {
					D.toPairs(value).forEach(([option, has]) => {
						if (has) {
							formData.append(key, option);
						}
					});
				} else if (G.isArray(value)) {
					value.forEach((option) => {
						formData.set(key, String(option));
					});
				} else {
					formData.set(key, value);
				}

				return formData;
			}),
		);

		submit(formData, {
			method: "post",
			action: "/report",
			encType: "multipart/form-data",
		});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [page]);

	const isSubmitting = navigation.formAction === "/report";

	useEffect(() => {
		if (state.isSubmitting !== isSubmitting) {
			setState(D.merge({ isSubmitting }));
		}
	}, [state, isSubmitting]);

	return (
		<Layout>
			<Section className="mt-4 sm:mt-8 xl:mt-12">
				<Heading level={1}>Report an Incident</Heading>

				<Form onSubmit={onSubmit} className="max-w-prose">
					<HoneypotInputs />

					<div className="py-4 md:rounded md:border md:border-bg3 md:bg-bg2 md:p-8">
						<Pages
							page={page}
							setPage={setPage}
							state={state}
							setState={setState}
						/>

						<div className="mt-16 flex items-center justify-between gap-4">
							{page > 1 ? (
								<Button
									disabled={isSubmitting}
									className="min-w-48"
									variant="default"
									type="button"
									onClick={() => {
										setPage(N.subtract(1));
									}}
								>
									Previous Page
								</Button>
							) : (
								<div></div>
							)}

							{page === PAGES.SUMMARY ? (
								<Button
									disabled={isSubmitting}
									className="min-w-48"
									variant="primary"
									type="submit"
								>
									Submit
								</Button>
							) : (
								<Button
									disabled={isSubmitting}
									className="min-w-48"
									variant="primary"
									type="submit"
								>
									Continue
								</Button>
							)}
							{isSubmitting ? <div className="loader" /> : null}
						</div>
					</div>
				</Form>
			</Section>
		</Layout>
	);
}
