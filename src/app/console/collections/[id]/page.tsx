import { getCollectionByIdOrPubkey } from "@/components/console/collections/_actions/getCollectionByIdOrPubkey";
import HeaderPage from "@/components/layout/HeaderPage";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
type Props = {
  params: {
    id: string;
  };
};
const CollectionDetailPage: React.FC<Props> = async ({ params: { id } }) => {
  const collection = await getCollectionByIdOrPubkey(id);
  return (
    <div>
      <HeaderPage
        title={`NFTs - Collection ${collection?.name}`}
        description={
          collection?.description ?? "Create and manage your NFTs in collection"
        }
        start={
          <div className="size-14 rounded-lg shadow-lg border-lightGrey">
            {collection?.image ? (
              <Image
                src={collection.image}
                width={56}
                height={56}
                alt={"collection image"}
                className="rounded-lg w-full h-full object-cover"
              />
            ) : (
              <ImageIcon className="size-11 rounded-lg" />
            )}
          </div>
        }
      />
      <div>CollectionDetailPage {id}</div>
      <pre>{JSON.stringify(collection, null, 2)}</pre>
    </div>
  );
};

export default CollectionDetailPage;
