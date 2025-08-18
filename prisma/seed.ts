import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

function getShelves() {
  return [
    {
      name: "Fruits",
      items: [
        { name: "Milk", quantity: 2, unit: "liters" },
        { name: "Cheese", quantity: 1, unit: "kg" },
        { name: "Yogurt", quantity: 5, unit: "cups" },
        { name: "Butter", quantity: 250, unit: "grams" },
        { name: "Cream", quantity: 500, unit: "ml" },
      ],
    },
    {
      name: "Vegetables",
      items: [
        { name: "Carrots", quantity: 1, unit: "kg" },
        { name: "Broccoli", quantity: 500, unit: "grams" },
        { name: "Spinach", quantity: 300, unit: "grams" },
        { name: "Potatoes", quantity: 2, unit: "kg" },
        { name: "Onions", quantity: 1, unit: "kg" },
      ],
    },
    {
      name: "Dairy",
      items: [
        { name: "Milk", quantity: 2, unit: "liters" },
        { name: "Cheese", quantity: 1, unit: "kg" },
        { name: "Yogurt", quantity: 5, unit: "cups" },
        { name: "Butter", quantity: 250, unit: "grams" },
        { name: "Cream", quantity: 500, unit: "ml" },
      ],
    },
    {
      name: "Grains",
      items: [
        { name: "Rice", quantity: 1, unit: "kg" },
        { name: "Pasta", quantity: 500, unit: "grams" },
        { name: "Bread", quantity: 2, unit: "loaves" },
        { name: "Oats", quantity: 1, unit: "kg" },
        { name: "Quinoa", quantity: 500, unit: "grams" },
      ],
    },
    {
      name: "Proteins",
      items: [
        { name: "Chicken", quantity: 1, unit: "kg" },
        { name: "Beef", quantity: 500, unit: "grams" },
        { name: "Fish", quantity: 300, unit: "grams" },
        { name: "Eggs", quantity: 12, unit: "pieces" },
        { name: "Tofu", quantity: 400, unit: "grams" },
      ],
    },
  ];
}

async function seed() {
  await Promise.all(
    getShelves().map(async (shelf) => {
      await db.pantryShelf.create({
        data: {
          name: shelf.name,
          items: {
            create: shelf.items.map((item) => ({
              name: item.name,
              quantity: item.quantity,
              unit: item.unit,
            })),
          },
        },
      });
    })
  );
  await db.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  db.$disconnect();
  process.exit(1);
});
