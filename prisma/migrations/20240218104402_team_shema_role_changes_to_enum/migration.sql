/*
  Warnings:

  - Added the required column `role` to the `userTeams` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TeamRole" AS ENUM ('OWNER', 'ADMIN', 'BASE');

-- AlterTable
ALTER TABLE "userTeams" DROP COLUMN "role",
ADD COLUMN     "role" "TeamRole" NOT NULL;
