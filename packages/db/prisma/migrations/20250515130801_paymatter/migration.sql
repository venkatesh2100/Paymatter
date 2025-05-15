/*
  Warnings:

  - You are about to drop the column `Phonenumber` on the `Merchant` table. All the data in the column will be lost.
  - You are about to drop the column `Phonenumber` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phonenumber]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phonenumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phonenumber` to the `Merchant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phonenumber` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "onRampstatus" AS ENUM ('Proccesing', 'Failed', 'Success');

-- DropIndex
DROP INDEX "Merchant_Phonenumber_key";

-- DropIndex
DROP INDEX "User_Phonenumber_key";

-- AlterTable
ALTER TABLE "Merchant" DROP COLUMN "Phonenumber",
ADD COLUMN     "phonenumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Phonenumber",
ADD COLUMN     "phonenumber" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateTable
CREATE TABLE "onRamptransactions" (
    "id" SERIAL NOT NULL,
    "status" "onRampstatus" NOT NULL,
    "provider" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "onRamptransactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "locked" INTEGER NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "onRamptransactions_token_key" ON "onRamptransactions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_key" ON "Balance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_phonenumber_key" ON "Merchant"("phonenumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_phonenumber_key" ON "User"("phonenumber");

-- AddForeignKey
ALTER TABLE "onRamptransactions" ADD CONSTRAINT "onRamptransactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
