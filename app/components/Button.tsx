import clsx from "clsx";
import { forwardRef } from "react";

const Button = forwardRef(function Button(
  props: React.HTMLProps<HTMLButtonElement> & {
    variant?: "default" | "primary" | "secondary";
    type: "button" | "submit" | "reset";
  },
  ref: React.Ref<HTMLButtonElement>,
) {
  const { children, className, variant, ...rest } = props;

  const color =
    variant === "primary"
      ? "bg-primary text-slate-900 hover:bg-primaryLight disabled:hover:bg-primary"
      : variant === "secondary"
        ? "bg-secondary text-slate-900 hover:bg-secondaryLight disabled:hover:bg-secondary"
        : "bg-slate-300 text-slate-900 hover:bg-slate-200 disabled:hover:bg-slate-300";

  return (
    <button
      ref={ref}
      className={clsx(
        color,
        "px-6 py-3 text-lg shadow-sm disabled:opacity-50 disabled:shadow-none sm:px-8 sm:py-4",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
