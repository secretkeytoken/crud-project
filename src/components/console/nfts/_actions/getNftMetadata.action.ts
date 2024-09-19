"use server";

import prisma from "@/lib/db";

export async function getNftMetadata(id: string) {
  return prisma.nftMetadata.findUnique({
    where: {
      id,
    },
  });
}
