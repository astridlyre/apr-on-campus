import clsx from "clsx";
import { forwardRef } from "react";

const Select = forwardRef(function Select(
  props: React.HTMLProps<HTMLSelectElement> & {
    label: string;
    className?: string;
    spanClassName?: string;
    inputClassName?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
  },
  ref: React.Ref<HTMLSelectElement>,
) {
  const { label, className, spanClassName, inputClassName, options, ...rest } =
    props;
  return (
    <label className={clsx("block", className)}>
      <span className={clsx("text-fg", spanClassName)}>
        {label}
        {props.required ? " (required)" : ""}
      </span>
      <select
        onChange={props.onChange}
        value={props.value}
        ref={ref}
        className={clsx(
          "mt-1 block w-full rounded-md border-border bg-bg0 focus:bg-white focus:ring-0 disabled:bg-disabled disabled:text-fg3",
          inputClassName,
        )}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
});

export default Select;
