/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Recommendation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recommendation" DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "Prediction" (
    "id" SERIAL NOT NULL,
    "predicted_footprint" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prediction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Prediction" ADD CONSTRAINT "Prediction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
