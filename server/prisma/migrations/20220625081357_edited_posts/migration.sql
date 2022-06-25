/*
  Warnings:

  - Made the column `postsPostId` on table `postComments` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "postComments" DROP CONSTRAINT "postComments_postsPostId_fkey";

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "image" STRING;

-- AlterTable
ALTER TABLE "postComments" ALTER COLUMN "postsPostId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "postComments" ADD CONSTRAINT "postComments_postsPostId_fkey" FOREIGN KEY ("postsPostId") REFERENCES "Posts"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;
