import { D } from "@mobily/ts-belt";

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
  return (
    <fieldset className={props.className}>
      {props.label ? (
        <legend className="mb-2">
          {props.label}
          {props.required ? " (required)" : ""}
        </legend>
      ) : null}

      {props.options.map((option) => (
        <Checkbox
          onChange={() => {
            props.onChange?.(
              D.merge(props.value, {
                [option.value]: !props.value[option.value],
              }),
            );
          }}
          checked={props.value[option.value]}
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
