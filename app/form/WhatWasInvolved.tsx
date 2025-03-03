import { D } from "@mobily/ts-belt";

import CheckboxGroup from "~/components/CheckboxGroup";
import Heading from "~/components/Heading";
import Inputs from "~/components/Inputs";
import TextArea from "~/components/TextArea";
import TextInput from "~/components/TextInput";
import { types } from "~/incidents";

import type { PageProps } from "./state";

export default function WhatWasInvolved({ state, setState }: PageProps) {
  return (
    <>
      <Heading className="mt-0" level={4}>
        What was Involved?
      </Heading>

      <Inputs.Single>
        <CheckboxGroup
          name="type"
          label="What did this racism involve? (check all that apply)"
          options={types}
          onChange={(type) => {
            setState(D.merge({ type }));
          }}
          value={state.type}
        />
      </Inputs.Single>

      {state.type.Other ? (
        <Inputs.Single>
          <TextInput
            type="text"
            label="Please describe"
            name="typeOther"
            minLength={1}
            maxLength={100}
            value={state.typeOther}
            onChange={(evt) => {
              setState(D.merge({ typeOther: evt }));
            }}
          />
        </Inputs.Single>
      ) : null}

      <br />

      <Inputs.Single>
        <TextArea
          rows={6}
          name="description"
          label="Please describe your experience with racism (what happened, who was involved, what did you do, did you get a resolution etc)?"
          required
          minLength={1}
          maxLength={5000}
          value={state.description}
          onChange={(evt) => {
            setState(
              D.merge({
                description: (evt.target as HTMLTextAreaElement).value,
              }),
            );
          }}
        />
      </Inputs.Single>
    </>
  );
}
