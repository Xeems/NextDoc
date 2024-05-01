/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Document` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Document_name_key";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Document_username_key" ON "Document"("username");
