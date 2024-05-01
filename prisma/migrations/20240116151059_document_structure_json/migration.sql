/*
  Warnings:

  - The `type` column on the `Document` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('public', 'private');

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "documentStructure" JSONB NOT NULL DEFAULT '{}',
DROP COLUMN "type",
ADD COLUMN     "type" "DocumentType" NOT NULL DEFAULT 'private';
