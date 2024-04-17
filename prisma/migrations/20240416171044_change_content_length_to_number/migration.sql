/*
  Warnings:

  - Changed the type of `content_length` on the `images` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "images" DROP COLUMN "content_length",
ADD COLUMN     "content_length" INTEGER NOT NULL;
