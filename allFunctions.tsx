import type { Route } from "./app/+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function loader({}: Route.LoaderArgs) {
  return <div>Welcome to the React Router App!</div>;
}

export function action({}: Route.ActionArgs) {
  return { message: "Action executed successfully!" };
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  return <div>Error</div>;
}

export function CatchBoundary() {
  return <div>Catch</div>;
}

export function clientLoader({}: Route.ClientLoaderArgs) {
  return <div>Client Loader</div>;
}

export function clientAction({}: Route.ClientActionArgs) {
  return { message: "Client action executed successfully!" };
}

export function links() {
  return [
    { rel: "stylesheet", href: "/styles/app.css" },
    { rel: "icon", href: "/favicon.ico" },
  ];
}

export function headers() {
  return {
    "X-Custom-Header": "CustomHeaderValue",
  };
}
