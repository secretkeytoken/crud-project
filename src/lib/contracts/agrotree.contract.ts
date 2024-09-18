import { Program, BN } from "@coral-xyz/anchor";
import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
} from "@solana/web3.js";
import appConfig from "../config";
import idl from "./agrotree_manager.json";
import { AgrotreeManager } from "./agrotree_manager";
import {
  MakeCreateCollectionInstructionInput,
  MakeCreateMerkelTreeInstructionInput,
} from "@/types/Collection.type";
import { TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";
import {
  EDITION_SEED,
  METADATA_SEED,
  TOKEN_METADATA_PROGRAM_ID,
} from "../constants";
import {
  buildTransaction,
  buildTransactionWithSigner,
  getTreeOptions,
} from "../utils";

import {
  getMerkleTreeSize,
  SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
} from "@metaplex-foundation/mpl-bubblegum";

export function getAgrotreeProgram() {
  const connection = new Connection(appConfig.endpointRpc, "confirmed");

  const program = new Program(idl as AgrotreeManager, { connection });

  return { program, connection };
}

export async function makeCreateMerkelTreeInstruction(
  input: MakeCreateMerkelTreeInstructionInput
) {
  const { program, connection } = getAgrotreeProgram();
  const { collectionId, creator, numOfNodes } = input;

  const merkleTree = Keypair.generate();
  const treeOptions = getTreeOptions(numOfNodes ?? 0);
  const merkleTreeSize = getMerkleTreeSize(
    treeOptions.maxDepth,
    treeOptions.maxBufferSize,
    treeOptions.canopyDepth
  );

  console.log("merkleTreeSize", merkleTreeSize);
  const lamports = await connection.getMinimumBalanceForRentExemption(
    merkleTreeSize
  );
  console.log("lamports", lamports);

  const initTreeInstruction = SystemProgram.createAccount({
    fromPubkey: new PublicKey(creator),
    newAccountPubkey: merkleTree.publicKey,
    lamports,
    space: merkleTreeSize,
    programId: new PublicKey(SPL_ACCOUNT_COMPRESSION_PROGRAM_ID),
  });

  const instruction = await program.methods
    .createTree(
      new BN(collectionId),
      treeOptions.maxDepth,
      treeOptions.maxBufferSize
    )
    .accounts({
      merkleTree: merkleTree.publicKey,
      payer: new PublicKey(creator),
    })
    // .preInstructions([
    //   ComputeBudgetProgram.setComputeUnitLimit({ units: 10_000_000 }),
    //   initTreeInstruction,
    // ])
    .instruction();

  const transaction = await buildTransactionWithSigner(
    connection,
    [initTreeInstruction, instruction],
    creator,
    [merkleTree]
  );
  // transaction.sign([merkleTree]);
  const result = Buffer.from(transaction.serialize()).toString("base64");

  return {
    transaction: result,
    collectionId: collectionId,
    merkleTreeAddress: merkleTree.publicKey.toString(),
  };
}

export async function makeCreateCollectionInstruction(
  input: MakeCreateCollectionInstructionInput
) {
  const { program, connection } = getAgrotreeProgram();
  const { collectionId, name, uri, creator } = input;
  const cid = new BN(collectionId);
  const collectionAddress = getCollectionAddress(program.programId, cid);
  const collectionMintAddress = getCollectionMintAddress(
    program.programId,
    collectionAddress
  );
  const { masterEdition, tokenMetadata } = getCollectionMintMetaAccount(
    collectionMintAddress
  );

  const instruction = await program.methods
    .createCollection(new BN(collectionId), name, "COLE", uri)
    .accounts({
      creator: new PublicKey(creator),
      tokenProgram: TOKEN_PROGRAM_ID,
      collectionEdition: masterEdition,
      collectionMetadata: tokenMetadata,
    })
    .preInstructions([
      ComputeBudgetProgram.setComputeUnitLimit({ units: 500_000 }),
    ])
    .instruction();
  const transaction = await buildTransaction(
    connection,
    [instruction],
    creator
  );

  const result = Buffer.from(transaction.serialize()).toString("base64");

  return {
    transaction: result,
    collectionId: collectionId,
    collectionMintAddress: collectionMintAddress.toString(),
  };
}

export const getConfigAddress = (programId: PublicKey) =>
  PublicKey.findProgramAddressSync([Buffer.from("agro-config")], programId);

export const getCollectionAddress = (programId: PublicKey, id: BN) =>
  PublicKey.findProgramAddressSync(
    [Buffer.from("collection"), id.toArrayLike(Buffer, "le", 8)],
    programId
  )[0];

export const getCollectionMintAddress = (
  programId: PublicKey,
  collection: PublicKey
) =>
  PublicKey.findProgramAddressSync(
    [Buffer.from("collection-mint"), collection.toBuffer()],
    programId
  )[0];

export const getCollectionMintMetaAccount = (collectionMint: PublicKey) => {
  const [tokenMetadata] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(METADATA_SEED),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      collectionMint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  const [masterEdition] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(METADATA_SEED),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      collectionMint.toBuffer(),
      Buffer.from(EDITION_SEED),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );

  return { collectionMint, tokenMetadata, masterEdition };
};
