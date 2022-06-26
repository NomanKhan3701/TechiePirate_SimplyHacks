/*
  Warnings:

  - Added the required column `userEmail` to the `eventComments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "eventComments" ADD COLUMN     "userEmail" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "eventComments" ADD CONSTRAINT "eventComments_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
