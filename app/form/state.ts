type YesNo = "Yes" | "No" | "";

export interface State {
	userFirstName: string;
	userLastName: string;
	userEmail: string;
	date: string;
	province: string;
	subject: string;
	wantsContact: YesNo;
	wantsShared: YesNo;
	allowsSocialShare: YesNo;
	wantsSharedWithOrgs: Record<string, boolean>;
	identities: Record<string, boolean>;
	identitiesOther: string;
	identityDescription: string;
	gender: string;
	genderOther: string;
	genderIdentities: Record<string, boolean>;
	genderIdentitiesOther: string;
	disability: string;
	userAffiliation: string;
	location: string;
	locationOther: string;
	campus: string;
	type: Record<string, boolean>;
	typeOther: string;
	description: string;
	impact: Record<string, boolean>;
	impactDescription: string;
	wasFirstExperience: YesNo | "Other";
	wasFirstExperienceOther: string;
	didReport: YesNo;
	wasSystemic: YesNo | "Unsure";
	additionalInformation: string;
	isSubmitting: boolean;
}

export type PageProps = React.PropsWithChildren & {
	state: State;
	setState: (state: State | ((state: State) => State)) => void;
	setPage: (page: number | ((previousPage: number) => number)) => void;
};

export const initialState = {
	userFirstName: "",
	userLastName: "",
	userEmail: "",
	date: "",
	province: "",
	subject: "",
	wantsContact: "",
	wantsShared: "",
	wantsSharedWithOrgs: {},
	allowsSocialShare: "",
	identities: {},
	identitiesOther: "",
	gender: "",
	genderOther: "",
	genderIdentities: {},
	genderIdentitiesOther: "",
	identityDescription: "",
	disability: "",
	userAffiliation: "",
	location: "",
	locationOther: "",
	campus: "",
	type: {},
	typeOther: "",
	description: "",
	impact: {},
	impactDescription: "",
	wasFirstExperience: "",
	wasFirstExperienceOther: "",
	didReport: "",
	wasSystemic: "",
	additionalInformation: "",
	isSubmitting: false,
} as State;

export const PAGES = {
	CONTACT_INFORMATION: 0,
	WHERE_DID_IT_HAPPEN: 1,
	INSTITUTION_INVOLVEMENT: 2,
	WHAT_WAS_INVOLVED: 3,
	WHAT_WAS_IMPACT: 4,
	INTERSECTIONALITY: 5,
	SUMMARY: 6,
};
