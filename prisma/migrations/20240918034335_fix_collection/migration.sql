-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "publickey" TEXT,
ALTER COLUMN "image" DROP NOT NULL;
