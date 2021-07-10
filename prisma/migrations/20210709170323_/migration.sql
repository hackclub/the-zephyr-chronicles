/*
  Warnings:

  - You are about to drop the column `profilepicture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profilepicture",
ADD COLUMN     "profilePicture" VARCHAR(255);
