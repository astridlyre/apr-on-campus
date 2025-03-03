import { D } from "@mobily/ts-belt";

import Heading from "~/components/Heading";
import Inputs from "~/components/Inputs";
import RadioButtons from "~/components/RadioButtons";
import TextInput from "~/components/TextInput";
import { locations, subjects } from "~/incidents";

import type { PageProps } from "./state";

export default function WhereDidItHappen({ state, setState }: PageProps) {
  return (
    <>
      <Heading className="mt-0" level={4}>
        Please Describe the Incident
      </Heading>

      <Inputs.Single>
        <RadioButtons
          required
          label="Did this racism happen to you or someone else?"
          options={subjects}
          name="subject"
          value={state.subject}
          onChange={(evt) => {
            setState(D.merge({ subject: evt }));
          }}
        />
      </Inputs.Single>

      <br />

      <div>
        <Inputs.Single>
          <RadioButtons
            name="location"
            label="Where did this racism occur?"
            required
            options={locations}
            value={state.location}
            onChange={(evt) => {
              setState(D.merge({ location: evt }));
            }}
          />
        </Inputs.Single>

        {state.location === "Other" ? (
          <Inputs.Single>
            <TextInput
              type="text"
              label="Please specify the location"
              required
              name="locationOther"
              minLength={1}
              maxLength={100}
              value={state.locationOther}
              onChange={(evt) => {
                setState(D.merge({ locationOther: evt.target.value }));
              }}
            />
          </Inputs.Single>
        ) : null}
      </div>
    </>
  );
}
