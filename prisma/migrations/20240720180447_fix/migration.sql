/*
  Warnings:

  - Made the column `OwnerID` on table `Parcel` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Parcel" DROP CONSTRAINT "Parcel_OwnerID_fkey";

-- AlterTable
ALTER TABLE "Parcel" ALTER COLUMN "OwnerID" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Parcel" ADD CONSTRAINT "Parcel_OwnerID_fkey" FOREIGN KEY ("OwnerID") REFERENCES "ParcelReciever"("OwnerID") ON DELETE RESTRICT ON UPDATE CASCADE;
