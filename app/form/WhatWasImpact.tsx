import { D } from "@mobily/ts-belt";

import CheckboxGroup from "~/components/CheckboxGroup";
import Heading from "~/components/Heading";
import Inputs from "~/components/Inputs";
import RadioButtons from "~/components/RadioButtons";
import TextArea from "~/components/TextArea";
import { impacts, yesNoOther, yesNoUnsure } from "~/incidents";

import type { PageProps } from "./state";

export default function WhatWasImpact({ state, setState }: PageProps) {
	return (
		<>
			<Heading className="mt-0" level={4}>
				What was the impact?
			</Heading>

			<Inputs.Single>
				<CheckboxGroup
					name="impact"
					label="How has this racist experience impacted you? (check all that apply)"
					options={impacts}
					value={state.impact}
					onChange={(impact) => {
						setState(D.merge({ impact }));
					}}
				/>
			</Inputs.Single>

			<br />

			<Inputs.Single>
				<TextArea
					rows={3}
					label="Feel free to explain further how racism has impacted you"
					name="impactDescription"
					maxLength={5000}
					value={state.impactDescription}
					onChange={(evt) => {
						setState(
							D.merge({
								impactDescription: (evt.target as HTMLTextAreaElement).value,
							}),
						);
					}}
				/>
			</Inputs.Single>

			<br />

			<div>
				<Inputs.Single>
					<RadioButtons
						name="wasFirstExperience"
						label="Was this your first experience with anti-Palestinian racism?"
						options={yesNoOther}
						value={state.wasFirstExperience}
						onChange={(wasFirstExperience) => {
							setState(D.merge({ wasFirstExperience }));
						}}
					/>
				</Inputs.Single>
			</div>

			<br />

			<Inputs.Single>
				<RadioButtons
					label="Do you believe your experience was a result of systemic racism (e.g., policies, practices, or institutions that disproportionately disadvantage certain racial groups)?"
					required
					name="wasSystemic"
					onChange={(wasSystemic) => {
						setState(D.merge({ wasSystemic }));
					}}
					options={yesNoUnsure}
					value={state.wasSystemic}
				/>
			</Inputs.Single>
		</>
	);
}
