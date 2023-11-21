/*
  Warnings:

  - Added the required column `student_name` to the `Parcel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Parcel" DROP CONSTRAINT "Parcel_student_id_fkey";

-- AlterTable
ALTER TABLE "Parcel" ADD COLUMN     "student_name" VARCHAR(50) NOT NULL,
ALTER COLUMN "student_id" DROP NOT NULL,
ALTER COLUMN "comment" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Parcel" ADD CONSTRAINT "Parcel_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("student_id") ON DELETE SET NULL ON UPDATE CASCADE;
