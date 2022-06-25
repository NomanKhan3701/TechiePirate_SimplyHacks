/*
  Warnings:

  - You are about to drop the column `Image` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "Image";
ALTER TABLE "Events" ADD COLUMN     "image" STRING;
