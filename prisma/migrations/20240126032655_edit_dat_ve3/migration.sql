/*
  Warnings:

  - The primary key for the `DatVe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_dat_ve` on the `DatVe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `DatVe` DROP PRIMARY KEY,
    DROP COLUMN `id_dat_ve`;
