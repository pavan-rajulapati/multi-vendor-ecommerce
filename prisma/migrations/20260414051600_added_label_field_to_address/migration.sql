-- CreateEnum
CREATE TYPE "AddressLabel" AS ENUM ('HOME', 'WORK', 'FRIEND', 'OTHER');

-- AlterTable
ALTER TABLE "OrderAddress" ADD COLUMN     "label" "AddressLabel" NOT NULL DEFAULT 'HOME',
ALTER COLUMN "firstName" DROP DEFAULT,
ALTER COLUMN "lastName" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "label" "AddressLabel" NOT NULL DEFAULT 'HOME',
ALTER COLUMN "firstName" DROP DEFAULT,
ALTER COLUMN "lastName" DROP DEFAULT;
