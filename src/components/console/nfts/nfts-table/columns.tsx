"use client";

import { NftMetadataDbType } from "@/types/Metadata.type";
import { ColumnDef } from "@tanstack/react-table";
import NftMetadataViewModal from "../NftMetadataViewModal";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { transformIrysUrl, truncateAddress } from "@/lib/utils";
import NftAction from "../NftAction";

export const columns: ColumnDef<NftMetadataDbType>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image");
      return image ? (
        <Image
          src={transformIrysUrl(image as string)}
          width={44}
          height={44}
          alt={"nft image"}
          className="rounded-lg aspect-square object-cover"
        />
      ) : (
        <ImageIcon className="size-11 rounded-lg" />
      );
    },
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const address = row.getValue("address") as string;
      return address ? "Minted" : "Not minted";
    },
  },

  {
    accessorKey: "address",
    header: "Explorer",
    cell: ({ row }) => {
      const address = row.getValue("address") as string;
      return (
        <a
          href={`https://translator.shyft.to/address/${address}?cluster=devnet`}
          target="_blank"
        >
          {truncateAddress(address)}
        </a>
      );
    },
  },
  {
    accessorKey: "assetId",
    header: () => <div className="text-right">Asset Id</div>,
    cell: ({ row }) => {
      const assetId = row.getValue("assetId") as string;
      return <div className="flex justify-end gap-3">{assetId ?? "-"}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const address = row.getValue("address") as string;
      const id = row.getValue("id");
      return (
        <div className="flex justify-end gap-3">
          <NftMetadataViewModal id={id as string} />
          {!address ? <NftAction id={id as string} /> : null}
        </div>
      );
    },
  },
];
