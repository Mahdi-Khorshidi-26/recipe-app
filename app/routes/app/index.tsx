import { redirect } from "react-router";

export function loader() {
  //   return new Response(null, {
  //     status: 302,
  //     headers: {
  //       Location: "/app/pantry",
  //     },
  //   });

  return redirect("/app/pantry");
}
