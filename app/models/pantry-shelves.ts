import db from "~/db.server";

export function getAllShelves(query: String) {
  return db.pantryShelf.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      items: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });
}
