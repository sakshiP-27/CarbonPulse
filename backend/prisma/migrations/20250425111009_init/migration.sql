/*
  Warnings:

  - Added the required column `carbon_footprint` to the `UserActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserActivity" ADD COLUMN     "carbon_footprint" INTEGER NOT NULL;
