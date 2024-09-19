"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileStack } from "lucide-react";
import React, { useState } from "react";
import BatchUploadForm from "./BatchUploadForm";
type Props = {
  collectionId: number;
};
const BatchUploadModal: React.FC<Props> = ({ collectionId }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FileStack className="size-4 mr-2" />
          Batch upload
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col overflow-hidden max-w-3xl">
        <DialogHeader>
          <DialogTitle>Preparing your NFTs for batch upload</DialogTitle>
          <DialogDescription>
            Before you upload your assets, you need to prepare them first. You
            can upload up to 1,000 NFT collectibles at once.{" "}
            <a
              href="/assets/example/metadata-example.zip"
              download
              className="text-lightGreen underline"
            >
              Download our example file
            </a>{" "}
            to use it as a template and follow the next steps for the upload to
            be successful.
          </DialogDescription>
        </DialogHeader>
        <BatchUploadForm
          collectionId={collectionId}
          callbackFn={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BatchUploadModal;
