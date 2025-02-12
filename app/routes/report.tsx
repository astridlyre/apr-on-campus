import { A, D } from "@mobily/ts-belt";
import {
	data,
	redirect,
	unstable_composeUploadHandlers,
	unstable_createMemoryUploadHandler,
	unstable_parseMultipartFormData,
	type ActionFunction,
	type MetaFunction,
} from "@remix-run/node";
import { Form, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { CSRFError } from "remix-utils/csrf/server";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { SpamError } from "remix-utils/honeypot/server";

import Button from "~/components/Button";
import CheckboxGroup from "~/components/CheckboxGroup";
import DateInput from "~/components/DateInput";
import FileUpload from "~/components/FileUpload";
import Heading from "~/components/Heading";
import Inputs from "~/components/Inputs";
import Paragraph from "~/components/Paragraph";
import RadioButtons from "~/components/RadioButtons";
import Section from "~/components/Section";
import Select from "~/components/Select";
import TextArea from "~/components/TextArea";
import TextInput from "~/components/TextInput";
import { csrf } from "~/csrf.server";
import { honeypot } from "~/honeypot.server";
import {
	affiliation,
	campuses,
	disabilities,
	experiences,
	genderIdentities,
	genders,
	identification,
	identities,
	impacts,
	locations,
	organizations,
	provinces,
	reasons,
	religions,
	subjects,
	types,
} from "~/incidents";
import validateIncident from "~/incidents.server";
import Layout from "~/layout";
import { createIncident } from "~/models/incidents.server";
import confirmedTemplate from "~/services/emails/confirmed.template";
import sendEmail from "~/services/emails.server";
import { uploadFile } from "~/services/minio.server";
import {
	getFormDataValue,
	getFormDataValues,
	getFormFiles,
	isParsedFile,
	isTooBig,
	maxFiles,
	normalizePhoneNumber,
} from "~/utils";

export const meta: MetaFunction = () => [
	{ title: "Report | APR on Campus" },
	{ name: "description", content: "Report an incident of APR on Campus" },
];

export const action: ActionFunction = async ({ request }) => {
	await csrf.validate(request);

	// get file stream, upload to minio and then return the new file url
	const uploadHandler = unstable_composeUploadHandlers(
		async ({ name, data, filename }) => {
			if (!name.startsWith("file-")) {
				return undefined;
			}

			if (!filename) {
				console.error("No filename provided for file upload");
				return undefined;
			}

			try {
				const uploadedFile = await uploadFile({
					bucketName: "reports",
					fileName: filename as string,
					data,
				});

				return uploadedFile;
			} catch (err) {
				console.error(err);
				return undefined;
			}
		},
		unstable_createMemoryUploadHandler(),
	);

	try {
		const form = await unstable_parseMultipartFormData(request, uploadHandler);

		honeypot.check(form);

		const files = getFormFiles(form);
		const jsonFiles = files
			.map((jsonFile) => {
				try {
					return JSON.parse(jsonFile);
				} catch {
					return null;
				}
			})
			.filter(isParsedFile);

		const rawIncident = {
			userFirstName: getFormDataValue(form, "userFirstName"),
			userLastName: getFormDataValue(form, "userLastName"),
			userEmail: getFormDataValue(form, "userEmail"),
			userPhoneNumber: normalizePhoneNumber(
				getFormDataValue(form, "userPhoneNumber"),
			),
			date: getFormDataValue(form, "date"),
			province: getFormDataValue(form, "province"),
			subject: getFormDataValue(form, "subject"),
			wantsContact: getFormDataValue(form, "wantsContact"),
			wantsSharedWithOrgs: getFormDataValues(form, "wantsSharedWithOrgs"),
			identities: getFormDataValues(form, "identities"),
			identitiesOther: getFormDataValue(form, "identitiesOther"),
			gender: getFormDataValue(form, "gender"),
			genderOther: getFormDataValue(form, "genderOther"),
			genderIdentities: getFormDataValues(form, "genderIdentities"),
			genderIdentitiesOther: getFormDataValue(form, "genderIdentitiesOther"),
			religion: getFormDataValue(form, "religion"),
			religionOther: getFormDataValue(form, "religionOther"),
			disability: getFormDataValue(form, "disability"),
			identification: getFormDataValues(form, "identification"),
			userAffiliation: getFormDataValue(form, "userAffiliation"),
			location: getFormDataValue(form, "location"),
			locationOther: getFormDataValue(form, "locationOther"),
			campus: getFormDataValue(form, "campus"),
			type: getFormDataValues(form, "type"),
			typeOther: getFormDataValue(form, "typeOther"),
			description: getFormDataValue(form, "description"),
			impact: getFormDataValues(form, "impact"),
			impactDescription: getFormDataValue(form, "impactDescription"),
			didReport: getFormDataValue(form, "didReport"),
			didNotReportReason: getFormDataValues(form, "didNotReportReason"),
			didNotReportReasonOther: getFormDataValue(
				form,
				"didNotReportReasonOther",
			),
			wasFirstExperience: getFormDataValue(form, "wasFirstExperience"),
			wasFirstExperienceOther: getFormDataValue(
				form,
				"wasFirstExperienceOther",
			),
			additionalInformation: getFormDataValue(form, "additionalInformation"),
		};

		const { incident, errors } = validateIncident(rawIncident);

		if (!incident) {
			return data({ errors }, 422);
		}

		const createdIncident = await createIncident(
			D.merge(incident, { files: jsonFiles }),
		);

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
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useState<readonly File[]>([]);
	const [fileError, setFileError] = useState<string>("");
	const [incidentTypes, setIncidentTypes] = useState<Record<string, boolean>>(
		{},
	);
	const [incidentLocation, setIncidentLocation] = useState("");
	const [wasFirstExperience, setWasFirstExperience] = useState("");
	const [didReport, setDidReport] = useState<string>("");
	const [didNotReportReasons, setDidNotReportReasons] = useState<
		Record<string, boolean>
	>({});
	const [selectedIdentities, setSelectedIdentities] = useState<
		Record<string, boolean>
	>({});
	const [selectedGenderIdentities, setSelectedGenderIdentities] = useState<
		Record<string, boolean>
	>({});
	const [religion, setReligion] = useState("");
	const [gender, setGender] = useState("");

	useEffect(() => {
		setFiles([]);
		setFileError("");
		setIncidentTypes({});
		setIncidentLocation("");
		setWasFirstExperience("");
		setDidReport("");
		setDidNotReportReasons({});
	}, []);

	const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		const formData = new FormData(evt.currentTarget);

		// Remove the file field from the form data
		formData.delete("file");

		const slicedFiles = files.slice(0, maxFiles);

		// Add the files to the form data
		slicedFiles.forEach((file, i) => {
			formData.set(`file-${i}`, file);
		});

		submit(formData, {
			method: "post",
			action: "/report",
			encType: "multipart/form-data",
		});
	};

	const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setFiles((files) => {
			setFileError("");

			const newFiles = Array.from(evt.target.files || []);

			const sizedFiles = newFiles.filter((file) => !isTooBig(file));

			const slicedFiles = sizedFiles.slice(0, maxFiles - files.length);

			if (sizedFiles.length > slicedFiles.length) {
				setFileError(
					"Some files were too large (i.e. greater than 250MB) and were not attached.",
				);
			}

			if (slicedFiles.length) {
				return A.concat(files, slicedFiles);
			}

			return files;
		});
	};

	const isSubmitting = navigation.formAction === "/report";

	return (
		<Layout>
			<Section className="mt-4 sm:mt-8 xl:mt-12">
				<Heading level={1}>Report an Incident</Heading>
				<Paragraph>
					<strong>
						Have you experienced intimidation, harassment, or discrimination as
						a Palestinian or supporter of Palestinian rights?
					</strong>{" "}
					Share your experience&mdash;
					<strong>all submissions are confidential.</strong>
				</Paragraph>

				<Paragraph>
					Your participation is entirely voluntary. Fields marked with * are
					required to ensure the collected data can be used effectively.
				</Paragraph>

				<Form onSubmit={onSubmit} className="max-w-prose">
					<AuthenticityTokenInput />
					<HoneypotInputs />

					<Heading className="mt-12" level={4}>
						Contact Information
					</Heading>

					<Inputs.Pair>
						<TextInput
							label="First Name"
							name="userFirstName"
							type="text"
							required
							autoComplete="given-name"
							size={24}
							maxLength={100}
						/>

						<TextInput
							label="Last Name"
							name="userLastName"
							type="text"
							autoComplete="family-name"
							size={24}
							maxLength={100}
						/>
					</Inputs.Pair>

					<Inputs.Pair>
						<TextInput
							label="Email"
							name="userEmail"
							type="email"
							autoComplete="email"
							required
							size={24}
							maxLength={300}
						/>
					</Inputs.Pair>

					<Heading className="mb-6 mt-12" level={4}>
						About the Incident
					</Heading>

					<Inputs.Pair>
						<DateInput
							noFuture
							label="Date (approximate)"
							required
							name="date"
						/>

						<Select
							label="Province of Incident"
							options={provinces}
							name="province"
							required
						/>
					</Inputs.Pair>

					<br />

					<Inputs.Single>
						<RadioButtons
							required
							label="Did this racism happen to you or someone else?"
							options={subjects}
							name="subject"
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<RadioButtons
							label="If your experience occurred on a UBC campus, would you like a representative from UBC Divestment for Palestine to contact you for support in taking further action?"
							name="wantsContact"
							helperText="This report remains anonymous unless you choose to provide contact information."
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<CheckboxGroup
							label="If your experience took place elsewhere in Canada, do you consent to sharing your report with any of the following groups so they can contact you for support in taking further action? (check all that apply)"
							name="wantsSharedWithOrgs"
							options={organizations}
						/>
					</Inputs.Single>

					<br />

					<Paragraph>
						We want to better understand the full scope of intersectionality as
						it relates to people&apos;s experiences of racism when they are
						targeted. Please help us understand the ways with which you identify
						(as much as you are comfortable):
					</Paragraph>

					<Inputs.Single>
						<CheckboxGroup
							label="Do you identify as? (check all that apply)"
							options={identification}
							name="identification"
						/>
					</Inputs.Single>

					<br />

					<div>
						<Inputs.Single>
							<CheckboxGroup
								name="identities"
								label="Do you identify with any of the following identities? (check all that apply)"
								options={identities}
								onChange={setSelectedIdentities}
							/>
						</Inputs.Single>

						{selectedIdentities.Other ? (
							<Inputs.Single>
								<TextInput
									type="text"
									label="Please specify the identity"
									required
									name="identitiesOther"
									minLength={1}
									maxLength={100}
								/>
							</Inputs.Single>
						) : null}
					</div>

					<br />

					<div>
						<Inputs.Single>
							<RadioButtons
								name="religion"
								label="Do you identify as:"
								options={religions}
								onChange={setReligion}
							/>
						</Inputs.Single>

						{religion === "Other" ? (
							<Inputs.Single>
								<TextInput
									size={24}
									type="text"
									label="Please specify the religion"
									required
									name="religionOther"
									minLength={1}
									maxLength={100}
								/>
							</Inputs.Single>
						) : null}
					</div>

					<br />

					<div>
						<Inputs.Single>
							<RadioButtons
								name="gender"
								label="Do you identify as:"
								options={genders}
								onChange={setGender}
							/>
						</Inputs.Single>

						{gender === "Other" ? (
							<Inputs.Single>
								<TextInput
									type="text"
									label="Please specify the gender"
									required
									name="genderOther"
									minLength={1}
									maxLength={100}
								/>
							</Inputs.Single>
						) : null}
					</div>

					<br />

					<div>
						<Inputs.Single>
							<CheckboxGroup
								name="genderIdentities"
								label="Do you identify with any of the following identities? (check all that apply):"
								options={genderIdentities}
								onChange={setSelectedGenderIdentities}
							/>
						</Inputs.Single>

						{selectedGenderIdentities.Other ? (
							<Inputs.Single>
								<TextInput
									type="text"
									label="Please specify the identity"
									required
									name="genderIdentitiesOther"
									minLength={1}
									maxLength={100}
								/>
							</Inputs.Single>
						) : null}
					</div>

					<br />

					<Inputs.Single>
						<RadioButtons
							name="disability"
							label="Do you identify as a person with a disability:"
							options={disabilities}
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<TextArea
							maxLength={5000}
							rows={4}
							name="identityDescription"
							label="Is there any other part of your identity that you want to include that you think is relevant to your experience of being targeted? (ex. political affiliation, perceived socioeconomic status, newcomer, youth etc.)"
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<RadioButtons
							label="Are you:"
							required
							options={affiliation}
							name="userAffilication"
						/>
					</Inputs.Single>

					<br />

					<div>
						<Inputs.Single>
							<RadioButtons
								name="location"
								label="Where did this racism occur?"
								required
								options={locations}
								onChange={setIncidentLocation}
							/>
						</Inputs.Single>

						{incidentLocation === "Other" ? (
							<Inputs.Single>
								<TextInput
									type="text"
									label="Please specify the location"
									required
									name="locationOther"
									minLength={1}
									maxLength={100}
								/>
							</Inputs.Single>
						) : null}
					</div>

					<br />

					<Inputs.Single>
						<RadioButtons
							required
							label="Did this incident of APR happen on a UBC campus? (Vancouver or Okanagan)"
							name="campus"
							options={campuses}
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<CheckboxGroup
							name="type"
							label="What did this racism involve? (check all that apply)"
							options={types}
							onChange={setIncidentTypes}
						/>
					</Inputs.Single>

					{incidentTypes.Other ? (
						<Inputs.Single>
							<TextInput
								type="text"
								label="Please describe"
								name="typeOther"
								minLength={1}
								maxLength={100}
							/>
						</Inputs.Single>
					) : null}

					<br />

					<Inputs.Single>
						<TextArea
							rows={6}
							name="description"
							label="Please describe your experience with racism (what happened, who was involved, what did you do, did you get a resolution etc)?"
							required
							minLength={1}
							maxLength={5000}
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<CheckboxGroup
							name="impact"
							label="How has this racist experience impacted you? (check all that apply)"
							options={impacts}
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<TextArea
							rows={3}
							label="Feel free to explain further how racism has impacted you"
							name="impactDescription"
							maxLength={5000}
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<RadioButtons
							label="If your experience was at a UBC campus (Vancouver or Okanagan), did you report it to the Equity and Inclusion office or the Investigations office?"
							name="didReport"
							onChange={setDidReport}
						/>
					</Inputs.Single>

					{didReport === "No" ? (
						<div>
							<Inputs.Single>
								<CheckboxGroup
									onChange={setDidNotReportReasons}
									name="didNotReportReason"
									label="If you did not report, tell us why you didn't report? (check all that apply)"
									options={reasons}
								/>
							</Inputs.Single>

							{didNotReportReasons.Other ? (
								<Inputs.Single>
									<TextInput
										type="text"
										label="Please specify"
										name="didNotReportReasonOther"
									/>
								</Inputs.Single>
							) : null}
						</div>
					) : null}

					<br />

					<div>
						<Inputs.Single>
							<RadioButtons
								label="Was this your first experience with anti-Arab/Palestinian racism?"
								required
								name="wasFirstExperience"
								onChange={setWasFirstExperience}
								options={experiences}
								value={wasFirstExperience}
							/>
						</Inputs.Single>

						{wasFirstExperience === "Other" ? (
							<Inputs.Single>
								<TextInput
									required
									type="text"
									label="Please specify"
									name="wasFirstExperienceOther"
									minLength={1}
									maxLength={100}
								/>
							</Inputs.Single>
						) : null}
					</div>

					<br />

					<Inputs.Single>
						<TextArea
							label="Is there anything else you would like to share with us?"
							rows={3}
							maxLength={5000}
							name="additionalInformation"
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<FileUpload
							files={files}
							setFiles={setFiles}
							fileInputRef={fileInputRef}
							handleFileChange={handleFileChange}
							fileError={fileError}
							isSubmitting={isSubmitting}
						/>
					</Inputs.Single>

					<Paragraph className="my-6 sm:mb-8" variant="small-secondary">
						We keep your personal information private and secure. We will never
						share your information without your consent.
					</Paragraph>

					<div className="flex items-center gap-4">
						<Button
							disabled={isSubmitting}
							className="min-w-48"
							variant="primary"
							type="submit"
						>
							Submit Report
						</Button>

						{isSubmitting ? <div className="loader" /> : null}
					</div>
				</Form>
			</Section>
		</Layout>
	);
}
