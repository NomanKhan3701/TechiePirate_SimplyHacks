/*
  Warnings:

  - You are about to drop the column `partId` on the `Events` table. All the data in the column will be lost.
  - Added the required column `eventsEventId` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Events" DROP CONSTRAINT "Events_partId_fkey";

-- AlterTable
ALTER TABLE "Events" DROP COLUMN "partId";

-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "eventsEventId" INT4 NOT NULL;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_eventsEventId_fkey" FOREIGN KEY ("eventsEventId") REFERENCES "Events"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;
