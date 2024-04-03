/*
  Warnings:

  - You are about to drop the column `quantity` on the `items` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "quantity";

-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "quantity" INTEGER NOT NULL;
