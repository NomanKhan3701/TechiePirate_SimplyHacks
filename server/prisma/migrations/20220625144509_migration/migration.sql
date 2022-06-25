/*
  Warnings:

  - You are about to drop the column `DonationAmount` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `Likes` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "DonationAmount";
ALTER TABLE "Events" ADD COLUMN     "donationAmount" FLOAT8 NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "Likes";
ALTER TABLE "Posts" ADD COLUMN     "likes" INT4 NOT NULL DEFAULT 0;
