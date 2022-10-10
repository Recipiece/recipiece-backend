/*
  Warnings:

  - Added the required column `ordinal` to the `RecipeIngredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ordinal` to the `RecipeStep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecipeIngredient" ADD COLUMN     "ordinal" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RecipeStep" ADD COLUMN     "ordinal" INTEGER NOT NULL;
