import { D } from "@mobily/ts-belt";

import DateInput from "~/components/DateInput";
import Heading from "~/components/Heading";
import Inputs from "~/components/Inputs";
import Paragraph from "~/components/Paragraph";
import Select from "~/components/Select";
import TextInput from "~/components/TextInput";
import TextLink from "~/components/TextLink";
import { provinces } from "~/incidents";

import type { PageProps } from "./state";

export default function ContactInformation({ state, setState }: PageProps) {
  return (
    <>
      <Heading className="mt-0" level={4}>
        How do we contact you?
      </Heading>

      <Paragraph>
        Your privacy and confidentiality are our priority—your information will
        never be shared without your consent. All responses remain anonymous
        unless you request a follow-up from one of our partnering advocacy
        groups. Otherwise, they will be used solely for data collection and
        research. By proceeding, you consent to its collection and use in line
        with our APR advocacy objectives.
      </Paragraph>

      <Paragraph>
        If you have experienced or witnessed APR, please submit an incident
        report. For questions or inquiries, contact us at{" "}
        <TextLink href="mailto:info@apr-on-campus.org" external>
          info@apr-on-campus.org
        </TextLink>
        .
      </Paragraph>

      <br />

      <Inputs.Pair>
        <TextInput
          label="First Name"
          name="userFirstName"
          type="text"
          required
          autoComplete="given-name"
          maxLength={100}
          value={state.userFirstName}
          onChange={(evt) => {
            setState(D.merge({ userFirstName: evt.target.value }));
          }}
        />

        <TextInput
          label="Last Name"
          name="userLastName"
          type="text"
          autoComplete="family-name"
          maxLength={100}
          value={state.userLastName}
          onChange={(evt) => {
            setState(D.merge({ userLastName: evt.target.value }));
          }}
        />
      </Inputs.Pair>

      <Inputs.Pair>
        <TextInput
          label="Email"
          name="userEmail"
          type="email"
          autoComplete="email"
          required
          size={32}
          maxLength={300}
          value={state.userEmail}
          onChange={(evt) => {
            setState(D.merge({ userEmail: evt.target.value }));
          }}
        />
      </Inputs.Pair>

      <br />

      <Inputs.Pair>
        <DateInput
          noFuture
          label="Date of Incident (approximate)"
          required
          name="date"
          value={state.date}
          onChange={(evt) => {
            setState(D.merge({ date: evt.target.value }));
          }}
        />

        <Select
          label="Province of Incident"
          options={provinces}
          name="province"
          required
          value={state.province}
          onChange={(evt) => {
            const { target } = evt;
            setState(
              D.merge({ province: (target as HTMLOptionElement).value }),
            );
          }}
        />
      </Inputs.Pair>
    </>
  );
}
