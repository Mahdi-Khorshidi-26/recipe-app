import { Link, Outlet } from "react-router";
import type { Route } from "./+types/settings";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings Page" },
    { name: "description", content: "This is the Settings page." },
  ];
}

function Settings() {
  return (
    <div>
      <h1>Settings Page</h1>
      <Link to="profile">Go to profile</Link>
      <br />
      <Link to="app">Go to app</Link>
      <h2>these are the sub routes : </h2>
      <br />
      <Outlet />
    </div>
  );
}
export default Settings;
