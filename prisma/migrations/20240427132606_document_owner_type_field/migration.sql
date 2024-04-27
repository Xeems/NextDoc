-- CreateEnum
CREATE TYPE "DocumentOwnerType" AS ENUM ('USER', 'TEAM');

-- AlterTable
ALTER TABLE "articles" ALTER COLUMN "content" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "documentOwnerType" "DocumentOwnerType" NOT NULL DEFAULT 'USER';
