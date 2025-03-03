import { D } from "@mobily/ts-belt";
import React from "react";

import CheckboxGroup from "~/components/CheckboxGroup";
import Heading from "~/components/Heading";
import Inputs from "~/components/Inputs";
import RadioButtons from "~/components/RadioButtons";
import { affiliation, campuses, organizations } from "~/incidents";

import type { PageProps } from "./state";

export default function InstitutionalInvolvement({
  state,
  setState,
}: PageProps) {
  const setWantsSharedWithOrgs = React.useCallback(
    (wantsSharedWithOrgs: Record<string, boolean>) => {
      setState(D.merge({ wantsSharedWithOrgs }));
    },
    [setState],
  );

  return (
    <>
      <Heading className="mt-0" level={4}>
        Did it Involve a Canadian Educational Institution?
      </Heading>

      <Inputs.Single>
        <RadioButtons
          required
          label="If this incident occurred at a Canadian educational Institution, was it one of the following?"
          name="campus"
          options={campuses}
          value={state.campus}
          onChange={(evt) => {
            setState(
              D.merge({
                campus: evt,
                wantsContact:
                  evt === "N/A" || evt === "" ? "" : state.wantsContact,
              }),
            );
          }}
        />
      </Inputs.Single>

      <br />

      {state.campus !== "N/A" && state.campus !== "" ? (
        <>
          <Inputs.Single>
            <RadioButtons
              required
              label="I would like a campus representative to follow up with me regarding my report and any available further action."
              name="wantsContact"
              value={state.wantsContact}
              onChange={(evt) => {
                setState(D.merge({ wantsContact: evt }));
              }}
            />
          </Inputs.Single>
          <br />
        </>
      ) : null}

      <Inputs.Single>
        <RadioButtons
          label="I want my story to be shared with other APR data collection and advocacy groups in Canada."
          name="wantsShared"
          value={state.wantsShared}
          onChange={(evt) => {
            setState(D.merge({ wantsShared: evt, wantsSharedWithOrgs: {} }));
          }}
        />
      </Inputs.Single>

      <br />

      {state.wantsShared === "Yes" ? (
        <>
          <Inputs.Single>
            <CheckboxGroup
              label="I consent to share my incident report with the following groups (select all that apply)"
              name="wantsSharedWithOrgs"
              options={organizations}
              onChange={setWantsSharedWithOrgs}
            />
          </Inputs.Single>
          <br />
        </>
      ) : null}

      {state.wantsShared === "Yes" ? (
        <>
          <Inputs.Single>
            <RadioButtons
              required
              label="I would like to allow partnering advocacy groups to share this story anonymously on social media"
              name="allowsSocialShare"
              value={state.allowsSocialShare}
              onChange={(evt) => {
                setState(D.merge({ allowsSocialShare: evt }));
              }}
            />
          </Inputs.Single>
          <br />
        </>
      ) : null}

      <Inputs.Single>
        <RadioButtons
          label="If your incident occurred at a Canadian educational institution, are you:"
          required
          options={affiliation}
          name="userAffilication"
          value={state.userAffiliation}
          onChange={(evt) => {
            setState(D.merge({ userAffiliation: evt }));
          }}
        />
      </Inputs.Single>

      <br />

      <Inputs.Single>
        <RadioButtons
          label="Have you reported your experience with another organization yet?"
          required
          name="didReport"
          value={state.didReport}
          onChange={(evt) => {
            setState(D.merge({ didReport: evt }));
          }}
        />
      </Inputs.Single>
    </>
  );
}
