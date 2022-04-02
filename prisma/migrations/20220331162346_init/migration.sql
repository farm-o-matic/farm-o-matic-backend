/*
  Warnings:

  - The primary key for the `post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `post` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `contents` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datetime` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `posterID` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votes` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalUpvotes` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserName` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `post` DROP PRIMARY KEY,
    DROP COLUMN `authorId`,
    DROP COLUMN `content`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `id`,
    DROP COLUMN `published`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `PostID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `contents` TEXT NOT NULL,
    ADD COLUMN `datetime` DATETIME(0) NOT NULL,
    ADD COLUMN `posterID` INTEGER NOT NULL,
    ADD COLUMN `votes` INTEGER NOT NULL,
    ADD PRIMARY KEY (`PostID`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `email`,
    DROP COLUMN `id`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    ADD COLUMN `Email` VARCHAR(127) NOT NULL,
    ADD COLUMN `Password` VARCHAR(16) NOT NULL,
    ADD COLUMN `Picture` BLOB NULL,
    ADD COLUMN `TotalUpvotes` INTEGER NOT NULL,
    ADD COLUMN `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `UserName` VARCHAR(16) NOT NULL,
    ADD PRIMARY KEY (`UserID`);

-- DropTable
DROP TABLE `profile`;

-- CreateTable
CREATE TABLE `commentreply` (
    `replyID` INTEGER NOT NULL AUTO_INCREMENT,
    `contents` TEXT NOT NULL,
    `votes` INTEGER NOT NULL,
    `Datetime` DATETIME(0) NOT NULL,
    `replyerID` INTEGER NOT NULL,
    `commentID` INTEGER NOT NULL,

    INDEX `commentID`(`commentID`),
    INDEX `replyerID`(`replyerID`),
    PRIMARY KEY (`replyID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `commentID` INTEGER NOT NULL AUTO_INCREMENT,
    `datetime` DATETIME(0) NOT NULL,
    `contents` TEXT NOT NULL,
    `votes` INTEGER NOT NULL,
    `commenterID` INTEGER NOT NULL,
    `postID` INTEGER NOT NULL,

    INDEX `commenterID`(`commenterID`),
    INDEX `postID`(`postID`),
    PRIMARY KEY (`commentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fertilizerschedule` (
    `time` TIME(0) NOT NULL,
    `SettingsID` INTEGER NOT NULL,
    `Interval` INTEGER NOT NULL,

    INDEX `SettingsID`(`SettingsID`),
    PRIMARY KEY (`time`, `SettingsID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pesticideschedule` (
    `time` TIME(0) NOT NULL,
    `SettingsID` INTEGER NOT NULL,
    `Interval` INTEGER NOT NULL,

    INDEX `SettingsID`(`SettingsID`),
    PRIMARY KEY (`time`, `SettingsID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planterbox` (
    `boxID` INTEGER NOT NULL AUTO_INCREMENT,
    `ownerID` INTEGER NOT NULL,
    `SettingsID` INTEGER NULL,

    INDEX `SettingsID`(`SettingsID`),
    INDEX `ownerID`(`ownerID`),
    PRIMARY KEY (`boxID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planterboxsettings` (
    `SettingsID` INTEGER NOT NULL AUTO_INCREMENT,
    `SettingName` VARCHAR(127) NULL,
    `wateringMode` ENUM('Manual', 'Schedule', 'Auto') NOT NULL,
    `minMoisture` FLOAT NOT NULL,
    `maxMoisture` FLOAT NOT NULL,
    `minLightIntensity` FLOAT NOT NULL,
    `maxLightIntensity` FLOAT NOT NULL,
    `lightingMode` ENUM('Manual', 'Schedule', 'Auto') NOT NULL,
    `lightStartTime` TIME(0) NOT NULL,
    `lightStopTime` TIME(0) NOT NULL,
    `lightPower` INTEGER NOT NULL,
    `lightStatus` ENUM('ON', 'OFF') NOT NULL,

    PRIMARY KEY (`SettingsID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sensordata` (
    `BoxID` INTEGER NOT NULL,
    `DateTime` DATETIME(0) NOT NULL,
    `Moisture` FLOAT NOT NULL,
    `Temperature` FLOAT NOT NULL,
    `LightIntensity` FLOAT NOT NULL,

    INDEX `BoxID`(`BoxID`),
    PRIMARY KEY (`BoxID`, `DateTime`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wateringschedule` (
    `time` TIME(0) NOT NULL,
    `SettingsID` INTEGER NOT NULL,

    INDEX `SettingsID`(`SettingsID`),
    PRIMARY KEY (`time`, `SettingsID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wikientry` (
    `entryID` INTEGER NOT NULL AUTO_INCREMENT,
    `plantname` VARCHAR(255) NOT NULL,
    `plantdesc` TEXT NOT NULL,
    `fertilizer` TEXT NOT NULL,
    `pesticide` TEXT NOT NULL,
    `amountofwater` TEXT NOT NULL,
    `LightExposure` TEXT NOT NULL,

    PRIMARY KEY (`entryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `posterID` ON `post`(`posterID`);

-- AddForeignKey
ALTER TABLE `commentreply` ADD CONSTRAINT `commentreply_ibfk_2` FOREIGN KEY (`commentID`) REFERENCES `comments`(`commentID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `commentreply` ADD CONSTRAINT `commentreply_ibfk_1` FOREIGN KEY (`replyerID`) REFERENCES `user`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postID`) REFERENCES `post`(`PostID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`commenterID`) REFERENCES `user`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `fertilizerschedule` ADD CONSTRAINT `fertilizerschedule_ibfk_1` FOREIGN KEY (`SettingsID`) REFERENCES `planterboxsettings`(`SettingsID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pesticideschedule` ADD CONSTRAINT `pesticideschedule_ibfk_1` FOREIGN KEY (`SettingsID`) REFERENCES `planterboxsettings`(`SettingsID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `planterbox` ADD CONSTRAINT `planterbox_ibfk_2` FOREIGN KEY (`SettingsID`) REFERENCES `planterboxsettings`(`SettingsID`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `planterbox` ADD CONSTRAINT `planterbox_ibfk_1` FOREIGN KEY (`ownerID`) REFERENCES `user`(`UserID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `post` ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`posterID`) REFERENCES `user`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sensordata` ADD CONSTRAINT `sensordata_ibfk_1` FOREIGN KEY (`BoxID`) REFERENCES `planterbox`(`boxID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `wateringschedule` ADD CONSTRAINT `wateringschedule_ibfk_1` FOREIGN KEY (`SettingsID`) REFERENCES `planterboxsettings`(`SettingsID`) ON DELETE CASCADE ON UPDATE NO ACTION;
