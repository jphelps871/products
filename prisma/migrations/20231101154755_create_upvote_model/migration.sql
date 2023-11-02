/*
  Warnings:

  - You are about to drop the column `upvotes` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "upvotes";

-- CreateTable
CREATE TABLE "Upvote" (
    "userId" TEXT NOT NULL,
    "feedbackId" INTEGER NOT NULL,

    CONSTRAINT "Upvote_pkey" PRIMARY KEY ("userId","feedbackId")
);

-- CreateIndex
CREATE INDEX "Upvote_userId_idx" ON "Upvote"("userId");

-- CreateIndex
CREATE INDEX "Upvote_feedbackId_idx" ON "Upvote"("feedbackId");

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Upvote" ADD CONSTRAINT "Upvote_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;
