/*
  Warnings:

  - You are about to drop the column `with` on the `Posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "with",
ADD COLUMN     "withUsernames" TEXT[];
