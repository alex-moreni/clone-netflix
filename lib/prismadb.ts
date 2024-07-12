import { PrismaClient } from "@prisma/client";

export const client = global.prismadb || new PrismaClient();
if (process.env.NODE_ENV === "production") global.prismadb = client;
