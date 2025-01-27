"use server";

import { auth } from "@/auth";
import {
  getAgrotreeProgram,
  getCollectionAddress,
  getMTreeAddress,
} from "@/lib/contracts/agrotree.contract";
import prisma from "@/lib/db";
import { BN } from "@coral-xyz/anchor";
import { publicKey } from "@metaplex-foundation/umi";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function syncMerkelTreeToCollection(collectionId: string) {
  const session = await auth();

  if (!session || !session.user.id) {
    redirect("/");
  }

  const currentCollection = await prisma.collection.findUnique({
    where: {
      id: parseInt(collectionId),
    },
  });

  if (!currentCollection) {
    throw new Error("Collection not found");
  }

  const collectionAddress = getCollectionAddress(new BN(collectionId));

  if (!currentCollection.merkelTree) {
    const { program } = getAgrotreeProgram();

    const mTreeAddress = getMTreeAddress(collectionAddress).toString();

    try {
      const mTreeAccount = await program.account.mTree.fetch(
        publicKey(mTreeAddress)
      );

      if (!collectionAddress.equals(mTreeAccount.collection)) {
        throw new Error("Invalid Merkel Tree");
      }

      const merkelTree = mTreeAccount.merkleTree;
      const creator = session.user.id.toString();

      await prisma.collection.update({
        where: {
          id: parseInt(collectionId),
          creatorId: creator,
        },
        data: {
          merkelTree: merkelTree?.toString(),
        },
      });
    } catch (error) {}
  }

  revalidatePath(`/console/collections/[slug]`);

  return {
    status: "success",
  };
}
