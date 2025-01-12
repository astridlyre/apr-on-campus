import { Incident, IncidentFile } from "@prisma/client";
import type { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { Children } from "react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { CSRFError } from "remix-utils/csrf/server";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { SpamError } from "remix-utils/honeypot/server";
import invariant from "tiny-invariant";

import Section from "~/components/Section";
import TextLink from "~/components/TextLink";
import UnorderedList from "~/components/UnorderedList";
import { csrf } from "~/csrf.server";
import { honeypot } from "~/honeypot.server";
import { deleteIncident, getIncident } from "~/models/incidents.server";
import { requireUserId } from "~/session.server";
import {
  capitalize,
  formatDateWithoutTime,
  formatPhoneNumber,
  getFormDataValue,
} from "~/utils";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  try {
    await requireUserId(request);

    const { id } = params;

    invariant(id, "Incident ID is required");

    const incident = await getIncident({ id });

    if (!incident) {
      throw new Error("Incident not found");
    }

    return { incident };
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }

    return new Response("An error occurred", { status: 500 });
  }
};

function ListItem({ children }: React.PropsWithChildren) {
  const childrenArray = Children.toArray(children);

  const [first, second] = childrenArray;

  return (
    <li className="grid grid-cols-12 gap-2">
      <div className="col-span-2">{first}</div>
      <div className="col-span-10">{second}</div>
    </li>
  );
}

export const action: ActionFunction = async ({ params, request }) => {
  try {
    await csrf.validate(request);

    invariant(params.id, "Incident ID is required");

    const form = await request.formData();

    honeypot.check(form);

    const { id } = params;
    const action = getFormDataValue(form, "action");

    if (action === "delete") {
      await deleteIncident({ id });
      return redirect("/dashboard");
    }

    return redirect(`/dashboard/${id}`);
  } catch (err) {
    if (err instanceof CSRFError) {
      return new Response("Forbidden", { status: 403 });
    }
    if (err instanceof SpamError) {
      return new Response("Spam detected", { status: 400 });
    }
    return new Response("Something went wrong", { status: 500 });
  }
};

export default function IncidentPage() {
  const data = useLoaderData<typeof loader>();

  const { incident } = data as {
    incident: Incident & { files: IncidentFile[] };
  };

  return (
    <Section>
      <div className="space-y-8 rounded-lg border border-slate-200 bg-white p-6">
        <header className="flex items-start justify-between border-b pb-4">
          <h2 className="text-3xl font-bold text-slate-900">
            Incident Details
          </h2>

          <div className="flex items-center gap-8">
            <TextLink href={`mailto:${incident.userEmail}`} external>
              Email User
            </TextLink>

            <Form action={`/dashboard/${incident.id}`} method="POST">
              <AuthenticityTokenInput />
              <HoneypotInputs />

              <button
                className="border border-slate-300 bg-slate-200 px-2 py-1 text-sm hover:bg-slate-300 hover:shadow"
                type="submit"
                name="action"
                value="delete"
              >
                Delete
              </button>
            </Form>
          </div>
        </header>

        <section>
          <h3 className="mb-4 text-xl font-bold text-slate-900">
            Incident Information
          </h3>
          <ul className="space-y-2">
            <ListItem>
              <span className="font-medium">Date:</span>
              <strong>{formatDateWithoutTime(incident.date)}</strong>
            </ListItem>
            <ListItem>
              <span className="font-medium">Province:</span>
              <strong>{incident.province}</strong>
            </ListItem>
            <ListItem>
              <span className="font-medium">Location:</span>
              <strong>{incident.location}</strong>
            </ListItem>
            <ListItem>
              <span className="font-medium">Type:</span>
              <strong>{capitalize(incident.type)}</strong>
            </ListItem>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold text-slate-900">Description</h3>
          <div className="prose text-fg2">
            {incident.description.split("\n").map((line, index) => (
              <p key={index}>{line.trim()}</p>
            ))}
          </div>
        </section>

        <section>
          <h3 className="mb-4 text-xl font-bold text-slate-900">
            User Information
          </h3>
          <ul className="space-y-2">
            <ListItem>
              <span className="font-medium">Name:</span>
              <strong>
                {incident.userFirstName} {incident.userLastName}
              </strong>
            </ListItem>
            <ListItem>
              <span className="font-medium">Email:</span>
              <strong>{incident.userEmail}</strong>
            </ListItem>
            <ListItem>
              <span className="font-medium">Phone:</span>
              <strong>{formatPhoneNumber(incident.userPhoneNumber)}</strong>
            </ListItem>
            <ListItem>
              <span className="font-medium">City:</span>
              <strong>{incident.userCity || "N/A"}</strong>
            </ListItem>
            <ListItem>
              <span className="font-medium">Province:</span>
              <strong>{incident.userProvince || "N/A"}</strong>
            </ListItem>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-bold text-slate-900">Status</h3>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Reported to police?</span>{" "}
              <strong>{incident.wasReported ? "Yes" : "No"}</strong>
            </li>
            <li>
              <span className="font-medium">Should forward to legal?</span>{" "}
              <strong>{incident.wantsForwarded ? "Yes" : "No"}</strong>
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-lg font-bold text-slate-900">Files</h3>
          <UnorderedList>
            {incident.files.map((file) => (
              <li key={file.id}>
                <TextLink href={file.href} external>
                  {file.href.split("/").pop()} ({file.contentType})
                </TextLink>
              </li>
            ))}
          </UnorderedList>
        </section>
      </div>
    </Section>
  );
}
