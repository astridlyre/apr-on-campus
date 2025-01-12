import clsx from "clsx";
import { forwardRef } from "react";

const Checkbox = forwardRef(function Checkbox(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    labelClassName?: string;
    spanClassName?: string;
    inputClassName?: string;
  },
  ref: React.Ref<HTMLInputElement>,
) {
  const { label, className, spanClassName, inputClassName, ...rest } = props;
  return (
    <label className={clsx("flex items-center", className)}>
      <input
        ref={ref}
        {...rest}
        type="checkbox"
        className={clsx(
          "mr-1 rounded border-transparent bg-slate-200 text-slate-700 focus:border-transparent focus:bg-slate-200 focus:ring-1 focus:ring-slate-500 focus:ring-offset-2",
          inputClassName,
        )}
      />
      <span className={clsx("ml-2 text-fg", spanClassName)}>
        {label}
        {props.required ? "*" : null}
      </span>
    </label>
  );
});

export default Checkbox;
