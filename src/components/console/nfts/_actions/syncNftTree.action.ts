"use server";

import prisma from "@/lib/db";

// https://api.shyft.to/sol/v1/nft/compressed/read_all?network=devnet&wallet_address=519YcH3xs93ny76Zzsoxp8ZF3s9fNS1BwEB33vvBxype&collection=AVhLQ69TS3JHDtZcjqEeKxbG77fmDCfs1qVMV8ew1oCc
export async function syncNftTree(id: string, tx: string) {
  const nftMetadata = await prisma.nftMetadata.findUnique({
    where: {
      id: id,
    },
    include: {
      collection: {
        select: {
          publickey: true,
        },
      },
    },
  });

  if (!nftMetadata) {
    throw new Error("NFT metadata not found");
  }

  await prisma.nftMetadata.update({
    where: {
      id: id,
    },
    data: {
      address: tx,
    },
  });

  return {
    success: true,
  };

  // console.log(
  //   `https://api.shyft.to/sol/v1/nft/compressed/read_all?network=devnet&wallet_address=${nftMetadata?.creatorId}&collection=${nftMetadata?.collection.publickey}`
  // );
  // const response = await fetch(
  //   `https://api.shyft.to/sol/v1/nft/compressed/read_all?network=devnet&wallet_address=${nftMetadata?.creatorId}&collection=${nftMetadata?.collection.publickey}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-api-key": process.env.SHYFT_API_KEY!,
  //     },
  //   }
  // ).then((res) => res.json());

  // console.log({ response });

  // if (response.success) {
  //   const nfts = response.result;

  //   if (nfts && nfts.length > 0) {
  //     const cnft = nfts.find(
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       (nft: any) => nft.metadata_uri === nftMetadata.uri
  //     );

  //     if (cnft) {
  //       await prisma.nftMetadata.update({
  //         where: {
  //           id: id,
  //         },
  //         data: {
  //           address: tx,
  //         },
  //       });
  //     }
  //   }
  // }

  // return response;
}
