-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_categoryId_fkey";

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
