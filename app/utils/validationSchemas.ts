import z from "zod";

export const saveShelfNameSchema = z.object({
  shelfId: z.string(),
  shelfName: z.string().min(1, "Shelf name cannot be blank").max(100),
});

export const createShelfSchema = z.object({
  shelfName: z.string().min(1).max(100),
});

export const deleteShelfSchema = z.object({
  shelfId: z.string(),
});
