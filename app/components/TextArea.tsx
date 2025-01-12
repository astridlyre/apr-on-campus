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
          {props.required ? "*" : null}
        </span>
      ) : null}

      <textarea
        ref={ref}
        {...rest}
        className={clsx(
          "mt-1 block w-full rounded-md border-slate-200 bg-slate-100 focus:border-slate-400 focus:bg-white focus:ring-0 disabled:bg-disabled disabled:text-slate-400",
          textareaClassName,
        )}
      ></textarea>
    </label>
  );
});

export default TextArea;
