-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Users" (
    "UserID" SERIAL NOT NULL,
    "Username" TEXT NOT NULL,
    "Password" VARCHAR(20) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("UserID")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Username_key" ON "Users"("Username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_Password_key" ON "Users"("Password");
