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

      <Section>
        <Heading level={2}>About</Heading>

        <Paragraph>
          We have set up this reporting website out of concern for the rising
          levels of APR and the lack of accessible platforms for individuals to
          safely share their experiences. This initiative seeks to document
          incidents, raise awareness, and build a resource for understanding the
          scope and impact of APR in Canada. By sharing your story, you
          contribute to a collective effort to expose the issue and advocate for
          systemic change.
        </Paragraph>

        <Paragraph>
          Your voice matters. Whether you have faced APR directly, witnessed an
          incident, or want to support someone else in sharing their story, this
          platform is here to amplify your experience and demand accountability.
          Together, we can work toward a future where everyone’s rights and
          dignity are respected.
        </Paragraph>
      </Section>
    </Layout>
  );
}
