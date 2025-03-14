import clsx from "clsx";

export function Pair({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6 md:mb-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Single({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={clsx("mb-4 md:mb-6", className)}>{children}</div>;
}

export default { Pair, Single };
