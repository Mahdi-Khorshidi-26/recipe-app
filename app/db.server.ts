import { PrismaClient } from "@prisma/client";

interface customNodeJSGlobal {
  db: PrismaClient;
}

declare const global: customNodeJSGlobal;

const db = global.db || new PrismaClient();

if (process.env.NODE_ENV === "development") {
  global.db = db;
}
export default db;
