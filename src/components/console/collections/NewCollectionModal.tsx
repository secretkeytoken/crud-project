import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FolderPlus } from "lucide-react";
import React, { useState } from "react";
import NewCollectionForm from "./NewCollectionForm";

const NewCollectionModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <FolderPlus className="size-4 mr-2" />
          Create new collection
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"bottom"}
        className="w-full h-screen flex flex-col overflow-hidden"
      >
        <SheetHeader>
          <SheetTitle>Enter collection information</SheetTitle>
          <SheetDescription>
            This information will be used to review your collection before
            launching, and will be used as a preview in different UI surfaces.
            You can edit it later.
          </SheetDescription>
        </SheetHeader>

        <NewCollectionForm />
      </SheetContent>
    </Sheet>
  );
};

export default NewCollectionModal;
