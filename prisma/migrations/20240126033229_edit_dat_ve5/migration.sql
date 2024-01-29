/*
  Warnings:

  - Added the required column `id_dat_ve` to the `DatVe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DatVe` ADD COLUMN `id_dat_ve` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_dat_ve`);
