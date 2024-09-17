"use client";
import HeaderPage from "@/components/layout/HeaderPage";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImageIcon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CollectionsPage = () => {
  const router = useRouter();
  return (
    <div>
      <HeaderPage
        title="Collections"
        description="Create and manage your collections of NFTs"
      />
      <Table>
        <TableCaption>A list of your collections.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Collection ID</TableHead>
            <TableHead className="text-right">Number of NFTs</TableHead>
            <TableHead className="text-right">Creation date</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            onClick={() => router.push(`/console/collections/1`)}
            className="cursor-pointer"
          >
            <TableCell>
              <div className="flex items-center">
                <ImageIcon className="size-11" />
                <span className="ml-2">John Doe</span>
              </div>
            </TableCell>
            <TableCell>1</TableCell>
            <TableCell className="text-right">1</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell className="text-right">
              <Button
                size={"icon"}
                variant={"ghost"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  alert("Delete");
                }}
              >
                <Trash2 className="size-5 text-red-500/50" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CollectionsPage;
