/*
  Warnings:

  - You are about to drop the column `postsPostId` on the `Comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postsPostId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "postsPostId";
ALTER TABLE "Comments" ADD COLUMN     "PostId" INT4;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_PostId_fkey" FOREIGN KEY ("PostId") REFERENCES "Posts"("postId") ON DELETE SET NULL ON UPDATE CASCADE;
