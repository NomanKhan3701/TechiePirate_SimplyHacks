/*
  Warnings:

  - You are about to drop the column `ResourcePts` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `WorkPts` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "ResourcePts";
ALTER TABLE "User" DROP COLUMN "WorkPts";
ALTER TABLE "User" ADD COLUMN     "image" STRING;
ALTER TABLE "User" ADD COLUMN     "resourcePts" INT4 NOT NULL DEFAULT 0;
ALTER TABLE "User" ADD COLUMN     "workPts" INT4 NOT NULL DEFAULT 0;
