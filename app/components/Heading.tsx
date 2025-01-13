import clsx from "clsx";

function H1(props: React.HTMLProps<HTMLHeadingElement>) {
  const { children, className, ...rest } = props;
  return (
    <header className="max-w-heading">
      <h1
        className={clsx(
          "mb-4 text-5xl font-bold leading-none text-fg sm:mb-6 md:text-6xl lg:text-7xl",
          className,
        )}
        {...rest}
      >
        {children}
      </h1>
    </header>
  );
}

function H2(props: React.HTMLProps<HTMLHeadingElement>) {
  const { children, className, ...rest } = props;
  return (
    <header className="max-w-heading">
      <h2
        className={clsx(
          "mb-4 text-3xl font-bold leading-none text-fg sm:mb-6 md:text-4xl lg:text-5xl",
          className,
        )}
        {...rest}
      >
        {children}
      </h2>
    </header>
  );
}

function H3(props: React.HTMLProps<HTMLHeadingElement>) {
  const { children, className, ...rest } = props;
  return (
    <header className="max-w-heading">
      <h3
        className={clsx(
          "mb-4 text-2xl font-bold leading-none text-fg sm:mb-6 md:text-3xl lg:text-4xl",
          className,
        )}
        {...rest}
      >
        {children}
      </h3>
    </header>
  );
}

function H4(props: React.HTMLProps<HTMLHeadingElement>) {
  const { children, className, ...rest } = props;
  return (
    <header className="max-w-heading">
      <h4
        className={clsx(
          "mb-4 text-xl font-bold leading-none text-fg sm:mb-6 md:text-2xl lg:text-3xl",
          className,
        )}
        {...rest}
      >
        {children}
      </h4>
    </header>
  );
}

export default function Heading(
  props: React.HTMLProps<HTMLHeadingElement> & { level: 1 | 2 | 3 | 4 },
) {
  switch (props.level) {
    case 1:
      return <H1 {...props} />;
    case 2:
      return <H2 {...props} />;
    case 3:
      return <H3 {...props} />;
    case 4:
      return <H4 {...props} />;
  }
}
