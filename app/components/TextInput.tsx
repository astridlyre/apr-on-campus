import clsx from "clsx";

export default function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    type: "text" | "email" | "password";
    label: string;
    labelClassName?: string;
    spanClassName?: string;
    inputClassName?: string;
  },
) {
  const { label, className, spanClassName, inputClassName, ...rest } = props;
  return (
    <label className={clsx("block", className)}>
      <span className={clsx("text-slate-800", spanClassName)}>
        {label}
        {props.required ? "*" : " (optional)"}
      </span>
      <input
        {...rest}
        className={clsx(
          "mt-1 block w-full rounded-md border-slate-200 bg-slate-100 focus:border-slate-400 focus:bg-white focus:ring-0",
          inputClassName,
        )}
      />
    </label>
  );
}
