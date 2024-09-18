"use client";
import React from "react";
import BatchUploadModal from "./BatchUploadModal";

type Props = {
  collectionId: number;
};

const CollectionActionMemu: React.FC<Props> = ({ collectionId }) => {
  return <BatchUploadModal collectionId={collectionId} />;
  // return (
  //   <DropdownMenu>
  //     <DropdownMenuTrigger asChild>
  //       <Button className="text-xs">
  //         Create NFT
  //         <ChevronDown className="ml-4 size-4" />
  //       </Button>
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent>
  //       <DropdownMenuItem>
  //         <SingleUploadModal collectionId={collectionId} />
  //       </DropdownMenuItem>
  //       <DropdownMenuItem>
  //         <BatchUploadModal collectionId={collectionId} />
  //       </DropdownMenuItem>
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // );
};

export default CollectionActionMemu;
