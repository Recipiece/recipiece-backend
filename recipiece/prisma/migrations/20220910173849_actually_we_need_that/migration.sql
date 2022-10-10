/*
  Warnings:

  - Added the required column `amount` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecipeIngredient" ADD COLUMN     "amount" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "unit" TEXT;

-- CreateIndex
CREATE INDEX "RecipeIngredient_name_idx" ON "RecipeIngredient"("name");
