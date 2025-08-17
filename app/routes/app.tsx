import { Link } from "react-router";
import type { Route } from "./+types/app";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "App Page" },
    { name: "description", content: "This is the app page." },
  ];
}

function App() {
  return (
    <div>
      <h1>App Page</h1>
    </div>
  );
}
export default App;
