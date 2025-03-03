import { D, N } from "@mobily/ts-belt";
import {
  data,
  redirect,
  type ActionFunction,
  type MetaFunction,
} from "@remix-run/node";
import { Form, useNavigation, useSubmit } from "@remix-run/react";
import { useEffect, useState } from "react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { CSRFError } from "remix-utils/csrf/server";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { SpamError } from "remix-utils/honeypot/server";

import Button from "~/components/Button";
import Heading from "~/components/Heading";
import Section from "~/components/Section";
import { csrf } from "~/csrf.server";
import Pages from "~/form/Pages";
import { createInitialState, FIRST_PAGE, LAST_PAGE, State } from "~/form/state";
import { honeypot } from "~/honeypot.server";
import validateIncident from "~/incidents.server";
import Layout from "~/layout";
import { createIncident } from "~/models/incidents.server";
import confirmedTemplate from "~/services/emails/confirmed.template";
import sendEmail from "~/services/emails.server";
import { getFormDataValue, getFormDataValues, maxFiles } from "~/utils";

export const meta: MetaFunction = () => [
  { title: "Report | APR on Campus" },
  { name: "description", content: "Report an incident of APR on Campus" },
];

export const action: ActionFunction = async ({ request }) => {
  await csrf.validate(request);

  try {
    const form = await request.formData();

    honeypot.check(form);

    const rawIncident = {
      userFirstName: getFormDataValue(form, "userFirstName"),
      userLastName: getFormDataValue(form, "userLastName"),
      userEmail: getFormDataValue(form, "userEmail"),
      userAffiliation: getFormDataValue(form, "userAffiliation"),
      date: getFormDataValue(form, "date"),
      province: getFormDataValue(form, "province"),
      subject: getFormDataValue(form, "subject"),
      location: getFormDataValue(form, "location"),
      locationOther: getFormDataValue(form, "locationOther"),
      campus: getFormDataValue(form, "campus"),
      wantsContact: getFormDataValue(form, "wantsContact"),
      wantsShared: getFormDataValue(form, "wantsShared"),
      wantsSharedWithOrgs: getFormDataValues(form, "wantsSharedWithOrgs"),
      allowsSocialShare: getFormDataValue(form, "allowsSocialShare"),
      didReport: getFormDataValue(form, "didReport"),
      type: getFormDataValues(form, "type"),
      typeOther: getFormDataValue(form, "typeOther"),
      description: getFormDataValue(form, "description"),
      impact: getFormDataValues(form, "impact"),
      impactDescription: getFormDataValue(form, "impactDescription"),
      wasFirstExperience: getFormDataValue(form, "wasFirstExperience"),
      wasFirstExperienceOther: getFormDataValue(
        form,
        "wasFirstExperienceOther",
      ),
      wasSystemic: getFormDataValue(form, "wasSystemic"),
      identities: getFormDataValues(form, "identities"),
      identitiesOther: getFormDataValue(form, "identitiesOther"),
      gender: getFormDataValue(form, "gender"),
      genderOther: getFormDataValue(form, "genderOther"),
      genderIdentities: getFormDataValues(form, "genderIdentities"),
      genderIdentitiesOther: getFormDataValue(form, "genderIdentitiesOther"),
      disability: getFormDataValue(form, "disability"),
      identityDescription: getFormDataValues(form, "identityDescription"),
      additionalInformation: getFormDataValue(form, "additionalInformation"),
    };

    const { incident, errors } = validateIncident(rawIncident);

    if (!incident) {
      return data({ errors }, 422);
    }

    const createdIncident = await createIncident(incident);

    const emailUser = {
      firstName: incident.userFirstName,
      email: incident.userEmail,
    };

    const subject = "Thank you for your report - APR on Campus";

    sendEmail({
      to: incident.userEmail,
      subject,
      text: confirmedTemplate.text({
        subject,
        user: emailUser,
        incident: createdIncident,
      }),
      html: confirmedTemplate.html({
        subject,
        user: emailUser,
        incident: createdIncident,
      }),
    });

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
  const [page, setPage] = useState(FIRST_PAGE);
  const [state, setState] = useState<State>(createInitialState);

  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (page !== LAST_PAGE) {
      setPage(N.add(1));
      return;
    }

    const formData = new FormData(evt.currentTarget);

    // Remove the file field from the form data
    formData.delete("file");

    const slicedFiles = state.files.slice(0, maxFiles);

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

  const isSubmitting = navigation.formAction === "/report";

  useEffect(() => {
    if (state.isSubmitting !== isSubmitting) {
      setState(D.merge({ isSubmitting }));
    }
  }, [state, isSubmitting]);

  return (
    <Layout>
      <Section className="mt-4 sm:mt-8 xl:mt-12">
        <Heading level={1}>Report an Incident</Heading>

        <Form onSubmit={onSubmit} className="max-w-prose">
          <AuthenticityTokenInput />
          <HoneypotInputs />

          <div className="py-4 md:rounded md:border md:border-bg3 md:bg-bg2 md:p-8">
            <Pages page={page} state={state} setState={setState} />

            <div className="mt-16 flex items-center justify-between gap-4">
              {page > 1 ? (
                <Button
                  disabled={isSubmitting}
                  className="min-w-48"
                  variant="default"
                  type="button"
                  onClick={() => {
                    setPage(N.subtract(1));
                  }}
                >
                  Previous Page
                </Button>
              ) : (
                <div></div>
              )}

              {page === LAST_PAGE ? (
                <Button
                  disabled={isSubmitting}
                  className="min-w-48"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  disabled={isSubmitting}
                  className="min-w-48"
                  variant="primary"
                  type="submit"
                >
                  Continue
                </Button>
              )}
              {isSubmitting ? <div className="loader" /> : null}
            </div>
          </div>
        </Form>
      </Section>
    </Layout>
  );
}
