import db from "~/db.server";

export function updateShelfName(shelfId: string, shelfName: string) {
  return db.pantryShelf.update({
    where: { id: shelfId },
    data: { name: shelfName },
  });
}
