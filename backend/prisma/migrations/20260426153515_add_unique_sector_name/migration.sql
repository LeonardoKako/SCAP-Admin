/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `tb_sector` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tb_sector_name_key" ON "tb_sector"("name");
