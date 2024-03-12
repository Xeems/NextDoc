/*
  Warnings:

  - A unique constraint covering the columns `[normalizeName]` on the table `documents` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalizeName` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "normalizeName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "documents_normalizeName_key" ON "documents"("normalizeName");
