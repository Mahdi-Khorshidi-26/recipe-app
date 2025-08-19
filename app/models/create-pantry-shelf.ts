import db from "~/db.server";

export function createPantryShelf(shelfName: string = "New Shelf") {
  return db.pantryShelf.create({
    data: {
      name: shelfName,
    },
  });
}
