-- CreateTable
CREATE TABLE "film" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "is_watched" BOOLEAN NOT NULL,
    "rating" SMALLINT DEFAULT 0,
    "comment" TEXT,
    "watched_on" DATE,
    "watched_by" INTEGER NOT NULL,

    CONSTRAINT "film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "github_id" TEXT,
    "password" TEXT NOT NULL DEFAULT '',
    "avatar" TEXT,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_name_key" ON "profile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_github_id_key" ON "profile"("github_id");

-- AddForeignKey
ALTER TABLE "film" ADD CONSTRAINT "film_watched_by_fkey" FOREIGN KEY ("watched_by") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
