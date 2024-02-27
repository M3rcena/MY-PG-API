-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "info";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "map";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user";

-- CreateTable
CREATE TABLE "map"."Info" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "AgeGroup" INTEGER[],
    "access_amea" BOOLEAN NOT NULL DEFAULT false,
    "parking_amea" BOOLEAN NOT NULL DEFAULT false,
    "pets" BOOLEAN NOT NULL DEFAULT false,
    "games_kounies" BOOLEAN NOT NULL DEFAULT false,
    "games_tsoulithres" BOOLEAN NOT NULL DEFAULT false,
    "games_trampales" BOOLEAN NOT NULL DEFAULT false,
    "games_wall" BOOLEAN NOT NULL DEFAULT false,
    "games_alogakia" BOOLEAN NOT NULL DEFAULT false,
    "game_sxoini" BOOLEAN NOT NULL DEFAULT false,
    "rest_trapezia" INTEGER NOT NULL DEFAULT 0,
    "rest_karekles" INTEGER NOT NULL DEFAULT 0,
    "rest_pagkakia" INTEGER NOT NULL DEFAULT 0,
    "rest_skiasi" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL,
    "images" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "user"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "user"."User"("phone");
