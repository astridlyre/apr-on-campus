import type { MetaFunction } from "@remix-run/node";

import Heading from "~/components/Heading";
import LinkButton from "~/components/LinkButton";
import Paragraph from "~/components/Paragraph";
import Section from "~/components/Section";
import Layout from "~/layout";

export const meta: MetaFunction = () => [
  { title: "APR on Campus" },
  { name: "description", content: "APR on Campus" },
];

export default function Home() {
  return (
    <Layout>
      <Section className="mt-4 sm:mt-8 md:mt-12">
        <Heading level={1}>APR on Campus</Heading>

        <Paragraph className="text-lg">
          APR on Campus is a reporting platform that collects and documents
          instances of <em>Anti-Palestinian Racism (APR)</em> in Canadian
          educational institutions. Our goal is to provide a safe and
          confidential space for individuals to share their experiences, raise
          awareness about the prevalence of APR, and advocate for systemic
          change.
        </Paragraph>

        <div className="mt-16 flex flex-col gap-8 sm:flex-row sm:gap-8">
          <LinkButton variant="primary" to="/learn">
            Learn More About APR
          </LinkButton>

          <LinkButton variant="secondary" to="/report">
            Report an Instance of Racism
          </LinkButton>
        </div>
      </Section>
    </Layout>
  );
}
