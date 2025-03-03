import { D } from "@mobily/ts-belt";
import React from "react";

import CheckboxGroup from "~/components/CheckboxGroup";
import Heading from "~/components/Heading";
import Inputs from "~/components/Inputs";
import Paragraph from "~/components/Paragraph";
import RadioButtons from "~/components/RadioButtons";
import TextArea from "~/components/TextArea";
import TextInput from "~/components/TextInput";
import {
  disabilities,
  genderIdentities,
  genders,
  identities,
} from "~/incidents";

import type { PageProps } from "./state";

export default function Intersectionality({ state, setState }: PageProps) {
  const setIdentities = React.useCallback(
    (identities: Record<string, boolean>) => {
      setState(D.merge({ identities }));
    },
    [setState],
  );

  return (
    <>
      <Heading className="mb-6 mt-12" level={4}>
        Intersectionality
      </Heading>

      <Paragraph>
        We want to better understand the full scope of intersectionality as it
        relates to people&apos;s experiences of racism when they are targeted.
        Please help us understand the ways with which you identify (as much as
        you are comfortable):
      </Paragraph>

      <div>
        <Inputs.Single>
          <CheckboxGroup
            name="identities"
            label="Do you identify with any of the following identities? (check all that apply)"
            options={identities}
            onChange={setIdentities}
          />
        </Inputs.Single>

        {state.identities.Other ? (
          <Inputs.Single>
            <TextInput
              type="text"
              label="Please specify the identity"
              required
              name="identitiesOther"
              minLength={1}
              maxLength={100}
              value={state.identitiesOther}
              onChange={(evt) => {
                setState(D.merge({ identitiesOther: evt.target.value }));
              }}
            />
          </Inputs.Single>
        ) : null}
      </div>

      <br />

      <div>
        <Inputs.Single>
          <RadioButtons
            name="gender"
            label="Do you identify as:"
            options={genders}
            onChange={(evt) => {
              setState(D.merge({ gender: evt }));
            }}
          />
        </Inputs.Single>

        {state.gender === "Other" ? (
          <Inputs.Single>
            <TextInput
              type="text"
              label="Please specify the gender"
              required
              name="genderOther"
              minLength={1}
              maxLength={100}
            />
          </Inputs.Single>
        ) : null}
      </div>

      <br />

      <div>
        <Inputs.Single>
          <CheckboxGroup
            name="genderIdentities"
            label="Do you identify with any of the following identities? (check all that apply):"
            options={genderIdentities}
            onChange={(evt) => {
              setState(D.merge({ genderIdentities: evt }));
            }}
          />
        </Inputs.Single>

        {state.genderIdentities.Other ? (
          <Inputs.Single>
            <TextInput
              type="text"
              label="Please specify the identity"
              required
              name="genderIdentitiesOther"
              minLength={1}
              maxLength={100}
            />
          </Inputs.Single>
        ) : null}
      </div>

      <br />

      <Inputs.Single>
        <RadioButtons
          name="disability"
          label="Do you identify as a person with a disability:"
          options={disabilities}
        />
      </Inputs.Single>

      <br />

      <Inputs.Single>
        <TextArea
          maxLength={5000}
          rows={4}
          name="identityDescription"
          label="Is there any other part of your identity that you want to include that you think is relevant to your experience of being targeted? (ex. political affiliation, perceived socioeconomic status, newcomer, youth etc.)"
          value={state.identityDescription}
          onChange={(evt) => {
            setState(
              D.merge({
                identityDescription: (evt.target as HTMLTextAreaElement).value,
              }),
            );
          }}
        />
      </Inputs.Single>

      <br />

      <Inputs.Single>
        <TextArea
          label="Is there anything else you would like to share with us?"
          rows={3}
          maxLength={5000}
          name="additionalInformation"
        />
      </Inputs.Single>
    </>
  );
}
