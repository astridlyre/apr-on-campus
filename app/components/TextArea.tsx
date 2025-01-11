import clsx from "clsx";

export default function TextArea(
  props: React.HTMLProps<HTMLTextAreaElement> & {
    label?: string;
    labelClassName?: string;
    textareaClassName?: string;
    spanClassName?: string;
  },
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
        {...rest}
        className={clsx(
          "mt-1 block w-full rounded-md border-slate-200 bg-slate-100 focus:border-slate-400 focus:bg-white focus:ring-0",
          textareaClassName,
        )}
      ></textarea>
    </label>
  );
}
