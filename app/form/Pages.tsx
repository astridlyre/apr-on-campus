import ContactInformation from "./ContactInformation";
import InstitutionInvolvement from "./InstitutionInvolvement";
import Intersectionality from "./Intersectionality";
import { type PageProps, PAGES } from "./state";
import Summary from "./Summary";
import WhatWasImpact from "./WhatWasImpact";
import WhatWasInvolved from "./WhatWasInvolved";
import WhereDidItHappen from "./WhereDidItHappen";

export default function Pages({
	state,
	setState,
	page,
	setPage,
}: PageProps & {
	page: number;
}) {
	switch (page) {
		case PAGES.SUMMARY:
			return <Summary state={state} setState={setState} setPage={setPage} />;
		case PAGES.INTERSECTIONALITY:
			return (
				<Intersectionality
					state={state}
					setState={setState}
					setPage={setPage}
				/>
			);
		case PAGES.WHAT_WAS_IMPACT:
			return (
				<WhatWasImpact state={state} setState={setState} setPage={setPage} />
			);
		case PAGES.WHAT_WAS_INVOLVED:
			return (
				<WhatWasInvolved state={state} setState={setState} setPage={setPage} />
			);
		case PAGES.INSTITUTION_INVOLVEMENT:
			return (
				<InstitutionInvolvement
					state={state}
					setState={setState}
					setPage={setPage}
				/>
			);
		case PAGES.WHERE_DID_IT_HAPPEN:
			return (
				<WhereDidItHappen state={state} setState={setState} setPage={setPage} />
			);
		case PAGES.CONTACT_INFORMATION:
			return (
				<ContactInformation
					state={state}
					setState={setState}
					setPage={setPage}
				/>
			);
		default:
			return null;
	}
}
