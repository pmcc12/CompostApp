-- CreateEnum
CREATE TYPE "unit" AS ENUM ('KG', 'Litter', 'units');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unit" "unit" NOT NULL DEFAULT E'KG';
