-- AlterTable
ALTER TABLE "articles" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "articles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
