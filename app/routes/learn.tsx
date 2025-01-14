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
        <Heading level={1}>What is Anti-Palestinian Racism?</Heading>

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

        <Paragraph>
          <em>Anti-Palestinian Racism (APR)</em> is a dangerous and pervasive
          form of discrimination that targets individuals and communities for
          their Palestinian identity, heritage, or support for Palestinian
          rights. It manifests in many ways, including hate speech, exclusion,
          surveillance, intimidation, and physical violence. APR contributes to
          the silencing of voices, perpetuates stereotypes, and undermines
          fundamental principles of equality and justice. This form of racism
          fosters a climate of fear and marginalization, particularly in
          educational, professional, and social spaces where Palestinians and
          their allies often face hostility for expressing their identity or
          advocating for human rights.
        </Paragraph>

        <Paragraph>
          If you’ve experienced APR—whether on the UBC campus, in your
          workplace, or anywhere else in Canada—you are not alone. Many people
          have encountered incidents ranging from overt harassment to more
          subtle forms of discrimination, such as exclusion from conversations
          or decision-making processes, microaggressions, or biased
          institutional policies. These experiences can have profound emotional,
          academic, and professional consequences for those affected.
        </Paragraph>

        <div className="mt-16">
          <LinkButton to="/report" variant="primary">
            Report an Incident of APR
          </LinkButton>
        </div>
      </Section>

      <div className="my-12 bg-bg2 py-12">
        <div className="container mx-auto w-full px-6 py-12 sm:px-12 md:px-16 lg:px-24">
          <div className="flex w-full gap-8 overflow-x-auto">
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
              className="max-w-prose cursor-pointer"
            >
              <img
                alt=""
                src="/assets/images/anti-palestinian-racism-medium.webp"
                srcSet="/assets/images/anti-palestinian-racism-full.webp 1920w"
                className="max-w-full"
              />
            </figure>
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
              className="max-w-prose cursor-pointer"
            >
              <img
                alt=""
                src="/assets/images/anti-palestinian-racism-at-school-medium.webp"
                srcSet="/assets/images/anti-palestinian-racism-at-school-full.webp 1920w"
                className="max-w-full"
              />
            </figure>
          </div>

          {bigImageSrc ? (
            <div className="fixed inset-0 z-20 flex items-center justify-center p-8">
              <div
                aria-hidden="true"
                onClick={() => {
                  setBigImageSrc("");
                }}
                className="absolute inset-0 bg-white p-8 opacity-70"
              />
              <div className="relative m-auto">
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

          <Paragraph className="mt-4">
            The above images are from{" "}
            <TextLink href="https://visualizingpalestine.org/" external>
              Visualizing Palestine
            </TextLink>
          </Paragraph>
        </div>
      </div>

      <Section title="What Does APR Look like?">
        <Blockquote quote="Because I support Palestinians or because I am Palestinian, …" />

        <UnorderedList className="">
          <li>Someone said something untrue that harmed my reputation</li>
          <li>
            I am being (or was) disciplined, dismissed, or otherwise treated
            differently by my employer or a prospective employer
          </li>
          <li>
            I am being (or was) harassed by one or more colleagues and my
            employer failed to take action after being informed
          </li>
          <li>
            I am being (or was) disciplined, dismissed, or otherwise treated
            differently by my educational institution or a prospective
            educational institution
          </li>
          <li>
            I am being (or was) treated differently by an organization or
            service provider, other than an employer or educational institution
          </li>
          <li>
            I am being (or was) arrested, detained, charged, or searched by law
            enforcement
          </li>
          <li>I am being (or was) disciplined by my professional regulator</li>
          <li>Someone attacked me physically</li>
          <li>Someone shared my private information publicly</li>
          <li>Someone is systematically harassing me, online or otherwise</li>
        </UnorderedList>

        <Paragraph>
          If one or more of the above scenarios apply to you, please consider
          seeking help from the{" "}
          <TextLink
            href="https://docs.google.com/forms/d/e/1FAIpQLSdE8OmtyTgZJHvCqjQnN1JQSZ7PXX6NmMHtGlYaBahNsxKokg/viewform"
            external
          >
            Legal Centre for Palestine.
          </TextLink>
        </Paragraph>
      </Section>

      <Section title="Further Resources on APR">
        <UnorderedList>
          <li>
            <TextLink href="https://www.canarablaw.org/support" external>
              https://www.canarablaw.org/support
            </TextLink>
          </li>
          <li>
            <TextLink href="https://www.cjpmefoundation.org/resources" external>
              https://www.cjpmefoundation.org/resources
            </TextLink>
          </li>
        </UnorderedList>
      </Section>
    </Layout>
  );
}
