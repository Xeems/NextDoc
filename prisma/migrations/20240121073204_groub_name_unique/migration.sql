/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `groups` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `groups` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "groups" ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "groups_name_key" ON "groups"("name");
