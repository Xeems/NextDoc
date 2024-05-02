/*
  Warnings:

  - You are about to drop the column `type` on the `documents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "documents" DROP COLUMN "type",
ADD COLUMN     "documentVisability" "DocumentVisability" NOT NULL DEFAULT 'private';
