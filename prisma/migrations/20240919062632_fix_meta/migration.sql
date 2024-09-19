-- AlterTable
ALTER TABLE "NftMetadata" ADD COLUMN     "address" TEXT,
ADD COLUMN     "assetId" TEXT,
ADD COLUMN     "minted" BOOLEAN NOT NULL DEFAULT false;
