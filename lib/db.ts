import { Prisma, PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Next.js's hot reload doesn't impact globalThis
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

export type UserInSidebar = { stream: { isLive: boolean } | null } & Prisma.UserCreateManyInput;
export type Stream = Prisma.StreamCreateInput;