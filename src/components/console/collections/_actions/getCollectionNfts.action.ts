"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export async function getCollectionNfts(collectionId: string) {
  const session = await auth();

  if (!session || !session.user.id) {
    redirect("/");
  }

  const creator = session.user.id.toString();
  return prisma.nftMetadata.findMany({
    where: {
      collectionId: parseInt(collectionId),
      creatorId: creator,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
}
