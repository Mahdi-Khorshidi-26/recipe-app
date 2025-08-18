import { Link, Outlet } from "react-router";

export function Header() {
  return (
    <div className="grid min-h-screen grid-cols-10">
      {/* Sidebar */}
      <aside className="bg-green-700 text-white col-span-3 flex flex-col py-8 px-4">
        <div className="mb-10 flex items-center justify-center">
          <span className="text-2xl font-bold tracking-wide">Recipe App</span>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition text-lg font-medium"
              >
                <span>🏠</span> Home
              </Link>
            </li>
            <li>
              <Link
                to="/discover"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition text-lg font-medium"
              >
                <span>🔎</span> Discover
              </Link>
            </li>
            <li>
              <Link
                to="/app"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition text-lg font-medium"
              >
                <span>📱</span> App
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-green-600 transition text-lg font-medium"
              >
                <span>⚙️</span> Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="col-span-7">
        <Outlet />
      </main>
    </div>
  );
}
