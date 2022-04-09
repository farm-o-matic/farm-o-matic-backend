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
    `FSID` INTEGER NOT NULL AUTO_INCREMENT,
    `SettingsID` INTEGER NOT NULL,
    `time` TIME(0) NOT NULL,
    `Interval` INTEGER NOT NULL,

    INDEX `SettingsID`(`SettingsID`),
    PRIMARY KEY (`FSID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pesticideschedule` (
    `PSID` INTEGER NOT NULL AUTO_INCREMENT,
    `SettingsID` INTEGER NOT NULL,
    `time` TIME(0) NOT NULL,
    `Interval` INTEGER NOT NULL,

    INDEX `SettingsID`(`SettingsID`),
    PRIMARY KEY (`PSID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planterbox` (
    `boxID` INTEGER NOT NULL AUTO_INCREMENT,
    `ownerID` INTEGER NOT NULL,
    `SettingsID` INTEGER NULL,
    `serialNumber` INTEGER NOT NULL,

    INDEX `SettingsID`(`SettingsID`),
    INDEX `ownerID`(`ownerID`),
    PRIMARY KEY (`boxID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `planterboxsettings` (
    `SettingsID` INTEGER NOT NULL AUTO_INCREMENT,
    `SettingName` VARCHAR(127) NULL,
    `plantPicture` BLOB NULL,
    `wateringMode` ENUM('Manual', 'Schedule', 'Auto') NOT NULL DEFAULT 'Manual',
    `minMoisture` FLOAT NOT NULL DEFAULT 0,
    `maxMoisture` FLOAT NOT NULL DEFAULT 0.8,
    `minLightIntensity` FLOAT NOT NULL DEFAULT 1000,
    `maxLightIntensity` FLOAT NOT NULL DEFAULT 10000,
    `lightingMode` ENUM('Manual', 'Schedule', 'Auto') NOT NULL DEFAULT 'Manual',
    `lightStartTime` TIME(0) NOT NULL DEFAULT '08:00:00',
    `lightStopTime` TIME(0) NOT NULL DEFAULT '18:00:00',
    `lightPower` INTEGER NOT NULL DEFAULT 50,
    `lightStatus` ENUM('ON', 'OFF') NOT NULL DEFAULT 'OFF',

    PRIMARY KEY (`SettingsID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `post` (
    `PostID` INTEGER NOT NULL AUTO_INCREMENT,
    `contents` TEXT NOT NULL,
    `datetime` DATETIME(0) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `votes` INTEGER NOT NULL,
    `posterID` INTEGER NOT NULL,

    INDEX `posterID`(`posterID`),
    PRIMARY KEY (`PostID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sensordata` (
    `DataID` INTEGER NOT NULL AUTO_INCREMENT,
    `BoxID` INTEGER NOT NULL,
    `DateTime` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `Moisture` FLOAT NOT NULL,
    `Temperature` FLOAT NOT NULL,
    `LightIntensity` FLOAT NOT NULL,

    INDEX `BoxID`(`BoxID`),
    PRIMARY KEY (`DataID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(127) NOT NULL,
    `UserName` VARCHAR(16) NOT NULL,
    `Password` VARCHAR(256) NOT NULL,
    `Picture` BLOB NULL,
    `TotalUpvotes` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wateringschedule` (
    `WSID` INTEGER NOT NULL AUTO_INCREMENT,
    `SettingsID` INTEGER NOT NULL,
    `time` TIME(0) NOT NULL,
    `duration` INTEGER NOT NULL,

    INDEX `SettingsID`(`SettingsID`),
    PRIMARY KEY (`WSID`)
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
