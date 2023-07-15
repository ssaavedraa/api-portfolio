-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "deployed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deploymentUrl" TEXT;
