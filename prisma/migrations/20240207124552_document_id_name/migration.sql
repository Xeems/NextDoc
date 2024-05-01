/*
  Warnings:

  - You are about to drop the column `normalizeName` on the `documents` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idName]` on the table `documents` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idName` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "documents_normalizeName_key";

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "normalizeName",
ADD COLUMN     "idName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "documents_idName_key" ON "documents"("idName");
