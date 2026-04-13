-- AlterTable
ALTER TABLE "OrderAddress" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT 'Placeholder',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'Placeholder';

-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT 'Placeholder',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT 'Placeholder';
