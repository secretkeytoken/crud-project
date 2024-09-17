"use client";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
// import { useWallets } from "@particle-network/connectkit";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { SolanaChain, useWallets } from "@particle-network/connectkit";
const useUmi = () => {
  const [primaryWallet] = useWallets();
  const wallet = primaryWallet.getWalletClient<SolanaChain>();
  const endpoint = useMemo(() => clusterApiUrl("devnet"), []);
  // Create Umi instance
  const umi = createUmi(endpoint, {
    commitment: "confirmed",
  })
    .use(irysUploader())
    .use(
      walletAdapterIdentity({
        publicKey: wallet.publicKey,
        signTransaction: wallet.signTransaction,
        signAllTransactions: wallet.signAllTransactions,
      })
    );

  return umi;
};

export default useUmi;
