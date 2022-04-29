-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: database_farmomatic_auto
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
-- Table structure for table `lightintensity`
--

DROP TABLE IF EXISTS `lightintensity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lightintensity` (
  `DataID` int NOT NULL AUTO_INCREMENT,
  `BoxID` int DEFAULT NULL,
  `lightIntensity` float DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`DataID`),
  KEY `BoxID` (`BoxID`),
  CONSTRAINT `lightintensity_ibfk_1` FOREIGN KEY (`BoxID`) REFERENCES `planterbox` (`boxID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lightintensity`
--

LOCK TABLES `lightintensity` WRITE;
/*!40000 ALTER TABLE `lightintensity` DISABLE KEYS */;
/*!40000 ALTER TABLE `lightintensity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moisture`
--

DROP TABLE IF EXISTS `moisture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moisture` (
  `DataID` int NOT NULL AUTO_INCREMENT,
  `BoxID` int DEFAULT NULL,
  `Moisture` float DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`DataID`),
  KEY `BoxID` (`BoxID`),
  CONSTRAINT `moisture_ibfk_1` FOREIGN KEY (`BoxID`) REFERENCES `planterbox` (`boxID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moisture`
--

LOCK TABLES `moisture` WRITE;
/*!40000 ALTER TABLE `moisture` DISABLE KEYS */;
/*!40000 ALTER TABLE `moisture` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=100002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planterboxsettings`
--

LOCK TABLES `planterboxsettings` WRITE;
/*!40000 ALTER TABLE `planterboxsettings` DISABLE KEYS */;
INSERT INTO `planterboxsettings` VALUES (1,'Sunflower',NULL,'Manual','OFF',0.2,0.6,1000,10000,'Manual','08:00:00','17:00:00',55,'OFF'),(2,'Basil',NULL,'Schedule','OFF',0.1,0.75,5000,30000,'Schedule','09:00:00','18:00:00',40,'OFF'),(3,'Cucumber',NULL,'Auto','OFF',0.3,0.65,10000,100000,'Auto','11:00:00','15:00:00',70,'ON');
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
-- Table structure for table `temperature`
--

DROP TABLE IF EXISTS `temperature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temperature` (
  `DataID` int NOT NULL AUTO_INCREMENT,
  `BoxID` int DEFAULT NULL,
  `Temperature` float DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`DataID`),
  KEY `BoxID` (`BoxID`),
  CONSTRAINT `temperature_ibfk_1` FOREIGN KEY (`BoxID`) REFERENCES `planterbox` (`boxID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temperature`
--

LOCK TABLES `temperature` WRITE;
/*!40000 ALTER TABLE `temperature` DISABLE KEYS */;
/*!40000 ALTER TABLE `temperature` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  `climate` text NOT NULL,
  `tips` text NOT NULL,
  `fertilizer` text NOT NULL,
  `pesticide` text NOT NULL,
  `waterAmount` text NOT NULL,
  `lightexposure` text NOT NULL,
  `growingtime` text NOT NULL,
  `waterFreq` varchar(50) DEFAULT NULL,
  `pesticideFreq` varchar(50) DEFAULT NULL,
  `weather` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`entryID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wikientry`
--

LOCK TABLES `wikientry` WRITE;
/*!40000 ALTER TABLE `wikientry` DISABLE KEYS */;
INSERT INTO `wikientry` VALUES (1,'Coriander','Coriander is an annual herb in the family of Apiaceae. It is also known as Chinese parsley, dhania, or cilantro. All parts of the plant are edible, but the fresh leaves and the dried seeds (as a spice) are the parts most traditionally used in cooking. It is a soft plant growing to 50 cm (20 in) tall. The leaves are variable in shape, broadly lobed at the base of the plant, and slender and feathery higher on the flowering stems. The flowers are produced in small umbels and are white or very pale pink in color with the petals pointing away from the center of the umbel longer than those pointing towards it. The plant produces an oval-shaped fruit that is yellow-brown in color and contains two seeds.','The plant grows optimally in areas with damp, cool springs and hot, dry summers at temperatures between 17 and 27°C. The plant can tolerate light frost but hot temperatures will cause the plants to bolt.','- Coriander is best sown directly in pots rather than growing them in seed trays and then transplanting the sprouts.\n- Once the young coriander plants are established, they require little water as the plants do not perform well in damp conditions.\n- The plants will benefit from the addition of fertilizer during the growing season. Phosphorous and potassium often limit the growth of coriander whereas the demand for nitrogen is not very high.\n- The key to growing healthy coriander herb is regular and steady watering. Remember to mulch to keep the soil surface cool.\n- If you live in a hot climate, consider planting your cilantro where it can receive some afternoon shade or in pots that can be periodically moved into the shade. Too much heat and direct sun can cause the plant to bolt (go to seed) early','Cilantro prefers a light, well-drained, moderately fertile loam or sandy soil, but it will tolerate many soils as long as nutrient levels and moisture are monitored.\nCilantro should be fertilized twice. Apply ½ teaspoon of ammonium nitrate (34-0-0) or urea (21-0-0) per square foot.','Aphids: A few sharp sprays of water from the hose and companion planting will keep aphids at bay.\nWhitefly: A few sharp sprays of water from the hose and companion planting will keep whiteflies at bay.\nWilt: Choose disease-resistant varieties and keep leaves dry by providing airflow and watering at the plant’s base.\nMildew: Proper spacing will help with airflow, which can prevent powdery mildew from forming and spreading. Remove any diseased plant and dispose of it to prevent spread.\nLeafspot: Add neem oil to help ward off bacteria. Remove diseased leaves and debris from the garden bed and dispose of immediately.','2.34 mL/day','6 hours/day','45-70 days','twice a day; double the week before harvest','daily','damp and cool'),(2,'Holy Basil','Basil is an annual, or sometimes perennial, herb used for its leaves. Depending on the variety, plants can reach heights of between 30 and 150 cm . Its leaves are richly green and ovate, but otherwise, come in a wide variety of sizes and shapes depending on cultivar. Leaf sizes range from 3 to 11 cm long, and between 1 and 6 cm wide. Basil grows a thick, central taproot. Its flowers are small and white, and grow from a central inflorescence, or spike, that emerges from the central stem atop the plant.[citation needed] Unusual among Lamiaceae, the four stamens and the pistil are not pushed under the upper lip of the corolla, but lie over the inferior lip. After entomophilous pollination, the corolla falls off and four round achenes develop inside the bilabiate calyx.','Basil is sensitive to cold, with best growth in hot, dry conditions. It behaves as an annual if there is any chance of a frost. However, due to its popularity, basil is cultivated in many countries around the world.','- If you live in a hot area, use mulch around the plants (the mulch will help hold in moisture and suppress weeds).\n- After the seedlings have produced their first six leaves, prune to above the second set. This encourages the plants to start branching, resulting in more leaves for harvest.\n- Every time a branch has six to eight leaves, repeat pruning the branches back to their first set of leaves.\n- After about 6 weeks, pinch off the center shoot to prevent early flowering. If flowers do grow, just cut them off.\n- If the weather is going to be cold or if a sudden frost is imminent, be sure to harvest your basil beforehand, as the cold temperatures will destroy your plants.',' Feed your basil plants with a good organic fertilizer every 4-6 weeks for indoor plants and every 2-3 weeks for outdoor. A well-balanced fertilizer with equal amounts of nitrogen, potassium, and phosphate, will help to boost leaf production. Soil should be moderately fertile and moist but well-draining. Basil thrives in rich soil with lots of organic matter, such as compost.','Aphids: To get rid of them, try blasting them with cold water to dislodge them. If that fails, spray the basil plants with insecticidal soap or horticultural oil. You can also purchase beneficial insects such as ladybugs or parasitic wasps.\nFungal Diseases: The preventive measures include rotating plant locations, using a plastic covering to heat the soil to a temperature that kills pathogens and pests, and insuring proper sanitation, aeration, and drainage. If your basil plant does succumb to fungus, pull and get rid of the infected plant before it infects other plants.','16.4 mL/week; keep moist','6-8 hours/day','3-4 weeks','every 3-4 days','daily','hot and dry');
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

-- Dump completed on 2022-04-29 23:56:44
