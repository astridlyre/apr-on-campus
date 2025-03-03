const defaultOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

export default function RadioButtons(props: {
  label?: string;
  name: string;
  required?: boolean;
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
  helperText?: string;
  options?: { label: string; value: string }[];
}) {
  const options = props.options || defaultOptions;

  if (!props.label) {
    return (
      <div>
        {options.map((option) => (
          <div className="flex items-center gap-2" key={option.value}>
            <input
              onChange={() => {
                props.onChange?.(option.value);
              }}
              checked={
                props.value !== undefined
                  ? props.value === option.value
                  : undefined
              }
              required={props.required}
              id={`radio-${props.name}-${option.value}`}
              type="radio"
              name={props.name}
              value={option.value}
            />
            <label htmlFor={`radio-${props.name}-${option.value}`}>
              {option.label}
            </label>
          </div>
        ))}

        {props.helperText ? (
          <small className="text-fg2">{props.helperText}</small>
        ) : null}
      </div>
    );
  }

  return (
    <fieldset className={props.className}>
      {props.label ? (
        <legend>
          {props.label}
          {props.required ? " (required)" : ""}
        </legend>
      ) : null}

      {options.map((option) => (
        <div className="mt-2 flex items-center gap-2" key={option.value}>
          <input
            onChange={() => {
              props.onChange?.(option.value);
            }}
            checked={
              props.value !== undefined
                ? props.value === option.value
                : undefined
            }
            required={props.required}
            id={`radio-${props.name}-${option.value}`}
            type="radio"
            name={props.name}
            value={option.value}
          />
          <label htmlFor={`radio-${props.name}-${option.value}`}>
            {option.label}
          </label>
        </div>
      ))}

      {props.helperText ? (
        <small className="text-fg2">{props.helperText}</small>
      ) : null}
    </fieldset>
  );
}
