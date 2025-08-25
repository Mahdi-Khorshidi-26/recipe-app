import { Prisma } from "@prisma/client";
import db from "~/db.server";

export async function deleteShelf(id: string) {
  try {
    return await db.pantryShelf.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return error.message;
      }
    }
    throw error;
  }
}
