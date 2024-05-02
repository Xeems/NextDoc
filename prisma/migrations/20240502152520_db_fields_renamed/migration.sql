/*
  Warnings:

  - You are about to drop the column `userId` on the `documents` table. All the data in the column will be lost.
  - The `type` column on the `documents` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DocumentVisability" AS ENUM ('public', 'private');

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "imageLink" TEXT;

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "userId",
DROP COLUMN "type",
ADD COLUMN     "type" "DocumentVisability" NOT NULL DEFAULT 'private';

-- DropEnum
DROP TYPE "DocumentType";
