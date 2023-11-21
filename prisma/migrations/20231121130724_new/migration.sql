/*
  Warnings:

  - The primary key for the `Parcel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `comment` on the `Parcel` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Parcel` table. All the data in the column will be lost.
  - You are about to drop the column `pID` on the `Parcel` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Parcel` table. All the data in the column will be lost.
  - You are about to drop the column `student_id` on the `Parcel` table. All the data in the column will be lost.
  - You are about to drop the column `student_name` on the `Parcel` table. All the data in the column will be lost.
  - You are about to drop the column `vendor_name` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `OwnerName` to the `Parcel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ParcelID` to the `Parcel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ParcelNumber` to the `Parcel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ReceivedAt` to the `Parcel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ParcelCompany` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Batch" ADD VALUE 'STAFF';

-- DropForeignKey
ALTER TABLE "Parcel" DROP CONSTRAINT "Parcel_student_id_fkey";

-- AlterTable
ALTER TABLE "Parcel" DROP CONSTRAINT "Parcel_pkey",
DROP COLUMN "comment",
DROP COLUMN "createdAt",
DROP COLUMN "pID",
DROP COLUMN "status",
DROP COLUMN "student_id",
DROP COLUMN "student_name",
ADD COLUMN     "Comment" TEXT,
ADD COLUMN     "OwnerID" TEXT,
ADD COLUMN     "OwnerName" VARCHAR(50) NOT NULL,
ADD COLUMN     "ParcelID" TEXT NOT NULL,
ADD COLUMN     "ParcelNumber" VARCHAR(30) NOT NULL,
ADD COLUMN     "ReceivedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "Shelf" TEXT,
ADD COLUMN     "Status" "Status" NOT NULL DEFAULT 'NC',
ADD CONSTRAINT "Parcel_pkey" PRIMARY KEY ("ParcelID");

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "vendor_name",
ADD COLUMN     "ParcelCompany" VARCHAR(30) NOT NULL;

-- DropTable
DROP TABLE "Student";

-- CreateTable
CREATE TABLE "ParcelReciever" (
    "OwnerID" VARCHAR(15) NOT NULL,
    "OwnerName" VARCHAR(50) NOT NULL,
    "Batch" "Batch" NOT NULL,
    "PhoneNumber" VARCHAR(14) NOT NULL,
    "Email" TEXT NOT NULL,
    "RoomNumber" VARCHAR(4),

    CONSTRAINT "ParcelReciever_pkey" PRIMARY KEY ("OwnerID")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParcelReciever_PhoneNumber_key" ON "ParcelReciever"("PhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ParcelReciever_Email_key" ON "ParcelReciever"("Email");

-- AddForeignKey
ALTER TABLE "Parcel" ADD CONSTRAINT "Parcel_OwnerID_fkey" FOREIGN KEY ("OwnerID") REFERENCES "ParcelReciever"("OwnerID") ON DELETE SET NULL ON UPDATE CASCADE;
