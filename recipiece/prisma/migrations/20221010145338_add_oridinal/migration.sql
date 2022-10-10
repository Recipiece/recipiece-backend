/*
  Warnings:

  - Added the required column `ordinal` to the `RecipeSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecipeSection" ADD COLUMN     "ordinal" INTEGER NOT NULL;
