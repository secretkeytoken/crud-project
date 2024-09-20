"use server";

import { auth } from "@/auth";
import { makeCreateMerkelTreeInstruction } from "@/lib/contracts/agrotree.contract";
import { redirect } from "next/navigation";

export async function createMerkelTree(
  collectionId: string,
  numOfNodes: number
) {
  const session = await auth();

  if (!session || !session.user.id) {
    redirect("/");
  }

  const creator = session.user.id.toString();

  const { transaction, merkleTreeAddress } =
    await makeCreateMerkelTreeInstruction({
      collectionId,
      creator,
      numOfNodes,
    });

  return {
    success: true,
    transaction,
    collectionId,
    merkleTreeAddress,
  };
}
