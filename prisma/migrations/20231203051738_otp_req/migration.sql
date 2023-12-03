/*
  Warnings:

  - Made the column `otp` on table `Parcel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Parcel" ALTER COLUMN "otp" SET NOT NULL;
