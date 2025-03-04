import type { MetaFunction } from "@remix-run/node";

import Heading from "~/components/Heading";
import Paragraph from "~/components/Paragraph";
import Section from "~/components/Section";
import TextLink from "~/components/TextLink";
import UnorderedList from "~/components/UnorderedList";
import Layout from "~/layout";

export const meta: MetaFunction = () => [
	{ title: "Resources | APR on Campus" },
	{
		name: "description",
		content: "Resources and support for dealing with APR",
	},
];

export default function Resources() {
	return (
		<Layout>
			<Section className="mt-4 sm:mt-8 xl:mt-12">
				<Heading level={1}>Resources & Support</Heading>

				<Paragraph>
					Experiencing discrimination or marginalization can be overwhelming and
					bring up feelings of trauma or discomfort. Your experiences and
					emotions are valid, and it&apos;s important to acknowledge the
					profound emotional and psychological effects of APR. If you&apos;re
					struggling, please consider reaching out for support—whether through a
					trusted friend, family member, or community member—or consider
					connecting with these resources:
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

				<Paragraph>Additional Resources:</Paragraph>

				<UnorderedList>
					<li>
						<TextLink
							href="https://assets.nationbuilder.com/cjpme/pages/10833/attachments/original/1733757508/EN_-_APR_in_Canada_2023_-_FINAL.pdf"
							external
						>
							Anti-Palestinian Racism in Canada: 2023 Annual Report (Published
							2024, December).
						</TextLink>
					</li>
					<li>
						<TextLink href="https://visualizingpalestine.org" external>
							Visualizing Palestine
						</TextLink>
					</li>
					<li>
						<TextLink href="https://antipalestinianracism.org" external>
							The Institute for Understanding Anti-Palestinian Racism
						</TextLink>
					</li>
					<li>
						<TextLink href="https://mes.arts.ubc.ca" external>
							Middle East Studies (MES) Program
						</TextLink>
					</li>
					<li>
						<TextLink href="https://www.lcpal.ca" external>
							The Legal Centre for Palestine
						</TextLink>
					</li>
					<li>
						<TextLink href="https://www.canarablaw.org" external>
							Arab Canadian Lawyers Association
						</TextLink>
					</li>
					<li>
						<TextLink href="https://www.nccm.ca" external>
							National Council of Canadian Muslims
						</TextLink>
					</li>
					<li>
						<TextLink href="https://www.cjpmefoundation.org/resources" external>
							CJPME Foundation Anti-Racism Program Resources
						</TextLink>
					</li>
				</UnorderedList>
			</Section>
		</Layout>
	);
}
