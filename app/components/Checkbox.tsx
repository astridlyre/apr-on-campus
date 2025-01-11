import clsx from "clsx";

export default function Checkbox(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    labelClassName?: string;
    spanClassName?: string;
    inputClassName?: string;
  },
) {
  const { label, className, spanClassName, inputClassName, ...rest } = props;
  return (
    <label className={clsx("block items-center", className)}>
      <input
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
}
