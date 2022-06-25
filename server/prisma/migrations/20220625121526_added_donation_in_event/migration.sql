-- AlterTable
ALTER TABLE "Contributor" ADD COLUMN     "monetary" FLOAT8;

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "DonationAmount" FLOAT8 NOT NULL DEFAULT 0;
