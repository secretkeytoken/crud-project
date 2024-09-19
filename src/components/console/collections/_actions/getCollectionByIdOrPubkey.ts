"use server";
import prisma from "@/lib/db";
import { isPublicKey } from "@metaplex-foundation/umi";
import { syncMerkelTreeToCollection } from "./syncMerkelTreeToCollection.action";

export async function getCollectionByIdOrPubkey(idOrPubkey: string) {
  const isPubkey = isPublicKey(idOrPubkey);

  let collection;

  if (isPubkey) {
    collection = await prisma.collection.findFirst({
      where: {
        publickey: idOrPubkey,
      },
    });
  } else {
    collection = await prisma.collection.findFirst({
      where: {
        id: { equals: parseInt(idOrPubkey) },
      },
    });
  }

  if (!collection) {
    return null;
  }

  if (!collection.merkelTree) {
    await syncMerkelTreeToCollection(collection.id.toString());
  }
  return prisma.collection.findUnique({
    where: {
      id: collection.id,
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
