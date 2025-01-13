import clsx from "clsx";
import { forwardRef } from "react";

const TextInput = forwardRef(function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    type: "text" | "email" | "password";
    label: string;
    labelClassName?: string;
    spanClassName?: string;
    inputClassName?: string;
  },
  ref: React.Ref<HTMLInputElement>,
) {
  const { label, className, spanClassName, inputClassName, ...rest } = props;
  return (
    <label className={clsx("block", className)}>
      <span className={clsx("text-fg", spanClassName)}>
        {label}
        {props.required ? "*" : " (optional)"}
      </span>
      <input
        ref={ref}
        {...rest}
        className={clsx(
          "bg-bg0 mt-1 block w-full rounded-md border-border focus:bg-white focus:ring-0 disabled:bg-disabled disabled:text-fg3",
          inputClassName,
        )}
      />
    </label>
  );
});

export default TextInput;
