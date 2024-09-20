"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, SendHorizonal, Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { mintNftTree } from "./_actions/mintNftTree.action";
import {
  SolanaChain,
  usePublicClient,
  useWallets,
} from "@particle-network/connectkit";
import { transformToVersionedTransaction } from "@/lib/utils";
import { syncNftTree } from "./_actions/syncNftTree.action";
import { useQueryClient } from "@tanstack/react-query";
type Props = {
  id: string;
};
const NftAction: React.FC<Props> = ({ id }) => {
  const queryClient = useQueryClient();
  const [primaryWallet] = useWallets();
  const publicClient = usePublicClient<SolanaChain>();

  const handleMint = async () => {
    if (!publicClient) return;

    toast.promise(
      new Promise<{
        tx: string;
        assetId?: string;
        address?: string;
        success: boolean;
      }>(async (resolve, reject) => {
        try {
          const wallet = primaryWallet.getWalletClient<SolanaChain>();
          const { transaction } = await mintNftTree(id);

          const signedTx = await wallet.signTransaction(
            transformToVersionedTransaction(transaction)
          );

          const tx = await publicClient.sendTransaction(signedTx);

          const { success } = await syncNftTree(id, tx);

          resolve({ success, tx });
        } catch (error) {
          reject(error);
          console.error("Error minting NFT", error);
        }
      }),
      {
        loading: "Minting NFT...",
        success: async ({ tx, success }) => {
          if (success) {
            await queryClient.invalidateQueries({
              queryKey: ["get-colletion-nfts"],
            });

            await queryClient.invalidateQueries({
              queryKey: ["fetch-merkel-tree-config"],
            });
            return `NFT minted successfully! tx: ${tx}`;
          }
          return "Error minting NFT";
        },
        error: "Error minting NFT",
      }
    );
  };

  const handleDelete = () => {
    toast.error(`Comming soon`);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuLabel>NFT actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleMint}>
          <SendHorizonal className="size-4 mr-2" /> Mint
        </DropdownMenuItem>
        <DropdownMenuItem className="text-rose-500" onClick={handleDelete}>
          <Trash className="size-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NftAction;
