"use server";

import { auth } from "@/auth";
import { makeCreateCollectionInstruction } from "@/lib/contracts/agrotree.contract";
import prisma from "@/lib/db";
import { getUmiServer } from "@/lib/umi";
import { transformIrysUrl } from "@/lib/utils";
import { createGenericFileFromBrowserFile } from "@metaplex-foundation/umi";
// import { BN } from "@coral-xyz/anchor";
// import { randomBytes } from "tweetnacl";

export async function createCollection(formData: FormData) {
  const session = await auth();

  if (!session || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const creator = session.user.id.toString();

  const preCollection = await prisma.collection.create({
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      creatorId: creator,
    },
  });

  const umi = await getUmiServer();
  const image = formData.get("image") as File;
  const file = await createGenericFileFromBrowserFile(image);
  const [collectionImage] = await umi.uploader.upload([file], {
    onProgress: (percent) => {
      console.log(`${percent * 100}% uploaded...`);
    },
  });

  const imageUrl = transformIrysUrl(collectionImage);

  const uri = await umi.uploader.uploadJson({
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    website: formData.get("website") as string,
    image: imageUrl,
    attributes: [
      {
        trait_type: "Issuer",
        value: "Agrotree Ledger",
      },
      {
        trait_type: "Type",
        value: "Collection",
      },
    ],
  });
  //   const seed = new BN(randomBytes(8));
  const _uri = transformIrysUrl(uri);
  const { transaction, collectionMintAddress } =
    await makeCreateCollectionInstruction({
      collectionId: preCollection.id.toString(),
      creator,
      name: formData.get("name") as string,
      uri: _uri,
    });

  return {
    success: true,
    transaction,
    imageUrl,
    uri: _uri,
    collectionId: preCollection.id.toString(),
    collectionMintAddress,
  };
}
