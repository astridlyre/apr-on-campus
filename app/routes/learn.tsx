import type { MetaFunction } from "@remix-run/node";

import Heading from "~/components/Heading";
import Image from "~/components/Image";
import LinkButton from "~/components/LinkButton";
import Paragraph from "~/components/Paragraph";
import Section from "~/components/Section";
import TextLink from "~/components/TextLink";
import Layout from "~/layout";

export const meta: MetaFunction = () => [
	{ title: "What APR Looks Like | APR on Campus" },
	{ name: "description", content: "Learn about what APR looks like on Campus" },
];

export default function Learn() {
	return (
		<Layout>
			<Section className="mt-4 sm:mt-8 xl:mt-12">
				<Heading level={1}>APR Has Consequences</Heading>

				<Paragraph>
					Anti-Palestinian racism fosters exclusion, fear, and hostility,
					undermining equality, justice, and academic freedom. In educational
					institutions, it manifests through silencing, marginalization, and
					disciplinary actions against those advocating for Palestinian rights,
					reinforcing systemic bias and erasing Palestinian perspectives.
				</Paragraph>

				<Paragraph>
					APR has serious emotional, academic, and professional consequences.
					Students and faculty risk harassment, institutional retaliation, and
					career setbacks for demonstrating solidarity. By enabling these
					patterns of discrimination, universities perpetuate injustice and fail
					to uphold intellectual freedom. Holding institutions accountable is
					essential to ensuring campuses remain spaces for open discourse and
					advocacy.
				</Paragraph>
			</Section>

			<Section>
				<Image
					src="/assets/images/anti-palestinian-racism-on-campus-medium.webp"
					srcSet="/assets/images/anti-palestinian-racism-on-campus-full.webp 1920w"
					alt="Visualizing Palestine"
					bigSrc="/assets/images/anti-palestinian-racism-on-campus.png"
					caption={
						<>
							The above image is from{" "}
							<TextLink href="https://visualizingpalestine.org/" external>
								Visualizing Palestine
							</TextLink>
						</>
					}
				/>
			</Section>

			<Section>
				<Heading level={2}>APR has Deep and Far-Reaching Impacts </Heading>

				<Paragraph>
					Here, we’ve only begun to share the stories of those affected—more to
					come soon...
				</Paragraph>

				<Paragraph>
					<strong>Sean Tucker</strong>, a sessional instructor at UBC&apos;s
					School of Population and Public Health, had his teaching contract
					terminated in October 2024 due to his support for Palestinian rights,
					including organizing events and speaking out on Gaza. His firing is
					seen as part of a larger trend of anti-Palestinian discrimination,
					where advocates for Palestinian rights are often targeted. The
					decision faced backlash from faculty, who condemned it as a violation
					of academic freedom and called for Tucker’s reinstatement. In December
					2024, he publicly urged UBC to reinstate him, but the university has
					yet to respond.
				</Paragraph>

				<Paragraph>
					<strong>Dr. Natalie Knight</strong>, an instructor at Langara College,
					was placed on leave in October 2023 after making public comments in
					support of Palestine. She was later terminated on January 26, 2024,
					following a meeting between BC&apos;s Minister of Post-Secondary
					Education, Selina Robinson, and the college administration, where
					concerns about Knight&apos;s reinstatement were raised. This
					intervention was widely condemned by the Federation of Post-Secondary
					Educators of BC (FPSE) and the Canadian Association of University
					Teachers (CAUT), who criticized it as an unprecedented abuse of
					ministerial authority to suppress political expression.
				</Paragraph>

				<Paragraph>
					<strong>Vancouver Island University (VIU)</strong> recently suspended
					two students&mdash;one Palestinian and one Canadian&mdash;who
					participated in a peaceful encampment on campus in solidarity with
					Palestine. The demonstration aimed to raise awareness of human rights
					violations in Palestine. However, the university suspended the
					students, citing unspecified rule violations and safety concerns,
					despite offering no evidence to support these claims. VIU’s response
					was both misleading and disproportionate. Rather than engaging with
					the concerns raised, the university’s actions suggest an effort to
					delegitimize the protest and suppress student activism. This blatant
					attempt to silence dissent should be condemned for its failure to
					uphold academic freedom and the fundamental right to protest. By
					targeting students advocating for justice, VIU sends a troubling
					message about its willingness to stifle free expression on campus.
				</Paragraph>
			</Section>

			<Section>
				<Image
					src="/assets/images/anti-palestinian-racism-at-school-medium.webp"
					srcSet="/assets/images/anti-palestinian-racism-at-school-full.webp 1920w"
					alt="Visualizing Palestine"
					bigSrc="/assets/images/anti-palestinian-racism-at-school.png"
					caption={
						<>
							The above image is from{" "}
							<TextLink href="https://visualizingpalestine.org/" external>
								Visualizing Palestine
							</TextLink>
						</>
					}
				/>

				<br />

				<Paragraph>
					While we have highlighted numerous examples of APR within
					post-secondary institutions, it is important to recognize that APR is
					deeply ingrained and pervasive throughout the entire education system.
					This systemic presence not only reinforces its normalization but also
					makes it easier for such discrimination to persist and escalate on
					university and college campuses.
				</Paragraph>

				<div className="mt-16">
					<LinkButton to="/report" variant="primary">
						Report an Incident of APR
					</LinkButton>
				</div>
			</Section>
		</Layout>
	);
}
