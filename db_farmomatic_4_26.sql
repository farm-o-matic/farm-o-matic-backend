-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: database_farmomatic_auto
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `commentreply`
--

DROP TABLE IF EXISTS `commentreply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commentreply` (
  `replyID` int NOT NULL AUTO_INCREMENT,
  `contents` text NOT NULL,
  `votes` int NOT NULL,
  `Datetime` datetime NOT NULL,
  `replyerID` int NOT NULL,
  `commentID` int NOT NULL,
  PRIMARY KEY (`replyID`),
  KEY `replyerID` (`replyerID`),
  KEY `commentID` (`commentID`),
  CONSTRAINT `commentreply_ibfk_1` FOREIGN KEY (`replyerID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `commentreply_ibfk_2` FOREIGN KEY (`commentID`) REFERENCES `comments` (`commentID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentreply`
--

LOCK TABLES `commentreply` WRITE;
/*!40000 ALTER TABLE `commentreply` DISABLE KEYS */;
/*!40000 ALTER TABLE `commentreply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `commentID` int NOT NULL AUTO_INCREMENT,
  `datetime` datetime NOT NULL,
  `contents` text NOT NULL,
  `votes` int NOT NULL,
  `commenterID` int NOT NULL,
  `postID` int NOT NULL,
  PRIMARY KEY (`commentID`),
  KEY `commenterID` (`commenterID`),
  KEY `postID` (`postID`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`commenterID`) REFERENCES `user` (`UserID`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postID`) REFERENCES `post` (`PostID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fertilizerschedule`
--

DROP TABLE IF EXISTS `fertilizerschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizerschedule` (
  `FSID` int NOT NULL AUTO_INCREMENT,
  `SettingsID` int NOT NULL,
  `time` time NOT NULL,
  `Interval` int NOT NULL,
  PRIMARY KEY (`FSID`),
  KEY `SettingsID` (`SettingsID`),
  CONSTRAINT `fertilizerschedule_ibfk_1` FOREIGN KEY (`SettingsID`) REFERENCES `planterboxsettings` (`SettingsID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizerschedule`
--

LOCK TABLES `fertilizerschedule` WRITE;
/*!40000 ALTER TABLE `fertilizerschedule` DISABLE KEYS */;
INSERT INTO `fertilizerschedule` VALUES (1,1,'12:00:00',15),(2,2,'14:20:00',10),(3,3,'15:35:00',20);
/*!40000 ALTER TABLE `fertilizerschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pesticideschedule`
--

DROP TABLE IF EXISTS `pesticideschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pesticideschedule` (
  `PSID` int NOT NULL AUTO_INCREMENT,
  `SettingsID` int NOT NULL,
  `time` time NOT NULL,
  `Interval` int NOT NULL,
  PRIMARY KEY (`PSID`),
  KEY `SettingsID` (`SettingsID`),
  CONSTRAINT `pesticideschedule_ibfk_1` FOREIGN KEY (`SettingsID`) REFERENCES `planterboxsettings` (`SettingsID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pesticideschedule`
--

LOCK TABLES `pesticideschedule` WRITE;
/*!40000 ALTER TABLE `pesticideschedule` DISABLE KEYS */;
INSERT INTO `pesticideschedule` VALUES (1,1,'10:00:00',3),(2,2,'15:30:00',1),(3,3,'08:00:00',1);
/*!40000 ALTER TABLE `pesticideschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planterbox`
--

DROP TABLE IF EXISTS `planterbox`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planterbox` (
  `boxID` int NOT NULL AUTO_INCREMENT,
  `ownerID` int NOT NULL,
  `SettingsID` int DEFAULT NULL,
  `serialNumber` int NOT NULL,
  PRIMARY KEY (`boxID`),
  KEY `ownerID` (`ownerID`),
  KEY `SettingsID` (`SettingsID`),
  CONSTRAINT `planterbox_ibfk_1` FOREIGN KEY (`ownerID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE,
  CONSTRAINT `planterbox_ibfk_2` FOREIGN KEY (`SettingsID`) REFERENCES `planterboxsettings` (`SettingsID`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planterbox`
--

LOCK TABLES `planterbox` WRITE;
/*!40000 ALTER TABLE `planterbox` DISABLE KEYS */;
INSERT INTO `planterbox` VALUES (1,1,1,1),(2,1,2,2),(3,1,3,3);
/*!40000 ALTER TABLE `planterbox` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `planterboxsettings`
--

DROP TABLE IF EXISTS `planterboxsettings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planterboxsettings` (
  `SettingsID` int NOT NULL AUTO_INCREMENT,
  `SettingName` varchar(127) DEFAULT NULL,
  `plantPicture` mediumblob,
  `wateringMode` enum('Manual','Schedule','Auto') NOT NULL DEFAULT 'Manual',
  `waterStatus` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  `minMoisture` float NOT NULL DEFAULT '0',
  `maxMoisture` float NOT NULL DEFAULT '0.8',
  `minLightIntensity` float NOT NULL DEFAULT '1000',
  `maxLightIntensity` float NOT NULL DEFAULT '10000',
  `lightingMode` enum('Manual','Schedule','Auto') NOT NULL DEFAULT 'Manual',
  `lightStartTime` time NOT NULL DEFAULT '08:00:00',
  `lightStopTime` time NOT NULL DEFAULT '18:00:00',
  `lightPower` int NOT NULL DEFAULT '50',
  `lightStatus` enum('ON','OFF') NOT NULL DEFAULT 'OFF',
  PRIMARY KEY (`SettingsID`)
) ENGINE=InnoDB AUTO_INCREMENT=100006 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planterboxsettings`
--

LOCK TABLES `planterboxsettings` WRITE;
/*!40000 ALTER TABLE `planterboxsettings` DISABLE KEYS */;
INSERT INTO `planterboxsettings` VALUES (0,'Empty',NULL,'Manual','OFF',0,0.8,1000,10000,'Manual','08:00:00','18:00:00',50,'OFF'),(1,'Sunflower',NULL,'Manual','OFF',0.2,0.6,1000,10000,'Manual','08:00:00','17:00:00',55,'OFF'),(2,'Basil',NULL,'Schedule','OFF',0.1,0.75,5000,30000,'Schedule','09:00:00','18:00:00',40,'OFF'),(3,'Cucumber',NULL,'Auto','OFF',0.3,0.65,10000,100000,'Auto','11:00:00','15:00:00',70,'ON');
/*!40000 ALTER TABLE `planterboxsettings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `PostID` int NOT NULL AUTO_INCREMENT,
  `contents` text NOT NULL,
  `datetime` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `votes` int NOT NULL,
  `posterID` int NOT NULL,
  PRIMARY KEY (`PostID`),
  KEY `posterID` (`posterID`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`posterID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensordata`
--

DROP TABLE IF EXISTS `sensordata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensordata` (
  `DataID` int NOT NULL AUTO_INCREMENT,
  `BoxID` int NOT NULL,
  `DateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Moisture` float NOT NULL,
  `Temperature` float NOT NULL,
  `LightIntensity` float NOT NULL,
  PRIMARY KEY (`DataID`),
  KEY `BoxID` (`BoxID`),
  CONSTRAINT `sensordata_ibfk_1` FOREIGN KEY (`BoxID`) REFERENCES `planterbox` (`boxID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensordata`
--

LOCK TABLES `sensordata` WRITE;
/*!40000 ALTER TABLE `sensordata` DISABLE KEYS */;
/*!40000 ALTER TABLE `sensordata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Email` varchar(127) NOT NULL,
  `UserName` varchar(16) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `Picture` mediumblob,
  `TotalUpvotes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test@mail.com','testUser','$2b$10$KZX0BROxd2cREIZI8VP28.NCG0UMQLYoRStXnFeu4hZL2L4GtZmmK',NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wateringschedule`
--

DROP TABLE IF EXISTS `wateringschedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wateringschedule` (
  `WSID` int NOT NULL AUTO_INCREMENT,
  `SettingsID` int NOT NULL,
  `time` time NOT NULL,
  `duration` int NOT NULL,
  PRIMARY KEY (`WSID`),
  KEY `SettingsID` (`SettingsID`),
  CONSTRAINT `wateringschedule_ibfk_1` FOREIGN KEY (`SettingsID`) REFERENCES `planterboxsettings` (`SettingsID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wateringschedule`
--

LOCK TABLES `wateringschedule` WRITE;
/*!40000 ALTER TABLE `wateringschedule` DISABLE KEYS */;
INSERT INTO `wateringschedule` VALUES (1,1,'06:00:00',10),(2,2,'07:30:00',5),(3,3,'02:30:00',20);
/*!40000 ALTER TABLE `wateringschedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wikientry`
--

DROP TABLE IF EXISTS `wikientry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wikientry` (
  `entryID` int NOT NULL AUTO_INCREMENT,
  `plantname` varchar(255) NOT NULL,
  `plantdesc` text NOT NULL,
  `fertilizer` text NOT NULL,
  `pesticide` text NOT NULL,
  `amountofwater` text NOT NULL,
  `LightExposure` text NOT NULL,
  PRIMARY KEY (`entryID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wikientry`
--

LOCK TABLES `wikientry` WRITE;
/*!40000 ALTER TABLE `wikientry` DISABLE KEYS */;
INSERT INTO `wikientry` VALUES (1,'Sunflower','It\'s a sunflower','test','test','test','test');
/*!40000 ALTER TABLE `wikientry` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-26  2:27:29
