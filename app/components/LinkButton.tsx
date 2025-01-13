import { Link } from "@remix-run/react";
import clsx from "clsx";
import { forwardRef } from "react";

const LinkButton = forwardRef(function LinkButton(
  props: React.ComponentProps<typeof Link> & {
    variant?: "default" | "primary" | "secondary";
  },
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  const { children, className, variant, ...rest } = props;

  const color =
    variant === "primary"
      ? "bg-primary text-white hover:bg-primaryDark"
      : variant === "secondary"
        ? "bg-secondary text-white hover:bg-secondaryDark"
        : "bg-neutral text-white hover:bg-neutralDark";

  return (
    <Link
      prefetch="intent"
      ref={ref}
      className={clsx(
        color,
        "rounded px-6 py-3 text-lg shadow-sm sm:px-8 sm:py-4",
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
});

export default LinkButton;
