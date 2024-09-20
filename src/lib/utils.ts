import {
  Connection,
  Keypair,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const IS_PRODUCTION = process.env.NODE_ENV === "production";

export const transformIrysUrl = (url: string) => {
  return url.replace("arweave.net/", "gateway.irys.xyz/");
};

export const buildTransaction = async (
  publicClient: Connection,
  instructions: TransactionInstruction[],
  payer: PublicKey | string
) => {
  const { blockhash } = await publicClient.getLatestBlockhash({
    commitment: "finalized",
  });

  const messageV0 = new TransactionMessage({
    payerKey: new PublicKey(payer),
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();
  return new VersionedTransaction(messageV0);
};

export async function buildTransactionWithSigner(
  publicClient: Connection,
  instructions: TransactionInstruction[],
  payer: PublicKey | string,
  signers: Keypair[]
): Promise<VersionedTransaction> {
  const { blockhash } = await publicClient.getLatestBlockhash({
    commitment: "finalized",
  });

  const messageV0 = new TransactionMessage({
    payerKey: new PublicKey(payer),
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message();

  const tx = new VersionedTransaction(messageV0);

  signers.forEach((s) => tx.sign([s]));

  return tx;
}

export const transformToVersionedTransaction = (message: string) => {
  const tx = Buffer.from(message, "base64");
  return VersionedTransaction.deserialize(tx);
};

export const truncateAddress = (address: string | null) => {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export const formatDateToDisplay = (date: Date) => {
  return date.toLocaleDateString();
};

export const getExplorerLink = (address: string) => {
  return `https://explorer.solana.com/address/${address}?cluster=devnet`;
};

export const getShyftTranslatorLink = (address: string) => {
  return `https://translator.shyft.to/address/${address}?cluster=devnet`;
};

export type ValidDepthSizePair =
  | { maxDepth: 3; maxBufferSize: 8 }
  | { maxDepth: 5; maxBufferSize: 8 }
  | { maxDepth: 14; maxBufferSize: 64 }
  | { maxDepth: 14; maxBufferSize: 256 }
  | { maxDepth: 14; maxBufferSize: 1024 }
  | { maxDepth: 14; maxBufferSize: 2048 }
  | { maxDepth: 15; maxBufferSize: 64 }
  | { maxDepth: 16; maxBufferSize: 64 }
  | { maxDepth: 17; maxBufferSize: 64 }
  | { maxDepth: 18; maxBufferSize: 64 }
  | { maxDepth: 19; maxBufferSize: 64 }
  | { maxDepth: 20; maxBufferSize: 64 }
  | { maxDepth: 20; maxBufferSize: 256 }
  | { maxDepth: 20; maxBufferSize: 1024 }
  | { maxDepth: 20; maxBufferSize: 2048 }
  | { maxDepth: 24; maxBufferSize: 64 }
  | { maxDepth: 24; maxBufferSize: 256 }
  | { maxDepth: 24; maxBufferSize: 512 }
  | { maxDepth: 24; maxBufferSize: 1024 }
  | { maxDepth: 24; maxBufferSize: 2048 }
  | { maxDepth: 26; maxBufferSize: 512 }
  | { maxDepth: 26; maxBufferSize: 1024 }
  | { maxDepth: 26; maxBufferSize: 2048 }
  | { maxDepth: 30; maxBufferSize: 512 }
  | { maxDepth: 30; maxBufferSize: 1024 }
  | { maxDepth: 30; maxBufferSize: 2048 };

const allPairs: number[][] = [
  [3, 8],
  [5, 8],
  [14, 64],
  [14, 256],
  [14, 1024],
  [14, 2048],
  [15, 64],
  [16, 64],
  [17, 64],
  [18, 64],
  [19, 64],
  [20, 64],
  [20, 256],
  [20, 1024],
  [20, 2048],
  [24, 64],
  [24, 256],
  [24, 512],
  [24, 1024],
  [24, 2048],
  [26, 512],
  [26, 1024],
  [26, 2048],
  [30, 512],
  [30, 1024],
  [30, 2048],
];

export const ALL_DEPTH_SIZE_PAIRS: ValidDepthSizePair[] = allPairs.map(
  (pair) => {
    return {
      maxDepth: pair[0],
      maxBufferSize: pair[1],
    } as ValidDepthSizePair;
  }
);

const allDepthSizes = ALL_DEPTH_SIZE_PAIRS.flatMap(
  (pair) => pair.maxDepth
).filter((item, pos, self) => self.indexOf(item) == pos);

const defaultDepthPair = {
  maxDepth: 3,
  maxBufferSize: 8,
};

export const getTreeOptions = (treeNodes: number) => {
  let maxDepth = defaultDepthPair.maxDepth;

  if (treeNodes <= 0)
    return {
      maxDepth,
      maxBufferSize: defaultDepthPair.maxBufferSize,
      canopyDepth: 0,
    };

  for (let i = 0; i <= allDepthSizes.length; i++) {
    if (Math.pow(2, allDepthSizes[i]) >= treeNodes) {
      maxDepth = allDepthSizes[i];
      break;
    }
  }

  const maxBufferSize =
    ALL_DEPTH_SIZE_PAIRS.filter((pair) => pair.maxDepth == maxDepth)?.[0]
      ?.maxBufferSize ?? defaultDepthPair.maxBufferSize;

  const maxCanopyDepth = maxDepth >= 20 ? 17 : maxDepth;

  return {
    maxDepth,
    maxBufferSize,
    canopyDepth: maxCanopyDepth - 3 >= 0 ? maxCanopyDepth - 3 : 0,
  };
};

import Papa from "papaparse";
import { NftMetadataType } from "@/types/Metadata.type";

export const convertMetadataToJson = async (
  metadataFile: File,
  header = false
) => {
  const metadataContent = await metadataFile.text();
  const { data: metadataJson } = Papa.parse<NftMetadataType>(metadataContent, {
    skipEmptyLines: true,
    header,
  });

  return metadataJson;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const checkIfMetadataValid = async (
  metadataFile: File,
  mediaFiles: FileList
) => {
  const metadataJson = await convertMetadataToJson(metadataFile, true);

  const metadataLeng = metadataJson.length;
  const mediaFilesLeng = mediaFiles.length;

  if (metadataLeng !== mediaFilesLeng) {
    return "Metadata and media files count mismatch.";
  }

  // Check if media files include all the files mentioned in column 'image' of metadata
  const mediaFileNames = Array.from(mediaFiles).map((file) => file.name);
  const metadataFileNames = metadataJson.map((item) => item.image);

  for (const metadataFileName of metadataFileNames) {
    if (!mediaFileNames.includes(metadataFileName)) {
      return `Metadata file and media file mismatch. ${metadataFileName} not found in media files.`;
    }
  }

  if (metadataLeng === 0) {
    return "No metadata files found.";
  }

  if (mediaFilesLeng === 0) {
    return "No media files found.";
  }

  return null;
};

export const convertToNftMetadataJson = async (metadataFile: File) => {
  const metadataJson = await convertMetadataToJson(metadataFile, true);

  const traitTypeKeys = Object.keys(metadataJson[0]);

  return metadataJson.map((item) => {
    return {
      name: item.name,
      description: item.description,
      image: item.image,
      attributes: traitTypeKeys
        .filter((t) => ["name", "description", "image"].indexOf(t) === -1)
        .map((traitType) => {
          return {
            trait_type: traitType,
            value: item[traitType],
          };
        }),
    };
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toObject(data: any) {
  return JSON.parse(
    JSON.stringify(
      data,
      (key, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
    )
  );
}
