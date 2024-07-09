/*
  Warnings:

  - Made the column `vendor_id` on table `Parcel` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Parcel" DROP CONSTRAINT "Parcel_vendor_id_fkey";

-- AlterTable
ALTER TABLE "Parcel" ADD COLUMN     "Reminders" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "vendor_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Parcel" ADD CONSTRAINT "Parcel_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
