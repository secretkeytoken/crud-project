"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function getCollection() {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  return await prisma.collection.findMany({
    where: {
      creatorId: user.id,
      publickey: {
        not: null,
      },
    },
  });
}
