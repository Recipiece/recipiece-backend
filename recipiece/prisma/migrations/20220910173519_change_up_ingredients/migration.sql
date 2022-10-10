/*
  Warnings:

  - You are about to drop the column `amount` on the `RecipeIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `RecipeIngredient` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `RecipeIngredient` table. All the data in the column will be lost.
  - Added the required column `content` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RecipeIngredient_name_idx";

-- AlterTable
ALTER TABLE "RecipeIngredient" DROP COLUMN "amount",
DROP COLUMN "name",
DROP COLUMN "unit",
ADD COLUMN     "content" TEXT NOT NULL;
