const defaultOptions = [
	{ value: "yes", label: "Yes" },
	{ value: "no", label: "No" },
];

export default function RadioButtons(props: {
	label?: string;
	name: string;
	required?: boolean;
	className?: string;
	onChange?: (value: string) => void;
	options?: { label: string; value: string }[];
}) {
	const options = props.options || defaultOptions;

	if (!props.label) {
		return (
			<div>
				{options.map((option) => (
					<div className="flex gap-2 items-center" key={option.value}>
						<input
							onChange={() => {
								props.onChange?.(option.value);
							}}
							required={props.required}
							id={`radio-${props.name}-${option.value}`}
							type="radio"
							name={props.name}
						/>
						<label htmlFor={`radio-${props.name}-${option.value}`}>
							{option.label}
						</label>
					</div>
				))}
			</div>
		);
	}

	return (
		<fieldset className={props.className}>
			{props.label ? (
				<legend>
					{props.label}
					{props.required ? "*" : ""}
				</legend>
			) : null}

			{options.map((option) => (
				<div className="mt-2 flex gap-2 items-center" key={option.value}>
					<input
						onChange={() => {
							props.onChange?.(option.value);
						}}
						required={props.required}
						id={`radio-${props.name}-${option.value}`}
						type="radio"
						name={props.name}
					/>
					<label htmlFor={`radio-${props.name}-${option.value}`}>
						{option.label}
					</label>
				</div>
			))}
		</fieldset>
	);
}
