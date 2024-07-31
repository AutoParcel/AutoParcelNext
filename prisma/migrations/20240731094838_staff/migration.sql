/*
  Warnings:

  - Changed the type of `Batch` on the `ParcelReceiver` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ParcelReceiver" DROP COLUMN "Batch",
ADD COLUMN     "Batch" VARCHAR(50) NOT NULL,
ALTER COLUMN "PhoneNumber" DROP NOT NULL;
