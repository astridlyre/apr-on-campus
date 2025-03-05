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

const userAffiliationSchema = {
	type: "string",
	enum: toValues(incidents.affiliation),
};

const locationSchema = {
	type: "array",
	items: { type: "string", enum: toValues(incidents.locations) },
};

const campusSchema = {
	type: "string",
	enum: toValues(incidents.campuses),
};

const typeSchema = {
	type: "array",
	items: { type: "string", enum: toValues(incidents.types) },
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

const wasFirstExperienceSchema = {
	type: "string",
	enum: toValues(incidents.yesNoOther),
};

const wasSystemicSchema = {
	type: "string",
	enum: toValues(incidents.yesNoUnsure),
};

const otherSchema = {
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
		date: hasErrors(dateSchema),
		province: hasErrors(provinceSchema),
		subject: hasErrors(subjectSchema),
		wantsContact: hasErrors(wantsContactSchema),
		wantsSharedWithOrgs: hasErrors(wantsSharedWithOrgsSchema),
		allowsSocialShare: hasErrors(wantsContactSchema),
		identities: hasErrors(identitiesSchema),
		gender: hasErrors(gendersSchema),
		genderIdentities: hasErrors(genderIdentitiesSchema),
		disability: hasErrors(disabilitiesSchema),
		identityDescription: hasErrors(identityDescriptionSchema),
		userAffiliation: hasErrors(userAffiliationSchema),
		location: hasErrors(locationSchema),
		campus: hasErrors(campusSchema),
		type: hasErrors(typeSchema),
		description: hasErrors(descriptionSchema),
		impact: hasErrors(impactSchema),
		impactDescription: hasErrors(impactDescriptionSchema),
		didReport: hasErrors(didReportSchema),
		wasFirstExperience: hasErrors(wasFirstExperienceSchema),
		wasSystemic: hasErrors(wasSystemicSchema),
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
	userAffiliation?: ErrorObject;
	date?: ErrorObject;
	province?: ErrorObject;
	subject?: ErrorObject;
	location?: ErrorObject;
	locationOther?: ErrorObject;
	campus?: ErrorObject;
	wantsContact?: ErrorObject;
	wantsShared?: ErrorObject;
	wantsSharedWithOrgs?: ErrorObject;
	allowsSocialShare?: ErrorObject;
	didReport?: ErrorObject;
	type?: ErrorObject;
	typeOther?: ErrorObject;
	description?: ErrorObject;
	impact?: ErrorObject;
	impactDescription?: ErrorObject;
	wasFirstExperience?: ErrorObject;
	wasFirstExperienceOther?: ErrorObject;
	wasSystemic?: ErrorObject;
	identities?: ErrorObject;
	identitiesOther?: ErrorObject;
	gender?: ErrorObject;
	genderOther?: ErrorObject;
	genderIdentities?: ErrorObject;
	genderIdentitiesOther?: ErrorObject;
	disability?: ErrorObject;
	identityDescription?: ErrorObject;
	additionalInformation?: ErrorObject;
}

interface Incident {
	userFirstName: string;
	userLastName: string;
	userEmail: string;
	userAffiliation: string;
	date: string;
	province: string;
	subject: string;
	location: string[];
	campus: string;
	wantsContact: boolean;
	wantsSharedWithOrgs: string[];
	allowsSocialShare: boolean;
	didReport: boolean;
	type: string[];
	description: string;
	impact: string[];
	impactDescription: string;
	wasFirstExperience: string;
	wasSystemic: string;
	identities: string[];
	gender: string;
	genderIdentities: string[];
	disability: string;
	identityDescription: string;
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
		userAffiliation,
		date,
		province,
		subject,
		location,
		locationOther,
		campus,
		wantsContact,
		wantsShared,
		wantsSharedWithOrgs,
		allowsSocialShare,
		didReport,
		type,
		typeOther,
		description,
		impact,
		impactDescription,
		wasFirstExperience,
		wasFirstExperienceOther,
		wasSystemic,
		identities,
		identitiesOther,
		gender,
		genderOther,
		genderIdentities,
		genderIdentitiesOther,
		disability,
		identityDescription,
		additionalInformation,
	} = incident;

	const errors: Errors = {};
	const validators = createValidators();

	errors.userFirstName = validators.userFirstName(userFirstName);

	if (userLastName) {
		errors.userLastName = validators.userLastName(userLastName);
	}

	errors.userEmail = validators.userEmail(userEmail);

	if (userAffiliation) {
		errors.userAffiliation = validators.userAffiliation(userAffiliation);
	}

	errors.date = validators.date(date);
	errors.province = validators.province(province);
	errors.subject = validators.subject(subject);
	errors.location = validators.location(location);

	if (locationOther) {
		errors.locationOther = validators.other(locationOther);
	}

	errors.campus = validators.campus(campus);

	if (wantsContact) {
		errors.wantsContact = validators.wantsContact(wantsContact);
	}

	if (wantsShared === booleanValues[0] && wantsSharedWithOrgs) {
		errors.wantsSharedWithOrgs =
			validators.wantsSharedWithOrgs(wantsSharedWithOrgs);
	}

	if (allowsSocialShare) {
		errors.allowsSocialShare = validators.allowsSocialShare(allowsSocialShare);
	}

	if (didReport) {
		errors.didReport = validators.didReport(didReport);
	}

	errors.type = validators.type(type);

	if (typeOther) {
		errors.typeOther = validators.other(typeOther);
	}

	errors.description = validators.description(description);

	if (impact) {
		errors.impact = validators.impact(impact);
	}

	if (impactDescription) {
		errors.impactDescription = validators.impactDescription(impactDescription);
	}

	if (wasFirstExperience) {
		errors.wasFirstExperience =
			validators.wasFirstExperience(wasFirstExperience);
	}

	if (wasFirstExperience === "other") {
		errors.wasFirstExperienceOther = validators.other(wasFirstExperienceOther);
	}

	if (wasSystemic) {
		errors.wasSystemic = validators.wasSystemic(wasSystemic);
	}

	if (identities) {
		errors.identities = validators.identities(identities);
	}

	if (identitiesOther) {
		errors.identitiesOther = validators.other(identitiesOther);
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
			userAffiliation: (userAffiliation as string) || "",
			date: (date as string) || "",
			province: (province as string) || "",
			subject: (subject as string) || "",
			location:
				handleOther(location as string[], locationOther as string) || "",
			campus: (campus as string) || "",
			wantsContact: wantsContact === "Yes",
			wantsSharedWithOrgs: wantsSharedWithOrgs as string[],
			allowsSocialShare: allowsSocialShare === "Yes",
			didReport: didReport === "Yes",
			type: handleOther(type as string[], typeOther as string),
			description: (description as string) || "",
			impact: impact as string[],
			impactDescription: (impactDescription as string) || "",
			wasFirstExperience:
				handleOtherSingle(
					wasFirstExperience as string,
					wasFirstExperienceOther as string,
				) || "",
			wasSystemic: (wasSystemic as string) || "",
			identities: handleOther(
				identities as string[],
				identitiesOther as string,
			),
			gender: handleOtherSingle(gender as string, genderOther as string) || "",
			genderIdentities: handleOther(
				genderIdentities as string[],
				genderIdentitiesOther as string,
			),
			disability: (disability as string) || "",
			identityDescription: (identityDescription as string) || "",
			additionalInformation: (additionalInformation as string) || "",
		},
	};
}
