import clsx from "clsx";

import Footer from "~/components/Footer";
import Navigation from "~/components/Navigation";

export default function Layout({
  children,
  noFooter,
  className,
}: {
  children: React.ReactNode;
  noFooter?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("flex min-h-screen flex-col", className)}>
      <Navigation />
      <main className="flex flex-grow flex-col">{children}</main>
      {noFooter === true ? null : <Footer />}
    </div>
  );
}
