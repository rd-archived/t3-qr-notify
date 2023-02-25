/*
  Warnings:

  - You are about to drop the column `name` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Vehicle` table. All the data in the column will be lost.
  - Added the required column `title` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleNo` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "name",
DROP COLUMN "number",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "vehicleNo" TEXT NOT NULL;
