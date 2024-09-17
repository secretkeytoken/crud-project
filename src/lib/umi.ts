'use server';
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";

import bs58 from "bs58";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { clusterApiUrl } from "@solana/web3.js";


export async function getUmiServer() {
    let umiServer = createUmi(clusterApiUrl('devnet'), {
        commitment: "confirmed",
    })
        .use(irysUploader())

    const keypair = umiServer.eddsa.createKeypairFromSecretKey(bs58.decode(process.env.PRIVATE_KEY as string));

    const signer = createSignerFromKeypair(umiServer, keypair);
    umiServer.use(signerIdentity(signer))
    return umiServer;
}