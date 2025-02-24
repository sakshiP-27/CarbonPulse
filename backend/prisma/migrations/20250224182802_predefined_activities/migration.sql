/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Activity` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Activity" DROP CONSTRAINT "Activity_user_id_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "updatedAt",
DROP COLUMN "user_id";

-- CreateTable
CREATE TABLE "UserActivity" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserActivity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserActivity" ADD CONSTRAINT "UserActivity_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
