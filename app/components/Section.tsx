import clsx from "clsx";

import Heading from "./Heading";

export default function Section(
  props: React.PropsWithChildren<{ title?: string; className?: string }>,
) {
  return (
    <section
      className={clsx(
        "w-full px-6 py-12 sm:px-12 md:px-16 lg:px-24",
        props.className,
      )}
    >
      <div className="mx-auto max-w-prose">
        {props.title ? <Heading level={2}>{props.title}</Heading> : null}

        {props.children}
      </div>
    </section>
  );
}
