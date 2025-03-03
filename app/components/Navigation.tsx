import { NavLink, useOutletContext } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";

export default function Navigation() {
  const user = useOutletContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-10 bg-bg2">
      <div
        className={clsx(
          "nav-height grid w-full grid-cols-2 justify-between md:grid",
          user ? "md:grid-cols-5" : "md:grid-cols-4",
        )}
      >
        <NavLink
          prefetch="intent"
          to="/"
          className="link flex items-center justify-center bg-neutralDark px-2 text-lg text-white hover:bg-neutral md:py-0"
        >
          APR on Campus
        </NavLink>

        <NavLink
          to="/learn"
          className="link hidden items-center justify-center bg-secondary py-6 text-lg text-white hover:bg-secondaryDark md:flex md:py-0"
        >
          What APR Looks Like
        </NavLink>

        <NavLink
          to="/resources"
          className="link hidden items-center justify-center bg-bg2 py-6 text-lg text-fg hover:bg-bg3 md:flex md:py-0"
        >
          Resources
        </NavLink>

        <NavLink
          to="/report"
          className="link hidden items-center justify-center bg-primary py-6 text-lg text-white hover:bg-primaryDark md:flex md:py-0"
        >
          Report an Incident
        </NavLink>

        {user ? (
          <NavLink
            to="/dashboard"
            className="link hidden items-center justify-center bg-secondary py-6 text-lg text-white hover:bg-secondaryDark md:flex md:py-0"
          >
            Dashboard
          </NavLink>
        ) : null}

        <div className="flex justify-end md:hidden">
          {isOpen ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-bg2 opacity-50 md:hidden"
              onClick={() => setIsOpen(false)}
            ></div>
          ) : null}

          <button
            className={clsx(
              "z-10 block px-4 py-2 text-fg md:hidden",
              isOpen && "bg-bg2",
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div
            tabIndex={0}
            role="button"
            onKeyDown={(evt) => {
              if (evt.key === "Escape") {
                setIsOpen(false);
              }
            }}
            onClick={() => setIsOpen(false)}
            className={clsx(
              isOpen ? "block" : "hidden",
              "pt-nav-height absolute left-0 right-0 top-0 w-full flex-col md:static md:mt-0 md:flex md:w-auto md:flex-row md:bg-bg md:pt-0",
            )}
          >
            <NavLink
              to="/learn"
              className="link flex items-center justify-center bg-secondary px-8 py-6 text-lg text-white hover:bg-secondaryDark md:py-0"
            >
              What APR Looks Like
            </NavLink>
            <NavLink
              to="/resources"
              className="link flex items-center justify-center bg-bg2 px-8 py-6 text-lg text-fg hover:bg-bg3 md:py-0"
            >
              Resources
            </NavLink>
            <NavLink
              to="/report"
              className="link flex items-center justify-center bg-primary px-8 py-6 text-lg text-white hover:bg-primaryDark md:py-0"
            >
              Report an Incident
            </NavLink>

            {user ? (
              <NavLink
                to="/dashboard"
                className="link flex items-center justify-center bg-secondary px-8 py-6 text-lg text-white hover:bg-secondaryDark md:py-0"
              >
                Dashboard
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
