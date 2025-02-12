import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

import Blockquote from "~/components/Blockquote";
import Heading from "~/components/Heading";
import LinkButton from "~/components/LinkButton";
import Paragraph from "~/components/Paragraph";
import Section from "~/components/Section";
import TextLink from "~/components/TextLink";
import UnorderedList from "~/components/UnorderedList";
import Layout from "~/layout";

export const meta: MetaFunction = () => [
	{ title: "Learn | APR on Campus" },
	{ name: "description", content: "Learn about APR on Campus" },
];

export default function Learn() {
	const [bigImageSrc, setBigImageSrc] = useState("");

	return (
		<Layout>
			<Section className="mt-4 sm:mt-8 xl:mt-12">
				<Heading level={1}>Understanding Anti-Palestinian Racism</Heading>

				<Paragraph>
					Anti-Palestinian Racism (APR) is a harmful and pervasive form of
					discrimination targeting individuals based on their Palestinian
					identity, heritage, or support for Palestinian rights. APR can
					manifest in both overt and subtle ways, including physical violence,
					harassment, smearing, dehumanizing, exclusion, microaggressions,
					biased policies, and emotional violence. These actions, such as
					retaliation, stereotyping, and silencing, contribute to the
					marginalization and erasure of Palestinian voices, undermining
					equality and justice.
				</Paragraph>
			</Section>

			<Section>
				<Heading level={2}>Why APR Is Harmful</Heading>

				<Paragraph>
					APR fosters exclusion, fear, and hostility, which undermines equality
					and justice for Palestinians and their allies. It can have serious
					consequences in educational, professional, and social settings, where
					individuals may be marginalized for expressing their identity or
					supporting Palestinian rights. These experiences can lead to
					significant emotional, academic, and professional impacts, where
					Palestinians and their allies may face hostility for expressing their
					identity or advocating for human rights.
				</Paragraph>

				<Paragraph>
					<strong>
						If you&apos;ve experienced APR&mdash;whether overt or
						subtle&mdash;know that this platform is here to amplify your voice
						and demand accountability.
					</strong>
				</Paragraph>
			</Section>

			<Section>
				<figure
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
					role="button"
					tabIndex={0}
					onKeyDown={(evt) => {
						if (evt.key === "Enter") {
							setBigImageSrc("/assets/images/anti-palestinian-racism.png");
						}
					}}
					onClick={() => {
						setBigImageSrc("/assets/images/anti-palestinian-racism.png");
					}}
					className="cursor-pointer"
				>
					<img
						alt=""
						src="/assets/images/anti-palestinian-racism-medium.webp"
						srcSet="/assets/images/anti-palestinian-racism-full.webp 1920w"
						className="w-full max-w-full"
					/>
					<figcaption className="text-sm mt-2 text-fg2">
						The above image is from{" "}
						<TextLink href="https://visualizingpalestine.org/" external>
							Visualizing Palestine
						</TextLink>
					</figcaption>
				</figure>
			</Section>

			<Section>
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
				<figure
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
					role="button"
					tabIndex={0}
					onKeyDown={(evt) => {
						if (evt.key === "Enter") {
							setBigImageSrc("/assets/images/anti-palestinian-racism.png");
						}
					}}
					onClick={() => {
						setBigImageSrc(
							"/assets/images/anti-palestinian-racism-at-school.png",
						);
					}}
					className="cursor-pointer"
				>
					<img
						alt=""
						src="/assets/images/anti-palestinian-racism-at-school-medium.webp"
						srcSet="/assets/images/anti-palestinian-racism-at-school-full.webp 1920w"
						className="w-full max-w-full"
					/>
					<figcaption className="text-sm mt-2 text-fg2">
						The above image is from{" "}
						<TextLink href="https://visualizingpalestine.org/" external>
							Visualizing Palestine
						</TextLink>
					</figcaption>
				</figure>
			</Section>

			<Section>
				<Heading level={2}>Experiencing APR & Support</Heading>

				<Paragraph>
					Experiencing discrimination or marginalization can be overwhelming and
					bring up feelings of trauma or discomfort. Your experiences and
					emotions are valid, and it&apos;s important to acknowledge the
					profound emotional and psychological effects of APR, including
					anxiety, isolation, and trauma. If you&apos;re struggling, please
					consider reaching out for support—whether through a trusted friend,
					family member, or community member—or consider connecting with these
					resources:
				</Paragraph>

				<UnorderedList>
					<li>
						<TextLink
							href="https://willowtreecounselling.ca/wp-content/uploads/resources/reduced-cost-counselling.pdf"
							external
						>
							Reduced-Cost Counselling Options
						</TextLink>{" "}
						in Vancouver
					</li>
					<li>
						Muslim Counselling:{" "}
						<TextLink external href="https://www.ruhcare.com">
							ruhcare.com
						</TextLink>{" "}
						and{" "}
						<TextLink external href="https://www.ruhcare.com/palestine">
							ruhcare.com/palestine
						</TextLink>{" "}
						(free)
					</li>
					<li>
						Hope for Wellness Help Line is available 24/7 to all Indigenous
						people across Canada. Call toll-free{" "}
						<TextLink href="tel:18552423310">1-855-242-3310</TextLink> or start
						a confidential chat with a counsellor at{" "}
						<TextLink href="https://www.hopeforwellness.ca" external>
							hopeforwellness.ca
						</TextLink>
					</li>
					<li>
						National Suicide Crisis Helpline:{" "}
						<TextLink href="tel:988">9-8-8</TextLink> (call or text)
					</li>
					<li>
						BC Mental Health and Crisis Response (no area code needed):{" "}
						<TextLink href="tel:3106789">310-6789</TextLink>
					</li>
				</UnorderedList>

				<Paragraph>
					<strong>
						You are not alone. Reaching out for support is a vital step in
						managing the emotional impacts of APR and reclaiming your sense of
						safety and well-being.
					</strong>
				</Paragraph>

				<div className="mt-16">
					<LinkButton to="/report" variant="primary">
						Report an Incident of APR
					</LinkButton>
				</div>
			</Section>

			<Section>
				<figure
					// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
					role="button"
					tabIndex={0}
					onKeyDown={(evt) => {
						if (evt.key === "Enter") {
							setBigImageSrc("/assets/images/APR-image-3.jpeg");
						}
					}}
					onClick={() => {
						setBigImageSrc("/assets/images/APR-image-3.jpeg");
					}}
					className="cursor-pointer"
				>
					<img
						alt=""
						src="/assets/images/apr-image-3-medium.webp"
						srcSet="/assets/images/apr-image-3-full.webp 1920w"
						className="w-full max-w-full"
					/>

					<figcaption className="text-sm mt-2 text-fg2">
						The above image is from{" "}
						<TextLink href="https://visualizingpalestine.org/" external>
							Visualizing Palestine
						</TextLink>
					</figcaption>
				</figure>
			</Section>

			<Section>
				<Heading level={2}>Examples of APR on Campus</Heading>

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
					If you’ve experienced APR—whether on UBC’s campus, in your workplace,
					or elsewhere in Canada&mdash;<strong>trust your instincts.</strong> If
					you feel you’ve been targeted, excluded, or silenced, your experience
					matters.
				</Paragraph>

				<Paragraph>Additional Resources:</Paragraph>
				<Paragraph>
					<UnorderedList>
						<li>
							<TextLink href="https://mes.arts.ubc.ca" external>
								https://mes.arts.ubc.ca
							</TextLink>
						</li>
						<li>
							<TextLink href="https://www.lcpal.ca" external>
								https://www.lcpal.ca
							</TextLink>
						</li>
						<li>
							<TextLink href="https://www.nccm.ca" external>
								https://www.nccm.ca
							</TextLink>
						</li>
						<li>
							<TextLink href="https://www.canarablaw.org" external>
								https://www.canarablaw.org
							</TextLink>
						</li>
						<li>
							<TextLink href="https://www.cmla-acam.ca" external>
								https://www.cmla-acam.ca
							</TextLink>
						</li>
						<li>
							<TextLink href="https://www.canarablaw.org/support" external>
								https://www.canarablaw.org/support
							</TextLink>
						</li>
						<li>
							<TextLink
								href="https://www.cjpmefoundation.org/resources"
								external
							>
								https://www.cjpmefoundation.org/resources
							</TextLink>
						</li>
						<li>
							<TextLink href="https://equity.ubc.ca" external>
								https://equity.ubc.ca
							</TextLink>
						</li>
						<li>
							<TextLink href="https://io.ubc.ca" external>
								https://io.ubc.ca
							</TextLink>
						</li>
					</UnorderedList>
				</Paragraph>
			</Section>

			{bigImageSrc ? (
				<div className="fixed inset-0 z-20 flex items-center justify-center p-8">
					<div
						aria-hidden="true"
						onClick={() => {
							setBigImageSrc("");
						}}
						className="absolute inset-0 bg-white p-8 opacity-70"
					/>
					<div
						aria-hidden="true"
						onClick={() => {
							setBigImageSrc("");
						}}
						className="relative m-auto"
					>
						<button
							type="button"
							onClick={() => {
								setBigImageSrc("");
							}}
							className="absolute -right-[5vw] top-0 z-10 h-12 w-12 text-3xl font-bold text-fg hover:bg-primary"
						>
							&times;
						</button>
						<img
							className="z-10 max-h-[95vh] max-w-[95vw]"
							src={bigImageSrc}
							alt="Anti-Palestinian Racism"
						/>
					</div>
				</div>
			) : null}
		</Layout>
	);
}
