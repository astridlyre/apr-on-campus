import clsx from "clsx";

export default function Paragraph(
  props: React.HTMLProps<HTMLParagraphElement> & {
    variant?: "default" | "secondary" | "small" | "small-secondary";
  },
) {
  const { children, className, variant, ...rest } = props;

  if (variant === "secondary") {
    return (
      <p
        className={clsx("mb-4 mt-6 max-w-prose text-fg2", className)}
        {...rest}
      >
        {children}
      </p>
    );
  }

  if (variant === "small") {
    return (
      <p
        className={clsx("mb-4 mt-6 max-w-prose text-sm text-fg2", className)}
        {...rest}
      >
        {children}
      </p>
    );
  }

  if (variant === "small-secondary") {
    return (
      <p
        className={clsx("text-fg-3 mb-4 mt-6 max-w-prose text-sm", className)}
        {...rest}
      >
        {children}
      </p>
    );
  }

  return (
    <p className={clsx("mb-4 mt-6 max-w-prose text-fg", className)} {...rest}>
      {children}
    </p>
  );
}
