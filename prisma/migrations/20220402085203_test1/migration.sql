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
    `BoxID` INTEGER NOT NULL,
    `DateTime` DATETIME(0) NOT NULL,
    `Moisture` FLOAT NOT NULL,
    `Temperature` FLOAT NOT NULL,
    `LightIntensity` FLOAT NOT NULL,

    INDEX `BoxID`(`BoxID`),
    PRIMARY KEY (`BoxID`, `DateTime`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `UserID` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(127) NOT NULL,
    `UserName` VARCHAR(16) NOT NULL,
    `Password` VARCHAR(256) NOT NULL,
    `Picture` BLOB NULL,
    `TotalUpvotes` INTEGER NOT NULL,

    PRIMARY KEY (`UserID`)
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
