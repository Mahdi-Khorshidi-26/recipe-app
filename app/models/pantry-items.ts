import db from "~/db.server";

export function getPantryItems() {
  return db.pantryItem.findMany({
    include: {
      shelf: true,
    },
  });
}
