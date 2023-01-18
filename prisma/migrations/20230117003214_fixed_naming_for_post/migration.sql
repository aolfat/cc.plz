/*
  Warnings:

  - You are about to drop the column `about` on the `Post` table. All the data in the column will be lost.
  - Added the required column `caption` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "about",
ADD COLUMN     "caption" TEXT NOT NULL,
ALTER COLUMN "private" SET DEFAULT true;
