import Button from "~/components/Button";
import Checkbox from "~/components/Checkbox";
import Heading from "~/components/Heading";
import Paragraph from "~/components/Paragraph";
import TextArea from "~/components/TextArea";
import TextInput from "~/components/TextInput";
import type { Route } from "./+types/report";
import Section from "~/components/Section";
import DateInput from "~/components/DateInput";
import Select from "~/components/Select";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Report | APR on Campus" },
    { name: "description", content: "Report an incident of APR on Campus" },
  ];
}

const provinces = [
  { label: "Alberta", value: "AB" },
  { label: "British Columbia", value: "BC" },
  { label: "Manitoba", value: "MB" },
  { label: "New Brunswick", value: "NB" },
  { label: "Newfoundland and Labrador", value: "NL" },
  { label: "Nova Scotia", value: "NS" },
  { label: "Ontario", value: "ON" },
  { label: "Prince Edward Island", value: "PE" },
  { label: "Quebec", value: "QC" },
  { label: "Saskatchewan", value: "SK" },
];

export default function Report() {
  return (
    <Section>
      <Heading level={1}>Report an Incident</Heading>
      <Paragraph className="my-8">
        If you have experienced or witnessed an incident of Anti-Palestinian
        Racism (APR) in Canada, we encourage you to report it using the form
        below. Your report will help us document the prevalence of APR and
        advocate for systemic change.
      </Paragraph>

      <form className="max-w-prose space-y-6">
        <Heading className="mt-12" level={4}>
          About the Incident
        </Heading>

        <div className="flex gap-4">
          <DateInput label="Date of Incident" required name="incidentDate" />

          <Select
            label="Province of Incident"
            options={provinces}
            name="incidentProvince"
            required
          />
        </div>

        <TextInput
          label="Place of Incident"
          type="text"
          name="incidentLocation"
          placeholder="e.g. campus, workplace, public space"
          required
        />

        <TextArea
          rows={6}
          label="Description of Incident"
          name="incidentDescription"
          required
        />

        <Checkbox label="Incident was Reported to Police" name="wasReported" />

        <Heading className="mt-12" level={4}>
          Contact Information
        </Heading>

        <div className="flex gap-4">
          <TextInput
            label="First Name"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            size={24}
          />

          <TextInput
            label="Last Name"
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            size={24}
          />
        </div>

        <div className="flex gap-4">
          <TextInput
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
            size={24}
          />

          <TextInput
            label="Phone Number"
            name="phoneNumber"
            type="text"
            autoComplete="tel"
            inputMode="numeric"
            size={24}
          />
        </div>

        <div className="flex gap-4">
          <TextInput
            label="City"
            name="city"
            type="text"
            autoComplete="address-level2"
          />

          <Select
            label="Province"
            name="province"
            options={provinces}
            autoComplete="address-level1"
          />
        </div>

        <Checkbox
          label="I want my report forwarded to a legal organization."
          name="wantsForwarded"
        />

        <Paragraph variant="small-secondary">
          We keep your personal information private and secure. All incident
          reports to APR on Campus’s anti-hate online incident form are kept
          strictly confidential unless otherwise specified.
        </Paragraph>

        <Button className="min-w-48" variant="primary" type="submit">
          Submit Report
        </Button>
      </form>
    </Section>
  );
}
