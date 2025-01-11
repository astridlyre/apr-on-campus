import clsx from "clsx";
import { Link } from "react-router";

export default function LinkButton(
  props: React.ComponentProps<typeof Link> & {
    variant?: "default" | "primary" | "secondary";
  },
) {
  const { children, className, variant, ...rest } = props;

  const color =
    variant === "primary"
      ? "bg-primary text-slate-900 hover:bg-primaryLight"
      : variant === "secondary"
        ? "bg-secondary text-white hover:bg-secondaryLight"
        : "bg-slate-300 text-slate-900 hover:bg-slate-200";

  return (
    <Link
      className={clsx(
        color,
        "px-6 py-3 text-lg shadow-sm sm:px-8 sm:py-4",
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}
