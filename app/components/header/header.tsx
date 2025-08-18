import { NavLink, Outlet, useNavigation } from "react-router";
import classNames from "classnames";

export function Header() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const loadingPath = navigation.location?.pathname;

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
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="bg-green-700 text-white col-span-1 flex flex-col py-8 px-4">
        <div className="mb-10 flex items-center justify-center">
          <span className="text-2xl font-bold tracking-wide">Recipe App</span>
        </div>
        <nav>
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    classNames(
                      navLinkClass,
                      { [activeClass]: isActive },
                      {
                        [loadingClass]:
                          isLoading && loadingPath === link.to,
                      }
                    )
                  }
                >
                  <span>{link.icon}</span> {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="w-full p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
