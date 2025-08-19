import { NavLink, Outlet, useNavigation } from "react-router";
import classNames from "classnames";
import { useState } from "react";

export function Header() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const loadingPath = navigation.location?.pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg transition text-lg font-medium";
  const activeClass =
    "bg-white bg-opacity-20 backdrop-blur-md shadow-lg border border-white border-opacity-30 text-black";
  const loadingClass = "animate-pulse";

  const links = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/discover", label: "Discover", icon: "🔎" },
    { to: "/app", label: "App", icon: "📱" },
    { to: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Topbar for mobile/tablet */}
      <header className="md:hidden bg-green-700 text-white flex items-center justify-between px-4 py-4">
        <span className="text-2xl font-bold tracking-wide">Recipe App</span>
        <button
          className="focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>
      </header>
      {/* Sidebar for desktop, top menu for mobile/tablet */}
      <aside
        className={classNames(
          "bg-green-700 text-white flex flex-col py-8 px-4 md:py-8 md:px-4 md:static md:w-auto md:h-auto z-20",
          "transition-all duration-200",
          "md:min-h-screen",
          "md:w-64",
          // Mobile styles
          "fixed top-0 left-0 w-full md:relative md:top-auto md:left-auto",
          {
            block: menuOpen,
            hidden: !menuOpen,
            "md:block": true,
          }
        )}
        style={{
          // Only overlay on mobile/tablet
          height: menuOpen ? "100vh" : "auto",
        }}
      >
        {/* Hide logo on mobile, show on desktop */}
        <div className="mb-10 items-center justify-center hidden md:flex">
          <span className="text-2xl font-bold tracking-wide">Recipe App</span>
        </div>
        <nav>
          <ul className="space-y-4 md:space-y-4 flex-col md:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    classNames(
                      navLinkClass,
                      { [activeClass]: isActive },
                      {
                        [loadingClass]: isLoading && loadingPath === link.to,
                      }
                    )
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{link.icon}</span> {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="w-full p-4 bg-gray-100 md:h-screen md:w-[calc(100%-4rem)]">
        <Outlet />
      </main>
    </div>
  );
}
