/*
  Warnings:

  - You are about to alter the column `phone` on the `UserSettings` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Char(10)`.

*/
-- AlterTable
ALTER TABLE "UserSettings" ALTER COLUMN "phone" SET DATA TYPE CHAR(10);
