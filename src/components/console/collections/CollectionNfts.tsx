"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCollectionNfts } from "./_actions/getCollectionNfts.action";
import { DataTable } from "../nfts/nfts-table/data-table";
import { columns } from "../nfts/nfts-table/columns";
type Props = {
  collectionId: string;
};
const CollectionNfts: React.FC<Props> = ({ collectionId }) => {
  const { data } = useQuery({
    queryKey: ["get-colletion-nfts", collectionId],
    queryFn: () => getCollectionNfts(collectionId),
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CollectionNfts;
