/*
  Warnings:

  - You are about to drop the `ParcelReciever` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Parcel" DROP CONSTRAINT "Parcel_OwnerID_fkey";

-- DropTable
DROP TABLE "ParcelReciever";

-- CreateTable
CREATE TABLE "ParcelReceiver" (
    "OwnerID" VARCHAR(15) NOT NULL,
    "OwnerName" VARCHAR(50) NOT NULL,
    "Batch" "Batch" NOT NULL,
    "PhoneNumber" VARCHAR(14) NOT NULL,
    "Email" TEXT NOT NULL,
    "RoomNumber" VARCHAR(50),

    CONSTRAINT "ParcelReceiver_pkey" PRIMARY KEY ("OwnerID")
);

-- CreateIndex
CREATE UNIQUE INDEX "ParcelReceiver_PhoneNumber_key" ON "ParcelReceiver"("PhoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ParcelReceiver_Email_key" ON "ParcelReceiver"("Email");

-- AddForeignKey
ALTER TABLE "Parcel" ADD CONSTRAINT "Parcel_OwnerID_fkey" FOREIGN KEY ("OwnerID") REFERENCES "ParcelReceiver"("OwnerID") ON DELETE RESTRICT ON UPDATE CASCADE;
