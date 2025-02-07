import { D } from "@mobily/ts-belt";
import { useEffect, useState } from "react";

import Checkbox from "./Checkbox";

export default function CheckboxGroup(props: {
	label: string;
	name: string;
	required?: boolean;
	className?: string;
	onChange?: (checked: Record<string, boolean>) => void;
	options: { label: string; value: string; defaultChecked?: boolean }[];
}) {
	const [checked, setChecked] = useState(
		Object.fromEntries(
			props.options.map((option) => [
				option.value,
				Boolean(option.defaultChecked),
			]),
		),
	);

	useEffect(() => {
		props.onChange?.(checked);
	}, [props, checked]);

	return (
		<fieldset className={props.className}>
			{props.label ? (
				<legend className="mb-2">
					{props.label}
					{props.required ? "*" : ""}
				</legend>
			) : null}

			{props.options.map((option) => (
				<Checkbox
					onChange={() => {
						const currentValue = checked[option.value];
						setChecked(D.merge({ [option.value]: !currentValue }));
					}}
					checked={checked[option.value]}
					required={props.required}
					label={option.label}
					key={option.value}
					name={props.name}
					value={option.value}
				/>
			))}
		</fieldset>
	);
}
