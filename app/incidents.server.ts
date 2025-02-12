import { betterAjvErrors } from "@apideck/better-ajv-errors";
import { A, D } from "@mobily/ts-belt";
import Ajv, { type SchemaObject } from "ajv";
import addFormats from "ajv-formats";

import * as incidents from "./incidents";

const toValues = (items: { label: string; value: string }[]) =>
	A.map(items, D.get("value")).filter(Boolean);

const booleanValues = ["Yes", "No"];

const userFirstNameSchema = {
	type: "string",
	minLength: 1,
	maxLength: 100,
};

const userLastNameSchema = {
	type: "string",
	minLength: 1,
	maxLength: 100,
};

const userEmailSchema = {
	type: "string",
	format: "email",
	minLength: 3,
	maxLength: 300,
};
const userPhoneNumberSchema = {
	type: "string",
	minLength: 4,
	maxLength: 20,
};

const dateSchema = {
	type: "string",
	format: "date",
};

const provinceSchema = {
	type: "string",
	enum: toValues(incidents.provinces),
};

const subjectSchema = {
	type: "string",
	enum: toValues(incidents.subjects),
};

const wantsContactSchema = {
	type: "string",
	enum: booleanValues,
};

const wantsSharedWithOrgsSchema = {
	type: "array",
	items: { type: "string", enum: toValues(incidents.organizations) },
};

const identitiesSchema = {
	type: "array",
	items: { type: "string", enum: toValues(incidents.identities) },
};

const religionsSchema = {
	type: "string",
	enum: toValues(incidents.religions),
};

const gendersSchema = {
	type: "string",
	enum: toValues(incidents.genders),
};

const genderIdentitiesSchema = {
	type: "array",
	items: { type: "string", enum: toValues(incidents.genderIdentities) },
};

const disabilitiesSchema = {
	type: "string",
	enum: toValues(incidents.disabilities),
};

const identityDescriptionSchema = {
	type: "string",
	maxLength: 5000,
};

const otherSchema = {
	type: "string",
	minLength: 1,
	maxLength: 100,
};

const identificationSchema = {
	type: "array",
	items: { type: "string", enum: toValues(incidents.identification) },
};

const userAffiliationSchema = {
	type: "string",
	enum: toValues(incidents.affiliation),
};

const locationSchema = {
	type: "string",
	enum: toValues(incidents.locations),
};

const locationOtherSchema = {
	type: "string",
	minLength: 1,
	maxLength: 100,
};

const campusSchema = {
	type: "string",
	enum: toValues(incidents.campuses),
};

const typeSchema = {
	type: "array",
	items: { type: "string", enum: toValues(incidents.types) },
};

const typeOtherSchema = {
	type: "string",
	minLength: 1,
	maxLength: 100,
};

const descriptionSchema = {
	type: "string",
	minLength: 1,
	maxLength: 5000,
};

const impactSchema = {
	type: "array",
	items: { type: "string", enum: toValues(incidents.impacts) },
};

const impactDescriptionSchema = {
	type: "string",
	maxLength: 5000,
};

const didReportSchema = { type: "string", enum: booleanValues };

const didNotReportReasonSchema = {
	type: "array",
	items: { type: "string", enum: toValues(incidents.reasons) },
};

const didNotReportReasonOtherSchema = {
	type: "string",
	minLength: 1,
	maxLength: 100,
};

const wasFirstExperienceSchema = {
	type: "string",
	enum: toValues(incidents.experiences),
};

const wasFirstExperienceOtherSchema = {
	type: "string",
	minLength: 1,
	maxLength: 100,
};

const additionalInformationSchema = {
	type: "string",
	maxLength: 5000,
};

function handleOtherSingle(c: string, other: string) {
	if (c.toLowerCase() !== "other") {
		return c;
	}
	return other;
}

function handleOther(cases: string[], other: string) {
	const filtered = cases.filter((c) => c.toLowerCase() !== "other");

	if (filtered.length === cases.length) {
		return filtered;
	}

	return [...filtered, other];
}

export function createValidators() {
	const ajv = new Ajv({ allErrors: true });

	addFormats(ajv);

	const hasErrors = (schema: SchemaObject) => (data: unknown) => {
		if (!ajv.validate(schema, data)) {
			const [first] = betterAjvErrors({
				schema,
				data,
				errors: ajv.errors,
			});

			return first;
		}
	};

	return {
		userFirstName: hasErrors(userFirstNameSchema),
		userLastName: hasErrors(userLastNameSchema),
		userEmail: hasErrors(userEmailSchema),
		userPhoneNumber: hasErrors(userPhoneNumberSchema),
		date: hasErrors(dateSchema),
		province: hasErrors(provinceSchema),
		subject: hasErrors(subjectSchema),
		wantsContact: hasErrors(wantsContactSchema),
		wantsSharedWithOrgs: hasErrors(wantsSharedWithOrgsSchema),
		identities: hasErrors(identitiesSchema),
		religion: hasErrors(religionsSchema),
		gender: hasErrors(gendersSchema),
		genderIdentities: hasErrors(genderIdentitiesSchema),
		disability: hasErrors(disabilitiesSchema),
		identityDescription: hasErrors(identityDescriptionSchema),
		identification: hasErrors(identificationSchema),
		userAffiliation: hasErrors(userAffiliationSchema),
		location: hasErrors(locationSchema),
		locationOther: hasErrors(locationOtherSchema),
		campus: hasErrors(campusSchema),
		type: hasErrors(typeSchema),
		typeOther: hasErrors(typeOtherSchema),
		description: hasErrors(descriptionSchema),
		impact: hasErrors(impactSchema),
		impactDescription: hasErrors(impactDescriptionSchema),
		didReport: hasErrors(didReportSchema),
		didNotReportReason: hasErrors(didNotReportReasonSchema),
		didNotReportReasonOther: hasErrors(didNotReportReasonOtherSchema),
		wasFirstExperience: hasErrors(wasFirstExperienceSchema),
		wasFirstExperienceOther: hasErrors(wasFirstExperienceOtherSchema),
		additionalInformation: hasErrors(additionalInformationSchema),
		other: hasErrors(otherSchema),
	};
}

interface ErrorObject {
	message: string;
	suggestion?: string;
}

interface Errors {
	userFirstName?: ErrorObject;
	userLastName?: ErrorObject;
	userEmail?: ErrorObject;
	userPhoneNumber?: ErrorObject;
	date?: ErrorObject;
	province?: ErrorObject;
	subject?: ErrorObject;
	wantsContact?: ErrorObject;
	wantsSharedWithOrgs?: ErrorObject;
	identities?: ErrorObject;
	identitiesOther?: ErrorObject;
	religion?: ErrorObject;
	religionOther?: ErrorObject;
	gender?: ErrorObject;
	genderOther?: ErrorObject;
	genderIdentities?: ErrorObject;
	genderIdentitiesOther?: ErrorObject;
	disability?: ErrorObject;
	identityDescription?: ErrorObject;
	identification?: ErrorObject;
	userAffiliation?: ErrorObject;
	location?: ErrorObject;
	locationOther?: ErrorObject;
	campus?: ErrorObject;
	type?: ErrorObject;
	typeOther?: ErrorObject;
	description?: ErrorObject;
	impact?: ErrorObject;
	impactDescription?: ErrorObject;
	didReport?: ErrorObject;
	didNotReportReason?: ErrorObject;
	didNotReportReasonOther?: ErrorObject;
	wasFirstExperience?: ErrorObject;
	wasFirstExperienceOther?: ErrorObject;
	additionalInformation?: ErrorObject;
}

interface Incident {
	userFirstName: string;
	userLastName: string;
	userEmail: string;
	userPhoneNumber: string;
	date: string;
	province: string;
	subject: string;
	wantsContact: boolean;
	wantsSharedWithOrgs: string[];
	identities: string[];
	religion: string;
	gender: string;
	genderIdentities: string[];
	disability: string;
	identityDescription: string;
	identification: string[];
	userAffiliation: string;
	location: string;
	campus: string;
	type: string[];
	description: string;
	impact: string[];
	impactDescription: string;
	didReport: boolean;
	didNotReportReason: string[];
	wasFirstExperience: string;
	additionalInformation: string;
}

interface ValidationResult {
	errors: Errors;
	incident: Incident | null;
}

export default function validateIncident(
	incident: Record<string, unknown>,
): ValidationResult {
	const {
		userFirstName,
		userLastName,
		userEmail,
		userPhoneNumber,
		date,
		province,
		subject,
		wantsContact,
		wantsSharedWithOrgs,
		identities,
		identitiesOther,
		religion,
		religionOther,
		gender,
		genderOther,
		genderIdentities,
		genderIdentitiesOther,
		identityDescription,
		disability,
		identification,
		userAffiliation,
		location,
		locationOther,
		campus,
		type,
		typeOther,
		description,
		impact,
		impactDescription,
		didReport,
		didNotReportReason,
		didNotReportReasonOther,
		wasFirstExperience,
		wasFirstExperienceOther,
		additionalInformation,
	} = incident;

	const errors: Errors = {};
	const validators = createValidators();

	errors.userFirstName = validators.userFirstName(userFirstName);

	if (userLastName) {
		errors.userLastName = validators.userLastName(userLastName);
	}

	errors.userEmail = validators.userEmail(userEmail);

	if (userPhoneNumber) {
		errors.userPhoneNumber = validators.userPhoneNumber(userPhoneNumber);
	}

	errors.date = validators.date(date);
	errors.province = validators.province(province);
	errors.subject = validators.subject(subject);

	if (wantsContact) {
		errors.wantsContact = validators.wantsContact(wantsContact);
	}

	if (wantsSharedWithOrgs) {
		errors.wantsSharedWithOrgs =
			validators.wantsSharedWithOrgs(wantsSharedWithOrgs);
	}

	if (identities) {
		errors.identities = validators.identities(identities);
	}

	if (identitiesOther) {
		errors.identitiesOther = validators.other(identitiesOther);
	}

	if (religion) {
		errors.religion = validators.religion(religion);
	}

	if (religionOther) {
		errors.religionOther = validators.other(religionOther);
	}

	if (gender) {
		errors.gender = validators.gender(gender);
	}

	if (genderOther) {
		errors.genderOther = validators.other(genderOther);
	}

	if (genderIdentities) {
		errors.genderIdentities = validators.genderIdentities(genderIdentities);
	}

	if (genderIdentitiesOther) {
		errors.genderIdentitiesOther = validators.other(genderIdentitiesOther);
	}

	if (disability) {
		errors.disability = validators.disability(disability);
	}

	if (identityDescription) {
		errors.identityDescription =
			validators.identityDescription(identityDescription);
	}

	if (identification) {
		errors.identification = validators.identification(identification);
	}

	if (userAffiliation) {
		errors.userAffiliation = validators.userAffiliation(userAffiliation);
	}

	errors.location = validators.location(location);

	if (locationOther) {
		errors.locationOther = validators.locationOther(locationOther);
	}

	errors.campus = validators.campus(campus);

	errors.type = validators.type(type);

	if (typeOther) {
		errors.typeOther = validators.typeOther(typeOther);
	}

	errors.description = validators.description(description);

	if (impact) {
		errors.impact = validators.impact(impact);
	}

	if (impactDescription) {
		errors.impactDescription = validators.impactDescription(impactDescription);
	}

	if (didReport) {
		errors.didReport = validators.didReport(didReport);
	}

	if (didNotReportReason) {
		errors.didNotReportReason =
			validators.didNotReportReason(didNotReportReason);
	}

	if (didNotReportReasonOther) {
		errors.didNotReportReasonOther = validators.didNotReportReasonOther(
			didNotReportReasonOther,
		);
	}

	if (wasFirstExperience) {
		errors.wasFirstExperience =
			validators.wasFirstExperience(wasFirstExperience);
	}

	if (wasFirstExperience === "other") {
		errors.wasFirstExperienceOther = validators.wasFirstExperienceOther(
			wasFirstExperienceOther,
		);
	}

	if (additionalInformation) {
		errors.additionalInformation = validators.additionalInformation(
			additionalInformation,
		);
	}

	const filteredErrors = D.filter(errors, Boolean);

	if (D.isNotEmpty(filteredErrors)) {
		return { incident: null, errors: filteredErrors };
	}

	return {
		errors: filteredErrors,
		incident: {
			userFirstName: (userFirstName as string) || "",
			userLastName: (userLastName as string) || "",
			userEmail: (userEmail as string) || "",
			userPhoneNumber: (userPhoneNumber as string) || "",
			date: (date as string) || "",
			province: (province as string) || "",
			subject: (subject as string) || "",
			wantsContact: wantsContact === "Yes",
			wantsSharedWithOrgs: wantsSharedWithOrgs as string[],
			identities: handleOther(
				identities as string[],
				identitiesOther as string,
			),
			religion:
				handleOtherSingle(religion as string, religionOther as string) || "",
			gender: handleOtherSingle(gender as string, genderOther as string) || "",
			genderIdentities: handleOther(
				genderIdentities as string[],
				genderIdentitiesOther as string,
			),
			disability: (disability as string) || "",
			identityDescription: (identityDescription as string) || "",
			identification: identification as string[],
			userAffiliation: (userAffiliation as string) || "",
			location:
				handleOtherSingle(location as string, locationOther as string) || "",
			campus: (campus as string) || "",
			type: handleOther(type as string[], typeOther as string),
			description: (description as string) || "",
			impact: impact as string[],
			impactDescription: (impactDescription as string) || "",
			didReport: didReport === "Yes",
			didNotReportReason: handleOther(
				didNotReportReason as string[],
				didNotReportReasonOther as string,
			),
			wasFirstExperience:
				handleOtherSingle(
					wasFirstExperience as string,
					wasFirstExperienceOther as string,
				) || "",
			additionalInformation: (additionalInformation as string) || "",
		},
	};
}
