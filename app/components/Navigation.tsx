import { Link, NavLink, useOutletContext } from "@remix-run/react";
import clsx from "clsx";
import { useState } from "react";

export default function Navigation() {
  const user = useOutletContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="z-10 bg-bg2">
      <div className="flex w-full justify-between">
        <Link
          to="/"
          className="flex items-center bg-primary px-8 py-4 text-center text-lg font-bold text-fg hover:bg-primaryLight md:py-6"
        >
          APR on Campus
        </Link>

        {isOpen ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 md:hidden"
            onClick={() => setIsOpen(false)}
          ></div>
        ) : null}

        <button
          className={clsx(
            "z-10 block px-4 py-2 text-fg md:hidden",
            isOpen && "bg-slate-200",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
            "absolute left-0 right-0 top-0 mt-16 w-full flex-col bg-slate-200 md:static md:mt-0 md:grid md:w-auto md:bg-bg",
            user ? "md:grid-cols-4" : "md:grid-cols-3",
          )}
        >
          <NavLink
            to="/about"
            className="link flex items-center justify-center bg-slate-200 px-8 py-6 text-lg text-fg hover:bg-slate-300 md:min-w-44"
          >
            About
          </NavLink>
          <NavLink
            to="/learn"
            className="link flex items-center justify-center bg-slate-200 px-8 py-6 text-lg text-fg hover:bg-slate-300 md:min-w-44"
          >
            What is APR?
          </NavLink>
          <NavLink
            to="/report"
            className="link flex items-center justify-center bg-secondary px-8 py-6 text-lg text-white hover:bg-secondaryLight md:min-w-56"
          >
            <span className="hidden md:inline">Report an Incident</span>
            <span className="md:hidden">Report</span>
          </NavLink>

          {user ? (
            <NavLink
              to="/dashboard"
              className="link flex items-center justify-center bg-primary px-8 py-6 text-lg hover:bg-primaryLight md:min-w-44"
            >
              Dashboard
            </NavLink>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
