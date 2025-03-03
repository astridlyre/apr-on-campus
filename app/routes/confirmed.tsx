import { useEffect } from "react";

import Heading from "~/components/Heading";
import LinkButton from "~/components/LinkButton";
import Paragraph from "~/components/Paragraph";
import Section from "~/components/Section";
import TextLink from "~/components/TextLink";
import Layout from "~/layout";

export default function Confirmed() {
  useEffect(() => {
    if (!globalThis?.localStorage) {
      return;
    }

    globalThis.localStorage.removeItem("APR_INCIDENT_REPORT_STATE");
  }, []);

  return (
    <Layout>
      <Section className="mt-4 sm:mt-8 xl:mt-12">
        <Heading level={1}>We have received your report</Heading>

        <Paragraph>
          Thank you for submitting your report. We will review the information
          you provided and follow up with you if we need more details.
        </Paragraph>

        <div className="mt-12 flex items-center gap-8">
          <LinkButton variant="primary" to="/report">
            Report another Incident
          </LinkButton>

          <TextLink href="/">Go back home</TextLink>
        </div>
      </Section>
    </Layout>
  );
}
