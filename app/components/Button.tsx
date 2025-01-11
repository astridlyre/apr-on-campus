import clsx from "clsx";

export default function Button(
  props: React.HTMLProps<HTMLButtonElement> & {
    variant?: "default" | "primary" | "secondary";
    type: "button" | "submit" | "reset";
  },
) {
  const { children, className, variant, ...rest } = props;

  const color =
    variant === "primary"
      ? "bg-primary text-slate-900 hover:bg-primaryLight"
      : variant === "secondary"
        ? "bg-secondary text-slate-900 hover:bg-secondaryLight"
        : "bg-slate-300 text-slate-900 hover:bg-slate-200";

  return (
    <button
      className={clsx(
        color,
        "px-6 py-3 text-lg shadow-sm sm:px-8 sm:py-4",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
