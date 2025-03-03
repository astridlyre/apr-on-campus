import ContactInformation from "./ContactInformation";
import InstitutionInvolvement from "./InstitutionInvolvement";
import Intersectionality from "./Intersectionality";
import type { PageProps } from "./state";
import WhatWasImpact from "./WhatWasImpact";
import WhatWasInvolved from "./WhatWasInvolved";
import WhereDidItHappen from "./WhereDidItHappen";

export default function Pages({
  state,
  setState,
  page,
}: PageProps & {
  page: number;
}) {
  switch (page) {
    case 6:
      return <Intersectionality state={state} setState={setState} />;
    case 5:
      return <WhatWasImpact state={state} setState={setState} />;
    case 4:
      return <WhatWasInvolved state={state} setState={setState} />;
    case 3:
      return <InstitutionInvolvement state={state} setState={setState} />;
    case 2:
      return <WhereDidItHappen state={state} setState={setState} />;
    default:
      return <ContactInformation state={state} setState={setState} />;
  }
}
