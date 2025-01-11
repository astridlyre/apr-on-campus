import clsx from "clsx";

export default function Paragraph(
  props: React.HTMLProps<HTMLParagraphElement> & {
    variant?: "default" | "secondary" | "small" | "small-secondary";
  },
) {
  const { children, className, variant, ...rest } = props;

  if (variant === "secondary") {
    return (
      <p className={clsx("max-w-prose text-slate-400", className)} {...rest}>
        {children}
      </p>
    );
  }

  if (variant === "small") {
    return (
      <p
        className={clsx("max-w-prose text-sm text-slate-700", className)}
        {...rest}
      >
        {children}
      </p>
    );
  }

  if (variant === "small-secondary") {
    return (
      <p
        className={clsx("max-w-prose text-sm text-slate-400", className)}
        {...rest}
      >
        {children}
      </p>
    );
  }

  return (
    <p className={clsx("max-w-prose text-slate-700", className)} {...rest}>
      {children}
    </p>
  );
}
