-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- AlterTable
ALTER TABLE "GalleryItem" ADD COLUMN     "type" "MediaType" NOT NULL DEFAULT 'IMAGE';
