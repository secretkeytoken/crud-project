import {
  Connection,
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

export const transformToVersionedTransaction = (message: string) => {
  const tx = Buffer.from(message, "base64");
  return VersionedTransaction.deserialize(tx);
};

export const truncateAddress = (address: string) => {
  return address.slice(0, 6) + "..." + address.slice(-4);
};
