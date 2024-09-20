"use server";

import prisma from "@/lib/db";
import { getUmiServer } from "@/lib/umi";
import { BN } from "@coral-xyz/anchor";
import { findLeafAssetIdPda } from "@metaplex-foundation/mpl-bubblegum";
import { publicKey } from "@metaplex-foundation/umi";

// sync assetId and address of NFT metadata
export async function syncNftTree(id: string, tx?: string) {
  const nftMetadata = await prisma.nftMetadata.findUnique({
    where: {
      id: id,
    },
    include: {
      collection: {
        select: {
          publickey: true,
          merkelTree: true,
        },
      },
    },
  });

  if (!nftMetadata) {
    throw new Error("NFT metadata not found");
  }

  const umi = await getUmiServer();

  const { _max: currentNft } = await prisma.nftMetadata.aggregate({
    // by: ["collectionId"],
    where: {
      collectionId: nftMetadata.collectionId,
      address: {
        not: null,
      },
      assetId: {
        not: null,
      },
    },
    _max: {
      assetId: true,
    },
  });

  const nextAssetIndex = new BN(currentNft.assetId || 0).add(new BN(1));
  const assetIndex = BigInt(nextAssetIndex.toString());

  const [address] = findLeafAssetIdPda(umi, {
    merkleTree: publicKey(nftMetadata.collection.merkelTree as string),
    leafIndex: assetIndex,
  });

  // console.log("syncNftTree", {
  //   id,
  //   assetIndex,
  //   address: address.toString(),
  // });

  await prisma.nftMetadata.update({
    where: {
      id: id,
    },
    data: {
      assetId: assetIndex.toString(),
      address,
      tx,
    },
  });

  return {
    assetId: assetIndex.toString(),
    address,
    success: true,
  };
}
