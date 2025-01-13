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
          "bg-bg0 mr-1 rounded border-border text-fg focus:border-transparent focus:bg-white focus:ring-1 focus:ring-border focus:ring-offset-2",
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
