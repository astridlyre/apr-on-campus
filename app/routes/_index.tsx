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
			<Section className="mt-4 sm:mt-8 xl:mt-12">
				<Heading level={1}>APR on Campus</Heading>

				<Paragraph className="text-lg">
					If you believe you have experienced APR, trust your instincts—your
					feelings are valid and your story matters. Sharing your experience can
					be a powerful step toward healing and raising awareness.
				</Paragraph>

				<Paragraph>
					<strong>APR on Campus</strong> is a platform initiated by UBC students
					to document and raise awareness of{" "}
					<strong>Anti-Palestinian Racism (APR)</strong> in Canadian educational
					institutions and elsewhere.{" "}
				</Paragraph>

				<Paragraph>
					We aim to expose the growing prevalence of APR and its harmful effects
					on both Palestinians and those advocating for their rights and
					liberation. It often takes the form of systemic discrimination,
					harassment, exclusion, and even violence, targeting Palestinians and
					their allies while silencing expressions of solidarity in educational
					institutions and public spaces.
				</Paragraph>
			</Section>

			<Section>
				<Heading level={2}>Who Does APR Affect?</Heading>

				<Paragraph>
					APR impacts anyone who faces discrimination, silencing, or
					marginalization due to their identity, activism, or beliefs related to
					Palestine. This includes Palestinians and their allies, regardless of
					background. If you have been targeted, witnessed an incident, or want
					to support someone in sharing their story, this platform is here for
					you. <strong>Your voice matters.</strong> By sharing your experience,
					we can amplify your story, advocate for systemic change, and demand
					accountability.
				</Paragraph>

				<Paragraph>
					<strong>
						Together, we can work toward a future where everyone’s rights and
						dignity are respected.
					</strong>
				</Paragraph>
			</Section>

			<Section>
				<Heading level={2}>How It Works</Heading>

				<Paragraph>
					Acknowledging APR is the first step in confronting it. By sharing your
					experience, you help expose its widespread impact, hold institutions
					accountable, and push for the systemic changes needed to protect
					Palestinian rights. We document incidents, amplify the issue, and
					advocate for lasting change. This platform is here for
					everyone—whether you’ve experienced APR firsthand or have witnessed
					it.
				</Paragraph>

				<Paragraph>
					Submissions are collected confidentially to support research by the
					UBC Middle East Department (MES), UBC Divest, the Arab Canadian
					Lawyers Association (ACLA), and The Legal Centre for Palestine (LCP).
					If you wish to take further action, you can request follow-up contact
					from these organizations.
				</Paragraph>

				<Paragraph>
					<strong>
						Have you experienced intimidation, harassment, or discrimination as
						a Palestinian or supporter of Palestinian rights?
					</strong>{" "}
					Share your experience&mdash;
					<strong>all submissions are confidential.</strong>
				</Paragraph>

				<div className="mt-16 flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-8">
					<LinkButton className="text-center" variant="primary" to="/report">
						Report an Instance of APR
					</LinkButton>

					<LinkButton className="text-center" variant="secondary" to="/learn">
						Learn More About APR
					</LinkButton>
				</div>
			</Section>
		</Layout>
	);
}
