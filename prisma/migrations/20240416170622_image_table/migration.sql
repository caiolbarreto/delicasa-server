-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "content_length" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);
