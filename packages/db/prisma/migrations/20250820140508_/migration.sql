-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastStreakDate" TIMESTAMP(3),
ADD COLUMN     "longestStreak" INTEGER DEFAULT 0,
ADD COLUMN     "streakCount" INTEGER DEFAULT 0;
