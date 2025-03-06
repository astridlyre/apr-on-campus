import type { MetaFunction } from "@remix-run/node";

import Blockquote from "~/components/Blockquote";
import Heading from "~/components/Heading";
import Image from "~/components/Image";
import LinkButton from "~/components/LinkButton";
import Paragraph from "~/components/Paragraph";
import Section from "~/components/Section";
import TextLink from "~/components/TextLink";
import Layout from "~/layout";

export const meta: MetaFunction = () => [
	{ title: "APR on Campus" },
	{ name: "description", content: "APR on Campus" },
];

export default function Home() {
	return (
		<Layout>
			<Section className="mt-4 sm:mt-8 xl:mt-12">
				<Heading level={1}>
					Anti-Palestinian Racism Has No Place on Campus
				</Heading>

				<Paragraph>
					<strong>APR-on-Campus</strong> is a self-reporting platform initiated
					by post-secondary students to document{" "}
					<strong>Anti-Palestinian Racism (APR)</strong> at Canadian educational
					institutions. Our objective is to expose the rise of APR, which fuels{" "}
					<strong>
						systemic marginalization, restricts academic freedom, and
						perpetuates injustice.
					</strong>
				</Paragraph>

				<Paragraph>
					<strong>APR justifies and upholds systems of oppression</strong> by
					silencing voices, excluding perspectives, erasing narratives, and
					defamation - targeting Palestinians, those perceived as Palestinian,
					and non-Palestinians who support Palestinian rights. It manifests in
					both overt and subtle ways, including physical violence, harassment,
					smearing, dehumanization, exclusion, micro-aggressions, biased
					policies, and emotional violence. APR threatens both individuals and
					the integrity of academic spaces. We&apos;re holding our universities
					accountable &mdash;{" "}
					<strong>we will not tolerate racism on campus.</strong>
				</Paragraph>
			</Section>

			<Section>
				<Image
					src="/assets/images/anti-palestinian-racism-medium.webp"
					srcSet="/assets/images/anti-palestinian-racism-full.webp 1920w"
					alt="Visualizing Palestine"
					bigSrc="/assets/images/anti-palestinian-racism.png"
					caption={
						<Paragraph>
							The above image is from{" "}
							<TextLink href="https://visualizingpalestine.org/" external>
								Visualizing Palestine
							</TextLink>
						</Paragraph>
					}
				/>

				<br />

				<Blockquote
					source={
						<span>
							Majid, D. (2022, April 25).{" "}
							<em>
								Anti-Palestinian Racism: Naming, Framing and Manifestations.
								Community Consultations and Reflections.
							</em>{" "}
							Arab Canadian Lawyers Association.
						</span>
					}
					quote="Anti-Palestinian racism is a form of anti-Arab racism that silences, excludes, erases, stereotypes, defames or dehumanizes Palestinians or their narratives. Anti-Palestinian racism takes various forms including: denying the Nakba and justifying violence against Palestinians; failing to acknowledge Palestinians as an Indigenous people with a collective identity, belonging and rights in relation to occupied and historic Palestine; erasing the human rights and equal dignity and worth of Palestinians; excluding or pressuring others to exclude Palestinian perspectives, Palestinians and their allies; defaming Palestinians and their allies with slander such as being inherently antisemitic, a terrorist threat/sympathizer or opposed to democratic values."
				/>
			</Section>

			<Section>
				<Heading level={2}>Your Voice Matters</Heading>

				<Paragraph>
					Reporting your APR experiences allows us to collect information that{" "}
					<strong>
						helps us expose its widespread impact, hold institutions
						accountable, and push for the systemic changes needed to protect
						Palestinian rights.
					</strong>{" "}
					This platform is here for everyone—whether you’ve experienced APR
					firsthand or have witnessed it. We have partnered with the UBC Middle
					East Studies (MES) program, as well as various university solidarity
					groups and legal organizations across the country. Submissions are
					collected confidentially and contribute to ongoing advocacy and
					research.
				</Paragraph>

				<div className="mt-16 flex flex-col gap-8 sm:grid sm:grid-cols-2 sm:gap-8">
					<LinkButton className="text-center" variant="primary" to="/report">
						Report an Instance of APR
					</LinkButton>

					<LinkButton className="text-center" variant="secondary" to="/learn">
						What APR Looks Like
					</LinkButton>
				</div>
			</Section>
		</Layout>
	);
}
