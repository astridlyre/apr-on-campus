import { Link } from "@remix-run/react";
import clsx from "clsx";

export default function TextLink(
  props: React.HTMLProps<HTMLAnchorElement> & { external?: boolean },
) {
  const { external, children, className, href, ...rest } = props;

  if (!href) {
    throw new Error("TextLink requires an href prop");
  }

  return (
    <Link
      to={href}
      className={clsx("text-secondary hover:underline", className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      {...rest}
    >
      {children}&nbsp;
      {external ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-1 inline-block"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      ) : null}
    </Link>
  );
}
