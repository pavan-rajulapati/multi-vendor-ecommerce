/*
  Warnings:

  - You are about to drop the column `image` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `kycStatus` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the column `payoutAccountId` on the `Seller` table. All the data in the column will be lost.
  - You are about to drop the `ProductReviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SellerDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('GST_CERTIFICATE', 'PAN_CARD', 'ID_PROOF');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('PICKUP', 'RETURN', 'WAREHOUSE');

-- DropForeignKey
ALTER TABLE "ProductReviews" DROP CONSTRAINT "ProductReviews_productVariantId_fkey";

-- DropForeignKey
ALTER TABLE "ProductReviews" DROP CONSTRAINT "ProductReviews_userId_fkey";

-- DropForeignKey
ALTER TABLE "SellerDetails" DROP CONSTRAINT "SellerDetails_sellerId_fkey";

-- DropIndex
DROP INDEX "Product_name_createdAt_idx";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "avgRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalReviews" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "Seller" DROP COLUMN "kycStatus",
DROP COLUMN "payoutAccountId",
ADD COLUMN     "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onboardingStep" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "ProductReviews";

-- DropTable
DROP TABLE "SellerDetails";

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "description" TEXT,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellerAddress" (
    "id" TEXT NOT NULL,
    "type" "AddressType" NOT NULL,
    "line1" TEXT NOT NULL,
    "line2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "SellerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellerBank" (
    "id" TEXT NOT NULL,
    "accountHolder" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "ifscCode" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "payoutAccountId" TEXT,
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "SellerBank_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellerKYC" (
    "id" TEXT NOT NULL,
    "gstNumber" TEXT,
    "panNumber" TEXT,
    "status" "KycStatus" NOT NULL DEFAULT 'PENDING',
    "rejectionReason" TEXT,
    "submittedAt" TIMESTAMP(3),
    "verifiedAt" TIMESTAMP(3),
    "sellerId" TEXT NOT NULL,

    CONSTRAINT "SellerKYC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SellerDocument" (
    "id" TEXT NOT NULL,
    "type" "DocumentType" NOT NULL,
    "url" TEXT NOT NULL,
    "sellerKycId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SellerDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "altText" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "productVariantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "productVariantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_sellerId_key" ON "Store"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "SellerBank_sellerId_key" ON "SellerBank"("sellerId");

-- CreateIndex
CREATE UNIQUE INDEX "SellerKYC_gstNumber_key" ON "SellerKYC"("gstNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SellerKYC_panNumber_key" ON "SellerKYC"("panNumber");

-- CreateIndex
CREATE UNIQUE INDEX "SellerKYC_sellerId_key" ON "SellerKYC"("sellerId");

-- CreateIndex
CREATE INDEX "Reviews_rating_createdAt_idx" ON "Reviews"("rating", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_userId_productVariantId_key" ON "Reviews"("userId", "productVariantId");

-- CreateIndex
CREATE INDEX "Product_name_createdAt_isActive_idx" ON "Product"("name", "createdAt", "isActive");

-- CreateIndex
CREATE INDEX "Seller_status_isActive_idx" ON "Seller"("status", "isActive");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerAddress" ADD CONSTRAINT "SellerAddress_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerBank" ADD CONSTRAINT "SellerBank_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerKYC" ADD CONSTRAINT "SellerKYC_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerDocument" ADD CONSTRAINT "SellerDocument_sellerKycId_fkey" FOREIGN KEY ("sellerKycId") REFERENCES "SellerKYC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
