"use client";
import { getCollection } from "@/components/console/collections/_actions/getCollection.action";
import NewCollectionModal from "@/components/console/collections/NewCollectionModal";
import HeaderPage from "@/components/layout/HeaderPage";
import NoData from "@/components/NoData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateToDisplay, getShyftTranslatorLink } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const CollectionsPage = () => {
  const router = useRouter();

  const { data: collections } = useQuery({
    queryKey: ["get-collections"],
    queryFn: () => getCollection(),
  });

  return (
    <div>
      <HeaderPage
        title="Collections"
        description="Create and manage your collections of NFTs"
        end={<NewCollectionModal />}
      />
      {collections?.length === 0 ? (
        <div className="py-10">
          <NoData />
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your collections.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] truncate">Name</TableHead>
              <TableHead>Collection ID</TableHead>
              <TableHead className="text-right">Number of NFTs</TableHead>
              <TableHead className="text-right">Creation date</TableHead>
              {/* <TableHead className="text-right"></TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections?.map((coll) => (
              <TableRow
                key={coll.publickey}
                onClick={() =>
                  router.push(`/console/collections/${coll.publickey}`)
                }
                className="cursor-pointer"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {coll.image ? (
                      <Image
                        src={coll.image}
                        width={44}
                        height={44}
                        alt={"collection image"}
                        className="rounded-lg"
                      />
                    ) : (
                      <ImageIcon className="size-11 rounded-lg" />
                    )}
                    <span className="ml-2">{coll.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {coll.publickey ? (
                    <Link
                      href={getShyftTranslatorLink(coll.publickey)}
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      className="text-lightGrey hover:underline flex items-center gap-1 "
                    >
                      {coll.publickey}
                      <ExternalLink className="size-4" />
                    </Link>
                  ) : null}
                </TableCell>
                <TableCell className="text-right">-</TableCell>
                <TableCell className="text-right">
                  {formatDateToDisplay(coll.createdAt)}
                </TableCell>
                {/* <TableCell className="text-right">
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
              </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default CollectionsPage;
