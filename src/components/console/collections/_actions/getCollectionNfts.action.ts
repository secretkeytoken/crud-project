"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function getCollectionNfts(collectionId: string) {
  const session = await auth();

  if (!session || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const creator = session.user.id.toString();
  return prisma.nftMetadata.findMany({
    where: {
      collectionId: parseInt(collectionId),
      creatorId: creator,
    },
  });
}
