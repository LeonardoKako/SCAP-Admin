-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('ENTRY', 'EXIT');

-- CreateTable
CREATE TABLE "tb_profile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_sector" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile_id" INTEGER NOT NULL,
    "sector_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tb_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_access" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "access_type" "AccessType" NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tb_access_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_user_email_key" ON "tb_user"("email");

-- AddForeignKey
ALTER TABLE "tb_user" ADD CONSTRAINT "tb_user_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "tb_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_user" ADD CONSTRAINT "tb_user_sector_id_fkey" FOREIGN KEY ("sector_id") REFERENCES "tb_sector"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_access" ADD CONSTRAINT "tb_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
