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
import { useRef, useState } from "react";
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
import Layout from "~/layout";
import { createIncident } from "~/models/incidents.server";
import confirmedTemplate from "~/services/emails/confirmed.template";
import sendEmail from "~/services/emails.server";
import { uploadFile } from "~/services/minio.server";
import {
	getFormDataValue,
	getFormFiles,
	isParsedFile,
	isTooBig,
	maxFiles,
	normalizePhoneNumber,
	validateEmail,
} from "~/utils";

export const meta: MetaFunction = () => [
	{ title: "Report | APR on Campus" },
	{ name: "description", content: "Report an incident of APR on Campus" },
];

const provinces = [
	{ label: "— Select Province or Territory —", value: "" },
	{ label: "Alberta", value: "AB" },
	{ label: "British Columbia", value: "BC" },
	{ label: "Manitoba", value: "MB" },
	{ label: "New Brunswick", value: "NB" },
	{ label: "Newfoundland and Labrador", value: "NL" },
	{ label: "Northwest Territories", value: "NT" },
	{ label: "Nova Scotia", value: "NS" },
	{ label: "Nunavut", value: "NU" },
	{ label: "Ontario", value: "ON" },
	{ label: "Prince Edward Island", value: "PE" },
	{ label: "Quebec", value: "QC" },
	{ label: "Saskatchewan", value: "SK" },
	{ label: "Yukon", value: "YT" },
];

const incidentTypeOptions = [
	{ label: "Smearing/ defaming", value: "Smearing/ defaming" },
	{ label: "Dehumanizing", value: "Dehumanizing" },
	{ label: "Erasing/ Denying", value: "Erasing/ Denying" },
	{ label: "Excluding", value: "Excluding" },
	{ label: "Stereotyping", value: "Stereotyping" },
	{ label: "Silencing", value: "Silencing" },
	{ label: "Retaliation", value: "Retaliation" },
	{ label: "Over scrutiny ", value: "Over scrutiny" },
	{ label: "Physical Violence", value: "Physical Violence" },
	{ label: "Emotional Violence", value: "Emotional Violence" },
	{ label: "Vandalism", value: "Vandalism" },
	{ label: "Other", value: "Other" },
];

const subjects = [
	{ label: "Myself", value: "Myself" },
	{ label: "Someone else", value: "Someone else" },
];

const incidentLocations = [
	{ label: "Workplace", value: "Workplace" },
	{
		label: "Public/Private School",
		value: "Public/Private School",
	},
	{ label: "Campus", value: "Campus" },
	{ label: "Transit", value: "Transit" },
	{ label: "Public setting", value: "Public setting" },
	{ label: "Community Space", value: "Community Space" },
	{ label: "Online", value: "Online" },
	{ label: "Media", value: "Media" },
	{
		label: "Social /Recreational setting",
		value: "Social /Recreational setting",
	},
	{ label: "Association/Union", value: "Association/union" },
	{
		label: "Judicial / Tribunal system",
		value: "Judicial / Tribunal system",
	},
	{ label: "Healthcare system", value: "Healthcare system" },
	{ label: "Government service", value: "Government service" },
	{ label: "Police", value: "Police" },
	{ label: "Other", value: "Other" },
];

interface Errors {
	incidentDate?: string;
	incidentProvince?: string;
	incidentLocation?: string;
	incidentDescription?: string;
	incidentType?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	phoneNumber?: string;
	city?: string;
	province?: string;
}

function validateIncident(incident: Record<string, unknown>): Errors {
	const errors: Errors = {};

	if (!incident.date) {
		errors.incidentDate = "Please provide the date of the incident";
	}

	if (!provinces.find((province) => province.value === incident.province)) {
		errors.incidentProvince = "Please select the province of the incident";
	}

	if (!incident.location) {
		errors.incidentLocation = "Please provide the location of the incident";
	}

	if (!incident.description) {
		errors.incidentDescription = "Please describe the incident";
	}

	if (!incident.type) {
		errors.incidentType = "Please select the type of incident";
	}

	if (!incident.userFirstName) {
		errors.firstName = "Please provide your first name";
	}

	if (!incident.userLastName) {
		errors.lastName = "Please provide your last name";
	}

	if (!incident.userEmail) {
		errors.email = "Please provide your email address";
	}

	if (!validateEmail(incident.userEmail)) {
		errors.email = "Please provide a valid email address";
	}

	if (
		incident.userProvince &&
		!provinces.find((province) => province.value === incident.userProvince)
	) {
		errors.province = "Please select a valid province";
	}

	return errors;
}

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

		const incident = {
			date: getFormDataValue(form, "incidentDate"),
			province: getFormDataValue(form, "incidentProvince"),
			location: getFormDataValue(form, "incidentLocation"),
			description: getFormDataValue(form, "incidentDescription"),
			type: getFormDataValue(form, "incidentType"),
			userFirstName: getFormDataValue(form, "firstName"),
			userLastName: getFormDataValue(form, "lastName"),
			userEmail: getFormDataValue(form, "email"),
			userPhoneNumber: normalizePhoneNumber(
				getFormDataValue(form, "phoneNumber"),
			),
			userCity: getFormDataValue(form, "city"),
			userProvince: getFormDataValue(form, "province"),
			wasReported: form.has("wasReported"),
			wantsForwarded: form.has("wantsForwarded"),
			files: jsonFiles,
		};

		const errors = validateIncident(incident);

		if (D.isNotEmpty(errors)) {
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
					If you have experienced or witnessed an incident of Anti-Palestinian
					Racism (APR) in Canada, we encourage you to report it using the form
					below. Your report will help us document the prevalence of APR and
					advocate for systemic change.
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
							name="firstName"
							type="text"
							required
							autoComplete="given-name"
							size={24}
							maxLength={100}
						/>

						<TextInput
							label="Last Name"
							name="lastName"
							type="text"
							autoComplete="family-name"
							size={24}
							maxLength={100}
						/>
					</Inputs.Pair>

					<Inputs.Pair>
						<TextInput
							label="Email"
							name="email"
							type="email"
							autoComplete="email"
							required
							size={24}
							maxLength={300}
						/>

						<TextInput
							label="Phone Number"
							name="phoneNumber"
							type="text"
							autoComplete="tel"
							inputMode="numeric"
							size={24}
							maxLength={20}
						/>
					</Inputs.Pair>

					<Heading className="mb-6 mt-12" level={4}>
						About the Incident
					</Heading>

					<Inputs.Pair>
						<DateInput
							noFuture
							label="Date of Incident"
							required
							name="incidentDate"
						/>

						<Select
							label="Province of Incident"
							options={provinces}
							name="incidentProvince"
							required
						/>
					</Inputs.Pair>

					<br />

					<Inputs.Single>
						<RadioButtons
							required
							label="Did this racism happen to you or someone else?"
							options={subjects}
							name="incidentSubjet"
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<RadioButtons
							label="If your experience occurred on a UBC campus, would you like a representative from Divest to contact you for support in taking further action? (link email as well?)"
							name="contactDivest"
						/>
						<small className="block mt-2">
							This report remains anonymous unless you choose to provide contact
							information.
						</small>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<RadioButtons
							label="Do you consent to sharing your report with [Org 1] and [Org 2], which are tracking incidents of APR to gather statistics and advocate for change?"
							name="shareWithOrgs"
						/>
						<small className="block mt-2">
							You will have the option to have your report forwarded
							anonymously.
						</small>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<CheckboxGroup
							label="Do you self-identify as: (check all that apply)"
							options={[
								{ label: "Arab", value: "Arab" },
								{ label: "Palestinian", value: "Palestinian" },
								{ label: "Other", value: "Other" },
							]}
							name="selfIdentification"
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<RadioButtons
							label="Are you:"
							required
							options={[
								{ label: "UBC Student", value: "UBC Student" },
								{ label: "UBC Faculty", value: "UBC Faculty" },
								{ label: "UBC Staff", value: "UBC Staff" },
								{
									label:
										"A student, faculty or staff at another Canadian educational institution",
									value:
										"A student, faculty or staff at another Canadian educational institution",
								},
								{ label: "None", value: "None" },
							]}
							name="selfIdentification"
						/>
					</Inputs.Single>

					<br />

					<div>
						<Inputs.Single>
							<RadioButtons
								name="incidentLocation"
								label="Where did this racism occur?"
								required
								options={incidentLocations}
								onChange={setIncidentLocation}
							/>
						</Inputs.Single>

						{incidentLocation === "Other" ? (
							<Inputs.Single>
								<TextInput
									type="text"
									label="Please specify the location"
									required
									name="incidentLocationOther"
								/>
							</Inputs.Single>
						) : null}
					</div>

					<br />

					<Inputs.Single>
						<RadioButtons
							label="Did your incident of APR happen on a UBC Campus (Vancouver or Okanagan):"
							name="incidentLocationCampus"
							options={[
								{ label: "Yes - UBC Vancouver Campus", value: "UBC" },
								{ label: "Yes - UBC Okanagan Campus", value: "UBCO" },
								{ label: "No", value: "no" },
							]}
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<CheckboxGroup
							name="incidentType"
							label="What did this racism involve? (check all that apply)"
							options={incidentTypeOptions}
							onChange={setIncidentTypes}
						/>
					</Inputs.Single>

					{incidentTypes.Other ? (
						<Inputs.Single>
							<TextInput
								type="text"
								label="Please describe"
								name="incidentTypeOther"
							/>
						</Inputs.Single>
					) : null}

					<br />

					<Inputs.Single>
						<TextArea
							rows={6}
							name="incidentDescription"
							label="Please describe your experience with racism (What happened, who was involved, what did you do, did you get a resolution etc)?"
							required
							maxLength={5000}
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<CheckboxGroup
							name="incidentImpact"
							label="How has this racist experience impacted you? (check all that apply)"
							options={[
								{ label: "Stress", value: "Stress" },
								{ label: "Fearfulness", value: "Fearfulness" },
								{ label: "Depression", value: "Depression" },
								{
									label: "Withdrawal / Isolation from activities or people",
									value: "Withdrawal / Isolation from activities or people",
								},
								{ label: "Hypervigilence", value: "Hypervigilence" },
								{ label: "Physical pain", value: "Physical pain" },
								{
									label: "Worsening of other health conditions",
									value: "Worsening of other health conditions",
								},
								{ label: "Headaches", value: "Headaches" },
								{ label: "Loss of appetite", value: "Loss of appetite" },
								{
									label: "Loss of relationships",
									value: "Loss of relationships",
								},
								{ label: "Self-censorship", value: "Self-censorship" },
								{ label: "Anxiety", value: "Anxiety" },
								{ label: "Insomnia", value: "Insomnia" },
								{ label: "Low-self esteem", value: "Low-self esteem" },
								{ label: "Self-doubt", value: "Self-doubt" },
								{ label: "Feeling intimidated", value: "Feeling intimidated" },
								{ label: "Loss of employment", value: "Loss of employment" },
								{
									label: "Loss of employment or career opportunities",
									value: "Loss of employment or career opportunities",
								},
							]}
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<TextArea
							rows={6}
							label="Feel free to explain further how racism has impacted you"
							name="incidentImpactAdditional"
							maxLength={5000}
						/>
					</Inputs.Single>

					<br />

					<Inputs.Single>
						<RadioButtons
							label="If your experience was at a UBC Campus (Vancouver or Okanagan), did you report it to the Equity and Inclusion Office or the Investigations Office?"
							name="didShareOffices"
							onChange={setDidReport}
						/>
					</Inputs.Single>

					{didReport === "no" ? (
						<div>
							<Inputs.Single>
								<CheckboxGroup
									onChange={setDidNotReportReasons}
									name="didNotReportReasons"
									label="If you did not report, tell us why you didn't report? (check all that apply)"
									options={[
										{ label: "Fear of reprisal", value: "Fear of reprisal" },
										{
											label:
												"I did not know if there is a complaint process or who to report to?",
											value:
												"I did not know if there is a complaint process or who to report to?",
										},
										{
											label:
												"I did not think my complaint would be taken seriously",
											value:
												"I did not think my complaint would be taken seriously",
										},
										{
											label:
												"I did not trust the person I would need to speak to",
											value:
												"I did not trust the person I would need to speak to",
										},
										{
											label: "I thought reporting would make the problem worse",
											value: "I thought reporting would make the problem worse",
										},
										{
											label:
												"I thought reporting would impact future opportunities",
											value:
												"I thought reporting would impact future opportunities",
										},
										{
											label:
												"My friends, family or colleagues told me not to report",
											value:
												"My friends, family or colleagues told me not to report",
										},
										{
											label: "I did not think I would be believed",
											value: "I did not think I would be believed",
										},
										{
											label:
												"Earlier attempts to report problem did not go anywhere",
											value:
												"Earlier attempts to report problem did not go anywhere",
										},
										{
											label:
												"My human resources or EDI office does not recognize anti-Palestinian racism",
											value:
												"My human resources or EDI office does not recognize anti-Palestinian racism",
										},
										{ label: "Other", value: "Other" },
									]}
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
								options={[
									{ label: "Yes", value: "yes" },
									{ label: "No", value: "no" },
									{ label: "Other", value: "other" },
								]}
							/>
						</Inputs.Single>

						{wasFirstExperience === "other" ? (
							<Inputs.Single>
								<TextInput
									type="text"
									label="Please specify"
									name="wasFirstExperienceOther"
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
						We keep your personal information private and secure. All incident
						reports to APR on Campus’s anti-hate online incident form are kept
						strictly confidential unless otherwise specified.
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
