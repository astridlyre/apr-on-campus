import clsx from "clsx";

export default function Blockquote(props: {
  source?: string | React.ReactNode;
  quote: string | React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("max-w-prose", props.className)}>
      <blockquote className="my-4 border-l-4 border-divider py-2 pl-4 italic text-fg2">
        “{props.quote}”
      </blockquote>
      {props.source ? (
        <footer className="text-sm text-fg">&mdash; {props.source}</footer>
      ) : null}
    </div>
  );
}
