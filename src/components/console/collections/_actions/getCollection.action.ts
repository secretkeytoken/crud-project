"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function getCollection() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const user = session.user;

  return await prisma.collection.findMany({
    where: {
      creatorId: user.id,
      publickey: {
        not: null,
      },
    },
    include: {
      NftMetadata: {
        select: {
          id: true,
        },
      },
    },
  });
}
