type YesNo = "Yes" | "No" | "";

export interface State {
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userPhoneNumber: string;
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
  files: readonly File[];
  isSubmitting: boolean;
}

export type PageProps = React.PropsWithChildren & {
  state: State;
  setState: (state: State | ((state: State) => State)) => void;
};

export function createInitialState(): State {
  return {
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPhoneNumber: "",
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
    didReport: "",
    wasSystemic: "",
    additionalInformation: "",
    files: [],
    isSubmitting: false,
  };
}

export const FIRST_PAGE = 1;
export const LAST_PAGE = 6;
