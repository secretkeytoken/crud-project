"use server";
import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function updateCollection(
  id: string,
  publickey: string,
  image: string,
  uri: string
) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }
  const collection = await prisma.collection.update({
    where: { id: parseInt(id) },
    data: {
      publickey,
      image,
      uri,
    },
  });
  return { status: "success", collection };
}
