-- CreateEnum
CREATE TYPE "public"."Auth_type" AS ENUM ('GOOGLE', 'GITHUB');

-- CreateEnum
CREATE TYPE "public"."onRampstatus" AS ENUM ('Processing', 'Failed', 'Success');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "age" INTEGER,
    "location" TEXT,
    "gender" "public"."Gender",
    "image" TEXT,
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "publicKey" TEXT NOT NULL,
    "streakCount" INTEGER DEFAULT 0,
    "lastStreakDate" TIMESTAMP(3),
    "longestStreak" INTEGER DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Merchant" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "Auth_type" "public"."Auth_type" NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."onRamptransactions" (
    "id" SERIAL NOT NULL,
    "status" "public"."onRampstatus" NOT NULL,
    "provider" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "onRamptransactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Balance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "locked" INTEGER NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."P2PTransaction" (
    "id" SERIAL NOT NULL,
    "senderID" INTEGER NOT NULL,
    "reciverID" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "P2PTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phonenumber_key" ON "public"."User"("phonenumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_publicKey_key" ON "public"."User"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_email_key" ON "public"."Merchant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_phonenumber_key" ON "public"."Merchant"("phonenumber");

-- CreateIndex
CREATE UNIQUE INDEX "onRamptransactions_token_key" ON "public"."onRamptransactions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_key" ON "public"."Balance"("userId");

-- AddForeignKey
ALTER TABLE "public"."onRamptransactions" ADD CONSTRAINT "onRamptransactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."P2PTransaction" ADD CONSTRAINT "P2PTransaction_senderID_fkey" FOREIGN KEY ("senderID") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."P2PTransaction" ADD CONSTRAINT "P2PTransaction_reciverID_fkey" FOREIGN KEY ("reciverID") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
