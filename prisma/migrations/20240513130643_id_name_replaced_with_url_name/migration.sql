/*
  Warnings:

  - You are about to drop the column `idTitle` on the `articles` table. All the data in the column will be lost.
  - You are about to drop the column `idName` on the `documents` table. All the data in the column will be lost.
  - The `documentVisability` column on the `documents` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `urlName` to the `articles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlName` to the `documents` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "visability" AS ENUM ('public', 'private');

-- AlterTable
ALTER TABLE "articles" DROP COLUMN "idTitle",
ADD COLUMN     "urlName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "documents" DROP COLUMN "idName",
ADD COLUMN     "urlName" TEXT NOT NULL,
DROP COLUMN "documentVisability",
ADD COLUMN     "documentVisability" "visability" NOT NULL DEFAULT 'private';

-- DropEnum
DROP TYPE "DocumentVisability";
