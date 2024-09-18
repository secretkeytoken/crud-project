import { PublicKey } from "@solana/web3.js";

export type MakeCreateCollectionInstructionInput = {
  creator: PublicKey | string;
  collectionId: string;
  name: string;
  description?: string;
  uri: string;
};

export type MakeCreateMerkelTreeInstructionInput = {
  creator: PublicKey | string;
  collectionId: string;
  numOfNodes: number;
};
