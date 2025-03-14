import clsx from "clsx";
import { forwardRef } from "react";

const TextArea = forwardRef(function TextArea(
  props: React.HTMLProps<HTMLTextAreaElement> & {
    label?: string;
    labelClassName?: string;
    textareaClassName?: string;
    spanClassName?: string;
  },
  ref: React.Ref<HTMLTextAreaElement>,
) {
  const { label, className, textareaClassName, spanClassName, ...rest } = props;
  return (
    <label className={clsx("block", className)}>
      {label ? (
        <span className={clsx("text-fg", spanClassName)}>
          {label}
          {props.required ? " (required)" : ""}
        </span>
      ) : null}

      <textarea
        ref={ref}
        {...rest}
        className={clsx(
          "mt-1 block w-full rounded-md border-border bg-bg0 focus:bg-white focus:ring-0 disabled:bg-disabled disabled:text-fg3",
          textareaClassName,
        )}
      ></textarea>
    </label>
  );
});

export default TextArea;
