"use server";
import prisma from "@/lib/db";
import { isPublicKey } from "@metaplex-foundation/umi";

export async function getCollectionByIdOrPubkey(idOrPubkey: string) {
  const isPubkey = isPublicKey(idOrPubkey);
  if (isPubkey) {
    return await prisma.collection.findFirst({
      where: {
        publickey: idOrPubkey,
      },
    });
  } else {
    return await prisma.collection.findUnique({
      where: {
        id: parseInt(idOrPubkey),
      },
    });
  }
}
