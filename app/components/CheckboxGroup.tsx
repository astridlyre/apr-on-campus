import { D } from "@mobily/ts-belt";
import React from "react";

import Checkbox from "./Checkbox";

export default function CheckboxGroup(props: {
	value: Record<string, boolean>;
	label: string;
	name: string;
	required?: boolean;
	className?: string;
	onChange?: (checked: Record<string, boolean>) => void;
	options: { label: string; value: string; defaultChecked?: boolean }[];
}) {
	const checkboxRef = React.useRef<HTMLInputElement>(null);

	return (
		<fieldset className={props.className}>
			{props.label ? (
				<legend className="mb-2">
					{props.label}
					{props.required ? " (required)" : ""}
				</legend>
			) : null}

			{props.options.map((option, idx) => (
				<Checkbox
					required={
						idx === 0 &&
						props.required &&
						D.toPairs(props.value).filter(([, value]) => value).length === 0
					}
					ref={checkboxRef}
					onChange={() => {
						if (props.value[option.value]) {
							return props.onChange?.(D.deleteKey(props.value, option.value));
						}
						return props.onChange?.(
							D.merge(props.value, { [option.value]: true }),
						);
					}}
					checked={props.value[option.value]}
					label={option.label}
					key={option.value}
					name={props.name}
					value={option.value}
				/>
			))}
		</fieldset>
	);
}
