import { Await, Link, Outlet, useLoaderData } from "react-router";
import type { Route } from "./+types/settings";
import React from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Settings Page" },
    { name: "description", content: "This is the Settings page." },
  ];
}

export async function loader() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { message: "Settings loaded successfully!" };
}

function Settings() {
  const data = useLoaderData();
  return (
    <div>
      <h1>Settings Page</h1>
      <Link to="profile">Go to profile</Link>
      <br />
      <Link to="app">Go to app</Link>
      <br />
      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={data.message}>
          {(value) => (
            <div>
              <p>{value}</p>
            </div>
          )}
        </Await>
      </React.Suspense>
      <br />
      <Outlet />
    </div>
  );
}
export default Settings;
