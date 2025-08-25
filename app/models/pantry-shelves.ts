import db from "~/db.server";

export async function getAllShelves(query: string) {
  // do a delay here
  // await new Promise((resolve) => setTimeout(resolve, 1000));
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
    orderBy: {
      createdAt: "desc",
    },
  });
}
