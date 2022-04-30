/*
  Warnings:

  - You are about to drop the column `LightExposure` on the `wikientry` table. All the data in the column will be lost.
  - You are about to drop the column `amountofwater` on the `wikientry` table. All the data in the column will be lost.
  - Added the required column `climate` to the `wikientry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `growingtime` to the `wikientry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lightexposure` to the `wikientry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tips` to the `wikientry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterAmount` to the `wikientry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `planterboxsettings` ADD COLUMN `waterStatus` ENUM('ON', 'OFF') NOT NULL DEFAULT 'OFF',
    MODIFY `plantPicture` MEDIUMBLOB NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `Picture` MEDIUMBLOB NULL;

-- AlterTable
ALTER TABLE `wikientry` DROP COLUMN `LightExposure`,
    DROP COLUMN `amountofwater`,
    ADD COLUMN `climate` TEXT NOT NULL,
    ADD COLUMN `growingtime` TEXT NOT NULL,
    ADD COLUMN `lightexposure` TEXT NOT NULL,
    ADD COLUMN `pesticideFreq` VARCHAR(50) NULL,
    ADD COLUMN `tips` TEXT NOT NULL,
    ADD COLUMN `waterAmount` TEXT NOT NULL,
    ADD COLUMN `waterFreq` VARCHAR(50) NULL,
    ADD COLUMN `weather` VARCHAR(100) NULL;

-- CreateTable
CREATE TABLE `lightintensity` (
    `DataID` INTEGER NOT NULL AUTO_INCREMENT,
    `BoxID` INTEGER NULL,
    `lightIntensity` FLOAT NULL,

    INDEX `BoxID`(`BoxID`),
    PRIMARY KEY (`DataID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `moisture` (
    `DataID` INTEGER NOT NULL AUTO_INCREMENT,
    `BoxID` INTEGER NULL,
    `Moisture` FLOAT NULL,

    INDEX `BoxID`(`BoxID`),
    PRIMARY KEY (`DataID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `temperature` (
    `DataID` INTEGER NOT NULL AUTO_INCREMENT,
    `BoxID` INTEGER NULL,
    `Temperature` FLOAT NULL,

    INDEX `BoxID`(`BoxID`),
    PRIMARY KEY (`DataID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lightintensity` ADD CONSTRAINT `lightintensity_ibfk_1` FOREIGN KEY (`BoxID`) REFERENCES `planterbox`(`boxID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `moisture` ADD CONSTRAINT `moisture_ibfk_1` FOREIGN KEY (`BoxID`) REFERENCES `planterbox`(`boxID`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `temperature` ADD CONSTRAINT `temperature_ibfk_1` FOREIGN KEY (`BoxID`) REFERENCES `planterbox`(`boxID`) ON DELETE CASCADE ON UPDATE NO ACTION;
