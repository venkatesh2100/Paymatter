/*
  Warnings:

  - The values [Proccesing] on the enum `onRampstatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "onRampstatus_new" AS ENUM ('Processing', 'Failed', 'Success');
ALTER TABLE "onRamptransactions" ALTER COLUMN "status" TYPE "onRampstatus_new" USING ("status"::text::"onRampstatus_new");
ALTER TYPE "onRampstatus" RENAME TO "onRampstatus_old";
ALTER TYPE "onRampstatus_new" RENAME TO "onRampstatus";
DROP TYPE "onRampstatus_old";
COMMIT;
