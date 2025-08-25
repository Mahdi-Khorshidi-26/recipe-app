import { Prisma } from "@prisma/client";
import db from "~/db.server";

export async function createPantryShelf(shelfName: string) {
  try {
    return await db.pantryShelf.create({
      data: {
        name: shelfName,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        // Unique constraint failed
        throw new Error("Pantry shelf already exists");
      }
    }
    throw error;
  }
}
