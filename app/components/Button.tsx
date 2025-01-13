import clsx from "clsx";
import { forwardRef } from "react";

const Button = forwardRef(function Button(
  props: React.HTMLProps<HTMLButtonElement> & {
    variant?: "default" | "primary" | "secondary" | "text";
    type: "button" | "submit" | "reset";
  },
  ref: React.Ref<HTMLButtonElement>,
) {
  const { children, className, variant, ...rest } = props;

  if (variant === "text") {
    return (
      <button
        ref={ref}
        className={clsx("text-secondary hover:underline", className)}
        {...rest}
      >
        {children}
      </button>
    );
  }

  const color =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primaryDark disabled:hover:bg-disabled"
      : variant === "secondary"
        ? "bg-secondary text-white hover:bg-secondaryDark disabled:hover:bg-disabled"
        : "bg-neutral text-white hover:bg-neutralDark disabled:hover:bg-disabled";

  return (
    <button
      ref={ref}
      className={clsx(
        color,
        "rounded px-6 py-3 text-lg shadow-sm disabled:opacity-50 disabled:shadow-none sm:px-8 sm:py-4",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
