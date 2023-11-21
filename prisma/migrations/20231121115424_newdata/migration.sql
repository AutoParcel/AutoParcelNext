-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Batch" AS ENUM ('UG21', 'UG22', 'UG23', 'TLP23');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('C', 'NC');

-- CreateTable
CREATE TABLE "Student" (
    "student_id" VARCHAR(15) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "batch" "Batch" NOT NULL,
    "ph_number" VARCHAR(14) NOT NULL,
    "email" TEXT NOT NULL,
    "room_number" VARCHAR(4),

    CONSTRAINT "Student_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "Vendor" (
    "vendor_id" SERIAL NOT NULL,
    "vendor_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("vendor_id")
);

-- CreateTable
CREATE TABLE "Parcel" (
    "pID" TEXT NOT NULL,
    "vendor_id" INTEGER,
    "student_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'NC',
    "comment" TEXT NOT NULL,

    CONSTRAINT "Parcel_pkey" PRIMARY KEY ("pID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_ph_number_key" ON "Student"("ph_number");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "Parcel" ADD CONSTRAINT "Parcel_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "Vendor"("vendor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parcel" ADD CONSTRAINT "Parcel_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE RESTRICT ON UPDATE CASCADE;
