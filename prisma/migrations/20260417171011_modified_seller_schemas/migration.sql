/*
  Warnings:

  - You are about to drop the column `isVerified` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Seller` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mobileNumber]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactName` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SellerStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- DropIndex
DROP INDEX "SellerDetails_businessName_key";

-- DropIndex
DROP INDEX "SellerDetails_sellerId_idx";

-- DropIndex
DROP INDEX "SellerDetails_storeName_key";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "isVerified",
DROP COLUMN "name",
ADD COLUMN     "contactName" TEXT NOT NULL,
ADD COLUMN     "kycStatus" "KycStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "payoutAccountId" TEXT,
ADD COLUMN     "status" "SellerStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "Seller_mobileNumber_key" ON "Seller"("mobileNumber");
