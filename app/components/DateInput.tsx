import clsx from "clsx";
import { forwardRef } from "react";

const DateInput = forwardRef(function DateInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    labelClassName?: string;
    spanClassName?: string;
    inputClassName?: string;
  },
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { label, className, spanClassName, inputClassName, ...rest } = props;
  return (
    <label className={clsx("block", className)}>
      <span className={clsx("text-slate-800", spanClassName)}>
        {label}
        {props.required ? "*" : null}
      </span>
      <input
        ref={ref}
        {...rest}
        type="date"
        className={clsx(
          "mt-1 block w-full rounded-md border-transparent bg-slate-100 focus:border-slate-400 focus:bg-white focus:ring-0",
          inputClassName,
        )}
      />
    </label>
  );
});

export default DateInput;
