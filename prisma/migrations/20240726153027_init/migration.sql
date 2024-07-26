-- CreateTable
CREATE TABLE "Snippet" (
    "id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "snippet" BYTEA NOT NULL,

    CONSTRAINT "Snippet_pkey" PRIMARY KEY ("id")
);
