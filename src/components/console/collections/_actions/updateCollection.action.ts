"use server";
import prisma from "@/lib/db";

export async function updateCollection(
  id: string,
  publickey: string,
  image: string,
  uri: string
) {
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
