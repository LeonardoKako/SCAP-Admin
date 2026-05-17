/*
  Warnings:

  - Made the column `password` on table `tb_user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "tb_user" ALTER COLUMN "password" SET NOT NULL;
