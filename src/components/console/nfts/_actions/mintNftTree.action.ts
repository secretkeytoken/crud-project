"use server";

import { auth } from "@/auth";
import { makeMintNftTreeInstruction } from "@/lib/contracts/agrotree.contract";
import prisma from "@/lib/db";
import { getUmiServer } from "@/lib/umi";
import { transformIrysUrl } from "@/lib/utils";
import { createGenericFileFromJson } from "@metaplex-foundation/umi";
import { redirect } from "next/navigation";

export async function mintNftTree(nftMetadataId: string) {
  const session = await auth();

  if (!session || !session.user.id) {
    redirect("/");
  }

  const creator = session.user.id.toString();

  const nftMetadata = await prisma.nftMetadata.findUnique({
    where: {
      id: nftMetadataId,
    },
    include: {
      collection: {
        select: {
          id: true,
          merkelTree: true,
          publickey: true,
        },
      },
    },
  });

  if (!nftMetadata) {
    throw new Error("NFT metadata not found");
  }

  if (!nftMetadata.collection || !nftMetadata.collection.merkelTree) {
    throw new Error("NFT collection not found or merkel tree not created");
  }

  const umi = await getUmiServer();
  const umiMetadataFile = createGenericFileFromJson({
    name: nftMetadata.name,
    symbol: "TREE",
    image: transformIrysUrl(nftMetadata.image),
    description: nftMetadata.description,
    attributes: nftMetadata.metadata,
  });
  const [umiMetadataFileUrl] = await umi.uploader.upload([umiMetadataFile]);
  const uri = transformIrysUrl(umiMetadataFileUrl);

  await prisma.nftMetadata.update({
    where: {
      id: nftMetadataId,
    },
    data: {
      uri,
    },
  });

  const { transaction } = await makeMintNftTreeInstruction({
    collectionId: nftMetadata.collectionId.toString(),
    creator,
    name: nftMetadata.name,
    symbol: "TREE",
    uri,
    merkleTree: nftMetadata.collection.merkelTree,
  });

  return {
    success: true,
    transaction,
    merkelTree: nftMetadata.collection.merkelTree,
    collection: nftMetadata.collection.publickey,
  };
}
