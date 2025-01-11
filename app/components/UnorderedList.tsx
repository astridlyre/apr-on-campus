import clsx from "clsx";

export default function UnorderedList(
  props: React.HTMLProps<HTMLUListElement>,
) {
  const { children, className, ...rest } = props;
  return (
    <ul
      className={clsx(
        "max-w-prose list-disc space-y-2 pl-6 text-fg",
        className,
      )}
      {...rest}
    >
      {children}
    </ul>
  );
}
