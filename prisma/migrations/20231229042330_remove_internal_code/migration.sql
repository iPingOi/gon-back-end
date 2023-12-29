/*
  Warnings:

  - You are about to drop the column `internalCode` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "internalCode";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePicture" SET DEFAULT 'default.png';
