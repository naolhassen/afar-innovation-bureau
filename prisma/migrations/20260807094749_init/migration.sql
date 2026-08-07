-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'EDITOR');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'EDITOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleAf" TEXT NOT NULL,
    "titleAm" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "excerptAf" TEXT,
    "excerptAm" TEXT,
    "excerptEn" TEXT,
    "contentAf" TEXT NOT NULL,
    "contentAm" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "coverImage" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleAf" TEXT NOT NULL,
    "titleAm" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionAf" TEXT NOT NULL,
    "descriptionAm" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "location" TEXT,
    "coverImage" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "id" TEXT NOT NULL,
    "titleAf" TEXT NOT NULL,
    "titleAm" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionAf" TEXT,
    "descriptionAm" TEXT,
    "descriptionEn" TEXT,
    "fileUrl" TEXT NOT NULL,
    "coverImage" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryItem" (
    "id" TEXT NOT NULL,
    "titleAf" TEXT,
    "titleAm" TEXT,
    "titleEn" TEXT,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sector" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "nameAf" TEXT NOT NULL,
    "nameAm" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "headTitleAf" TEXT,
    "headTitleAm" TEXT,
    "headTitleEn" TEXT,
    "descriptionAf" TEXT,
    "descriptionAm" TEXT,
    "descriptionEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Directorate" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "nameAf" TEXT NOT NULL,
    "nameAm" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descriptionAf" TEXT,
    "descriptionAm" TEXT,
    "descriptionEn" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Directorate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FaqItem" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "questionAf" TEXT NOT NULL,
    "questionAm" TEXT NOT NULL,
    "questionEn" TEXT NOT NULL,
    "answerAf" TEXT NOT NULL,
    "answerAm" TEXT NOT NULL,
    "answerEn" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FaqItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL,
    "missionAf" TEXT,
    "missionAm" TEXT,
    "missionEn" TEXT,
    "visionAf" TEXT,
    "visionAm" TEXT,
    "visionEn" TEXT,
    "valuesAf" TEXT,
    "valuesAm" TEXT,
    "valuesEn" TEXT,
    "historyAf" TEXT,
    "historyAm" TEXT,
    "historyEn" TEXT,
    "bureauHeadMsgAf" TEXT,
    "bureauHeadMsgAm" TEXT,
    "bureauHeadMsgEn" TEXT,
    "bureauHeadName" TEXT,
    "bureauHeadPhoto" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "addressAf" TEXT,
    "addressAm" TEXT,
    "addressEn" TEXT,
    "facebookUrl" TEXT,
    "telegramUrl" TEXT,
    "twitterUrl" TEXT,
    "instagramUrl" TEXT,
    "youtubeUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");
