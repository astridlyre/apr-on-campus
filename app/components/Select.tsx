import clsx from "clsx";
import { forwardRef } from "react";

const Select = forwardRef(function Select(
  props: React.HTMLProps<HTMLSelectElement> & {
    label: string;
    className?: string;
    spanClassName?: string;
    inputClassName?: string;
    options: { value: string; label: string }[];
  },
  ref: React.Ref<HTMLSelectElement>,
) {
  const { label, className, spanClassName, inputClassName, options, ...rest } =
    props;
  return (
    <label className={clsx("block", className)}>
      <span className={clsx("text-slate-800", spanClassName)}>
        {label}
        {props.required ? "*" : "( optional)"}
      </span>
      <select
        ref={ref}
        className={clsx(
          "mt-1 block w-full rounded-md border-slate-200 bg-slate-100 focus:border-slate-400 focus:bg-white focus:ring-0 disabled:bg-disabled disabled:text-slate-400",
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
