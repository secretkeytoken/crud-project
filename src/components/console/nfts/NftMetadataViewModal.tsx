"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { TreeDeciduous, View } from "lucide-react";

import React, { useState } from "react";
import { getNftMetadata } from "./_actions/getNftMetadata.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDateToDisplay, transformIrysUrl } from "@/lib/utils";
import { NftTraitType } from "@/types/Metadata.type";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  id: string;
};
const NftMetadataViewModal: React.FC<Props> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { data: treeData } = useQuery({
    queryKey: ["get-nft-metadata", id],
    queryFn: () => getNftMetadata(id),
  });

  if (!treeData) {
    return null;
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <View className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col overflow-hidden max-w-5xl">
        <DialogHeader>
          <DialogTitle>NFT Metadata</DialogTitle>
          <DialogDescription>
            This is the metadata for the NFT.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Card className="w-full max-w-7xl mx-auto bg-lightGreen/10">
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center">
                <TreeDeciduous className="size-8 mr-2" />
                {treeData.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Image
                    src={transformIrysUrl(treeData.image)}
                    alt={treeData.name}
                    width={250}
                    height={250}
                    className="rounded-lg object-cover w-[250px] h-[250px] aspect-square max-w-full"
                  />

                  <div className="mt-4 flex items-center flex-wrap gap-2">
                    <Badge>Collection ID: {treeData.collectionId}</Badge>
                    <Badge>
                      Created: {formatDateToDisplay(treeData.createdAt)}
                    </Badge>
                  </div>
                  <p className="mt-4 text-muted-foreground text-sm">
                    {treeData.description}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Metadata</h3>
                  <ScrollArea className="h-full max-h-[500px] w-full rounded-md border p-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {(treeData.metadata as NftTraitType[]).map(
                        (item, index) => (
                          <div key={index} className="p-2 rounded border">
                            <h4 className="text-sm font-medium text-muted-foreground">
                              {item.trait_type}
                            </h4>
                            <p className="text-base">{item.value}</p>
                          </div>
                        )
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NftMetadataViewModal;
