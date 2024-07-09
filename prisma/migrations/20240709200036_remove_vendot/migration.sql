/*
  Warnings:

  - You are about to drop the column `vendor_id` on the `Parcel` table. All the data in the column will be lost.
  - You are about to drop the `Vendor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ParcelCompany` to the `Parcel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Parcel" DROP CONSTRAINT "Parcel_vendor_id_fkey";

-- AlterTable
ALTER TABLE "Parcel" DROP COLUMN "vendor_id",
ADD COLUMN     "ParcelCompany" TEXT NOT NULL;

-- DropTable
DROP TABLE "Vendor";
