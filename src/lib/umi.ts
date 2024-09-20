"use server";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { bundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr";
import bs58 from "bs58";
import {
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { dasApi } from "@metaplex-foundation/digital-asset-standard-api";
import { mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";

// Monkey patch the Connection prototype
Connection.prototype.getRecentBlockhash = async function (commitment) {
  try {
    const { blockhash } = await this.getLatestBlockhash(commitment);
    const recentPrioritizationFees = await this.getRecentPrioritizationFees();
    const averageFee =
      recentPrioritizationFees.length > 0
        ? recentPrioritizationFees.reduce(
            (sum, fee) => sum + fee.prioritizationFee,
            0
          ) / recentPrioritizationFees.length
        : 5000;

    return {
      blockhash,
      feeCalculator: {
        lamportsPerSignature: averageFee,
      },
    };
  } catch (e) {
    throw new Error("failed to get recent blockhash: " + e);
  }
};
export async function getUmiServer() {
  const umiServer = createUmi(clusterApiUrl("devnet"), {
    commitment: "confirmed",
  })
    .use(mplBubblegum())
    .use(bundlrUploader())
    .use(dasApi());

  const keypair = umiServer.eddsa.createKeypairFromSecretKey(
    bs58.decode(process.env.PRIVATE_KEY as string)
  );

  const signer = createSignerFromKeypair(umiServer, keypair);
  umiServer.use(signerIdentity(signer));
  return umiServer;
}
