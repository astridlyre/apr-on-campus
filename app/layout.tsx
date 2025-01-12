import Footer from "~/components/Footer";
import Navigation from "~/components/Navigation";

export default function Layout({
  children,
  noFooter,
}: {
  children: React.ReactNode;
  noFooter?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex flex-grow flex-col">{children}</main>
      {noFooter === true ? null : <Footer />}
    </div>
  );
}
