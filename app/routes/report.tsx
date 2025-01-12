import { A, D } from "@mobily/ts-belt";
import {
  data,
  redirect,
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  type ActionFunction,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useNavigation, useSubmit } from "@remix-run/react";
import { useRef, useState } from "react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { CSRFError } from "remix-utils/csrf/server";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { SpamError } from "remix-utils/honeypot/server";

import Button from "~/components/Button";
import Checkbox from "~/components/Checkbox";
import DateInput from "~/components/DateInput";
import FileUpload from "~/components/FileUpload";
import Heading from "~/components/Heading";
import Inputs from "~/components/Inputs";
import Paragraph from "~/components/Paragraph";
import Section from "~/components/Section";
import Select from "~/components/Select";
import TextArea from "~/components/TextArea";
import TextInput from "~/components/TextInput";
import { csrf } from "~/csrf.server";
import { honeypot } from "~/honeypot.server";
import Layout from "~/layout";
import { createIncident } from "~/models/incidents.server";
import { uploadFile } from "~/services/minio.server";
import {
  getFormDataValue,
  getFormFiles,
  isParsedFile,
  isTooBig,
  maxFiles,
  normalizePhoneNumber,
  validateEmail,
} from "~/utils";

export const meta: MetaFunction = () => [
  { title: "Report | APR on Campus" },
  { name: "description", content: "Report an incident of APR on Campus" },
];

const provinces = [
  { label: "— Select Province or Territory —", value: "" },
  { label: "Alberta", value: "AB" },
  { label: "British Columbia", value: "BC" },
  { label: "Manitoba", value: "MB" },
  { label: "New Brunswick", value: "NB" },
  { label: "Newfoundland and Labrador", value: "NL" },
  { label: "Northwest Territories", value: "NT" },
  { label: "Nova Scotia", value: "NS" },
  { label: "Nunavut", value: "NU" },
  { label: "Ontario", value: "ON" },
  { label: "Prince Edward Island", value: "PE" },
  { label: "Quebec", value: "QC" },
  { label: "Saskatchewan", value: "SK" },
  { label: "Yukon", value: "YT" },
];

const incidentTypes = [
  { label: "— Select Type —", value: "" },
  { label: "Discrimination", value: "discrimination" },
  { label: "Harassment", value: "harassment" },
  { label: "Online", value: "online" },
  { label: "Vandalism", value: "vandalism" },
  { label: "Violence", value: "violence" },
];

interface Errors {
  incidentDate?: string;
  incidentProvince?: string;
  incidentLocation?: string;
  incidentDescription?: string;
  incidentType?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  city?: string;
  province?: string;
}

function validateIncident(incident: Record<string, unknown>): Errors {
  const errors: Errors = {};

  if (!incident.date) {
    errors.incidentDate = "Please provide the date of the incident";
  }

  if (!provinces.find((province) => province.value === incident.province)) {
    errors.incidentProvince = "Please select the province of the incident";
  }

  if (!incident.location) {
    errors.incidentLocation = "Please provide the location of the incident";
  }

  if (!incident.description) {
    errors.incidentDescription = "Please describe the incident";
  }

  if (!incident.type) {
    errors.incidentType = "Please select the type of incident";
  }

  if (!incident.userFirstName) {
    errors.firstName = "Please provide your first name";
  }

  if (!incident.userLastName) {
    errors.lastName = "Please provide your last name";
  }

  if (!incident.userEmail) {
    errors.email = "Please provide your email address";
  }

  if (!validateEmail(incident.userEmail)) {
    errors.email = "Please provide a valid email address";
  }

  if (
    incident.userProvince &&
    !provinces.find((province) => province.value === incident.userProvince)
  ) {
    errors.province = "Please select a valid province";
  }

  return errors;
}

export const action: ActionFunction = async ({ request }) => {
  await csrf.validate(request);

  // get file stream, upload to minio and then return the new file url
  const uploadHandler = unstable_composeUploadHandlers(
    async ({ name, data, filename }) => {
      if (!name.startsWith("file-")) {
        return undefined;
      }

      if (!filename) {
        console.error("No filename provided for file upload");
        return undefined;
      }

      try {
        const uploadedFile = await uploadFile({
          bucketName: "reports",
          fileName: filename as string,
          data,
        });

        return uploadedFile;
      } catch (err) {
        console.error(err);
        return undefined;
      }
    },
    unstable_createMemoryUploadHandler(),
  );

  try {
    const form = await unstable_parseMultipartFormData(request, uploadHandler);

    honeypot.check(form);

    const files = getFormFiles(form);
    const jsonFiles = files
      .map((jsonFile) => {
        try {
          return JSON.parse(jsonFile);
        } catch {
          return null;
        }
      })
      .filter(isParsedFile);

    const incident = {
      date: getFormDataValue(form, "incidentDate"),
      province: getFormDataValue(form, "incidentProvince"),
      location: getFormDataValue(form, "incidentLocation"),
      description: getFormDataValue(form, "incidentDescription"),
      type: getFormDataValue(form, "incidentType"),
      userFirstName: getFormDataValue(form, "firstName"),
      userLastName: getFormDataValue(form, "lastName"),
      userEmail: getFormDataValue(form, "email"),
      userPhoneNumber: normalizePhoneNumber(
        getFormDataValue(form, "phoneNumber"),
      ),
      userCity: getFormDataValue(form, "city"),
      userProvince: getFormDataValue(form, "province"),
      wasReported: form.has("wasReported"),
      wantsForwarded: form.has("wantsForwarded"),
      files: jsonFiles,
    };

    const errors = validateIncident(incident);

    if (D.isNotEmpty(errors)) {
      return data({ errors }, 422);
    }

    await createIncident(incident);

    return redirect("/confirmed");
  } catch (err) {
    console.error(err);

    if (err instanceof CSRFError) {
      return new Response("Forbidden", { status: 403 });
    }
    if (err instanceof SpamError) {
      return new Response("Spam detected", { status: 400 });
    }
    return new Response("Something went wrong", { status: 500 });
  }
};

export default function Report() {
  const submit = useSubmit();
  const navigation = useNavigation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<readonly File[]>([]);
  const [fileError, setFileError] = useState<string>("");

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);

    // Remove the file field from the form data
    formData.delete("file");

    const slicedFiles = files.slice(0, maxFiles);

    // Add the files to the form data
    slicedFiles.forEach((file, i) => {
      formData.set(`file-${i}`, file);
    });

    submit(formData, {
      method: "post",
      action: "/report",
      encType: "multipart/form-data",
    });
  };

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFiles((files) => {
      setFileError("");

      const newFiles = Array.from(evt.target.files || []);

      const sizedFiles = newFiles.filter((file) => !isTooBig(file));

      const slicedFiles = sizedFiles.slice(0, maxFiles - files.length);

      if (sizedFiles.length > slicedFiles.length) {
        setFileError(
          "Some files were too large (i.e. greater than 250MB) and were not attached.",
        );
      }

      if (slicedFiles.length) {
        return A.concat(files, slicedFiles);
      }

      return files;
    });
  };

  const isSubmitting = navigation.formAction === "/report";

  return (
    <Layout>
      <Section className="mt-4 sm:mt-8 md:mt-12">
        <Heading level={1}>Report an Incident</Heading>
        <Paragraph>
          If you have experienced or witnessed an incident of Anti-Palestinian
          Racism (APR) in Canada, we encourage you to report it using the form
          below. Your report will help us document the prevalence of APR and
          advocate for systemic change.
        </Paragraph>

        <Form onSubmit={onSubmit} className="max-w-prose">
          <AuthenticityTokenInput />
          <HoneypotInputs />

          <Heading className="mb-6 mt-12" level={4}>
            About the Incident
          </Heading>

          <Inputs.Pair>
            <DateInput label="Date of Incident" required name="incidentDate" />

            <Select
              label="Province of Incident"
              options={provinces}
              name="incidentProvince"
              required
            />
          </Inputs.Pair>

          <Inputs.Pair>
            <TextInput
              label="Place of Incident"
              type="text"
              name="incidentLocation"
              placeholder="e.g. campus, workplace, public space"
              required
              size={36}
              maxLength={500}
            />

            <Select
              name="incidentType"
              label="Type of Incident"
              options={incidentTypes}
              required
            />
          </Inputs.Pair>

          <Inputs.Single>
            <TextArea
              className="mt-6"
              rows={6}
              label="Description of Incident"
              name="incidentDescription"
              required
              maxLength={5000}
            />
          </Inputs.Single>

          <Inputs.Single>
            <Checkbox
              label="Incident was Reported to Police"
              name="wasReported"
            />
          </Inputs.Single>

          <Inputs.Single>
            <FileUpload
              files={files}
              setFiles={setFiles}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              fileError={fileError}
              isSubmitting={isSubmitting}
            />
          </Inputs.Single>

          <Heading className="mt-12" level={4}>
            Contact Information
          </Heading>

          <Inputs.Pair>
            <TextInput
              label="First Name"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              size={24}
              maxLength={100}
            />

            <TextInput
              label="Last Name"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              size={24}
              maxLength={100}
            />
          </Inputs.Pair>

          <Inputs.Pair>
            <TextInput
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              size={24}
              maxLength={300}
            />

            <TextInput
              label="Phone Number"
              name="phoneNumber"
              type="text"
              autoComplete="tel"
              inputMode="numeric"
              size={24}
              maxLength={20}
            />
          </Inputs.Pair>

          <Inputs.Pair>
            <TextInput
              label="City"
              name="city"
              type="text"
              autoComplete="address-level2"
              maxLength={200}
            />

            <Select
              label="Province"
              name="province"
              options={provinces}
              autoComplete="address-level1"
            />
          </Inputs.Pair>

          <Inputs.Single>
            <Checkbox
              label="I want my report forwarded to a legal organization."
              name="wantsForwarded"
            />
          </Inputs.Single>

          <Paragraph className="my-6 sm:mb-8" variant="small-secondary">
            We keep your personal information private and secure. All incident
            reports to APR on Campus’s anti-hate online incident form are kept
            strictly confidential unless otherwise specified.
          </Paragraph>

          <div className="flex items-center gap-4">
            <Button
              disabled={isSubmitting}
              className="min-w-48"
              variant="primary"
              type="submit"
            >
              Submit Report
            </Button>

            {isSubmitting ? <div className="loader" /> : null}
          </div>
        </Form>
      </Section>
    </Layout>
  );
}
