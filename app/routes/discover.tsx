import type { Route } from "./+types/discover";
import styles from "~/index.css?url";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Discover Page" },
    { name: "description", content: "Explore new content!" },
  ];
}

export const links: Route.LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

function Discover() {
  return <h1>Discover Page</h1>;
}

export default Discover;
