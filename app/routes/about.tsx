import Heading from "~/components/Heading";
import Paragraph from "~/components/Paragraph";
import Section from "~/components/Section";
import type { Route } from "./+types/about";
import LinkButton from "~/components/LinkButton";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About | APR on Campus" },
    { name: "description", content: "About APR on Campus" },
  ];
}

export default function About() {
  return (
    <Section>
      <Heading className="mb-2" level={1}>
        About Us
      </Heading>
      <Paragraph className="my-8">
        We have set up this reporting website out of concern for the rising
        levels of APR and the lack of accessible platforms for individuals to
        safely share their experiences. This initiative seeks to document
        incidents, raise awareness, and build a resource for understanding the
        scope and impact of APR in Canada. By sharing your story, you contribute
        to a collective effort to expose the issue and advocate for systemic
        change.
      </Paragraph>
      <Paragraph className="my-8">
        Your voice matters. Whether you have faced APR directly, witnessed an
        incident, or want to support someone else in sharing their story, this
        platform is here to amplify your experience and demand accountability.
        Together, we can work toward a future where everyone’s rights and
        dignity are respected.
      </Paragraph>

      <div className="mt-16">
        <LinkButton to="/report" variant="secondary">
          Report an Incident of APR
        </LinkButton>
      </div>
    </Section>
  );
}
