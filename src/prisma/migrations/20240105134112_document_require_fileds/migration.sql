/*
  Warnings:

  - Made the column `name` on table `Document` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Document` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Document` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_groupId_fkey";

-- AlterTable
ALTER TABLE "Document" ALTER COLUMN "groupId" DROP NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "type" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
