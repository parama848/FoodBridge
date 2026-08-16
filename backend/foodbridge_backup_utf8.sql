-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: foodbridge
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `expires_at` datetime(6) NOT NULL,
  `food_name` varchar(150) NOT NULL,
  `food_type` varchar(100) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `pickup_address` varchar(255) NOT NULL,
  `prepared_at` datetime(6) NOT NULL,
  `quantity` double NOT NULL,
  `quantity_unit` varchar(30) NOT NULL,
  `status` enum('ACCEPTED','AVAILABLE','CANCELLED','DELIVERED','EXPIRED','PICKED_UP') NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `accepted_foundation_id` bigint DEFAULT NULL,
  `donor_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_donation_status` (`status`),
  KEY `idx_donation_donor` (`donor_id`),
  KEY `idx_donation_created_at` (`created_at`),
  KEY `idx_donation_location` (`latitude`,`longitude`),
  KEY `fk_donation_foundation` (`accepted_foundation_id`),
  CONSTRAINT `fk_donation_donor` FOREIGN KEY (`donor_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_donation_foundation` FOREIGN KEY (`accepted_foundation_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (1,'2026-08-14 14:18:04.699144','2026-08-14 21:00:00.000000','Vegetable Biryani Updated','Cooked Food',13.06,80.25,'200 Anna Salai, Chennai','2026-08-14 14:00:00.000000',20,'KG','DELIVERED','2026-08-14 16:16:04.871996',1,2),(2,'2026-08-14 16:25:38.835247','2026-08-14 20:00:00.000000','Chicken Biryani','Cooked Food',13.055,80.255,'100 Anna Salai, Chennai','2026-08-14 14:00:00.000000',25,'KG','ACCEPTED','2026-08-14 17:03:23.476151',1,2),(3,'2026-08-14 17:46:23.589968','2026-08-14 17:47:00.000000','Test Expiry Food','Cooked Food',13.055,80.255,'100 Anna Salai, Chennai','2026-08-14 17:45:00.000000',5,'KG','EXPIRED','2026-08-14 17:47:32.512393',NULL,2),(4,'2026-08-14 18:33:21.538185','2026-08-14 22:00:00.000000','Fresh Vegetable Biryani','Cooked Food',13.055,80.255,'150 Anna Salai, Chennai','2026-08-14 18:30:00.000000',15,'KG','DELIVERED','2026-08-16 10:54:13.455118',3,2),(5,'2026-08-15 09:47:54.484564','2026-08-15 12:00:00.000000','full dinner meals','Cooked Food',13.357737278028026,80.1442881284645,'RMK Engineering College, Kvaraipettai, Tiruvallur District','2026-08-15 09:45:00.000000',20,'KG','DELIVERED','2026-08-15 12:00:49.496244',3,2),(6,'2026-08-15 13:40:26.171805','2026-08-15 22:00:00.000000','Fresh Vegetable Biryani','Cooked Food',13.3633,80.1393,'Kavaraipettai, Tiruvallur, Tamil Nadu','2026-08-15 18:30:00.000000',15,'KG','DELIVERED','2026-08-15 13:48:15.093759',3,2),(7,'2026-08-15 14:10:16.820484','2026-08-15 22:00:00.000000','Mottom Biriyani','Cooked Food',13.3633,80.1393,'Kavaraipettai, Tiruvallur, Tamil Nadu','2026-08-15 18:30:00.000000',15,'KG','DELIVERED','2026-08-15 14:30:50.805309',3,2),(8,'2026-08-15 14:51:00.897322','2026-08-15 23:00:00.000000','Breakfast','Cooked Food',13.357698433817236,80.14423525613913,'RMK Engineering College','2026-08-15 09:00:00.000000',9.84,'KG','DELIVERED','2026-08-15 14:52:44.545845',3,2),(9,'2026-08-16 10:58:06.823768','2026-08-16 15:00:00.000000','Variety Rice','Cooked Food',13.357749464827597,80.14428978412234,'RMK Engineering College, RSM Nagar, Kavaraipettai, 601206','2026-08-16 10:00:00.000000',10,'KG','DELIVERED','2026-08-16 10:59:56.343440',3,2),(10,'2026-08-16 13:18:30.777841','2026-08-16 22:00:00.000000','full dinner meals','Cooked Food',13.357737435334563,80.14422813038603,'RMK Engineering College, RSM Nagar, Kavaraipettai, 601206','2026-08-16 19:00:00.000000',15,'KG','DELIVERED','2026-08-16 13:22:34.341222',3,2);
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flyway_schema_history`
--

DROP TABLE IF EXISTS `flyway_schema_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flyway_schema_history` (
  `installed_rank` int NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `description` varchar(200) NOT NULL,
  `type` varchar(20) NOT NULL,
  `script` varchar(1000) NOT NULL,
  `checksum` int DEFAULT NULL,
  `installed_by` varchar(100) NOT NULL,
  `installed_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` int NOT NULL,
  `success` tinyint(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  KEY `flyway_schema_history_s_idx` (`success`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flyway_schema_history`
--

LOCK TABLES `flyway_schema_history` WRITE;
/*!40000 ALTER TABLE `flyway_schema_history` DISABLE KEYS */;
INSERT INTO `flyway_schema_history` VALUES (1,'1','<< Flyway Baseline >>','BASELINE','<< Flyway Baseline >>',NULL,'root','2026-08-16 10:16:26',0,1);
/*!40000 ALTER TABLE `flyway_schema_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foundations`
--

DROP TABLE IF EXISTS `foundations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foundations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `organization_name` varchar(150) NOT NULL,
  `pincode` varchar(10) NOT NULL,
  `registration_number` varchar(100) NOT NULL,
  `rejection_reason` varchar(500) DEFAULT NULL,
  `state` varchar(100) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `verification_status` enum('PENDING','REJECTED','VERIFIED') NOT NULL,
  `verified_at` datetime(6) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_foundation_registration_number` (`registration_number`),
  UNIQUE KEY `UK3392xydt53askvals4j2vvk0h` (`user_id`),
  CONSTRAINT `FKwy3oablo7goqksw6p0msa2rn` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foundations`
--

LOCK TABLES `foundations` WRITE;
/*!40000 ALTER TABLE `foundations` DISABLE KEYS */;
INSERT INTO `foundations` VALUES (1,'100 New Gandhi Road','Chennai','2026-08-14 11:52:14.499586',13.055,80.255,'Agaram Foundation','600005','TN-FND-2026-001',NULL,'Tamil Nadu','2026-08-14 15:44:12.847978','VERIFIED','2026-08-14 15:44:12.842987',3),(2,'78 Gandhi Road','Chennai','2026-08-14 12:43:06.144438',13.05,80.25,'Care & Support Foundation','600004','TN-FND-2026-002','Registration documents could not be verified','Tamil Nadu','2026-08-14 12:44:07.039587','REJECTED',NULL,5),(3,'RSM Nagar, Kavaraipetta','Chennai','2026-08-14 17:13:51.174046',13.357743,80.144231,'Test Foundation','601206','TN-FND-2026-004',NULL,'Tamil Nadu','2026-08-16 13:59:36.381371','VERIFIED','2026-08-16 13:59:36.379249',6),(4,'Office No.6, Boopathy St, Sankareswarar Nagar, Virugambakkam, Chennai, Greater Chennai, Tamil Nadu 600092','25WR+7M Chennai, Tamil Nadu','2026-08-15 18:14:51.689870',13.357728,80.144238,'Jesijeni charitable trust','600092','TN/2019/0244273',NULL,'Tamil Nadu','2026-08-15 18:51:51.064513','VERIFIED','2026-08-15 18:51:51.037668',9),(5,'Edapalayam Village, Alathur Panchayat, Palavedu Post, Chennai, Tamil Nadu 602024','526R+5M Alathur','2026-08-16 13:00:59.578948',13.14,80.042,'Udhavum Nanbargal','600016','TN-FND-2021-010',NULL,'Tamil Nadu','2026-08-16 13:15:10.387608','VERIFIED','2026-08-16 13:15:10.355950',11),(6,'RSM Nagar, Kavaraipettai','Thiruvallur','2026-08-16 14:01:12.279556',13.357738,80.14426,'RMK Foundation','601206','TN-FND-2015-011',NULL,'Tamil Nadu','2026-08-16 14:03:50.266582','VERIFIED','2026-08-16 14:03:50.259959',7),(7,'1 Eldams Road, Alwarpet','Thiruvallur','2026-08-16 14:07:31.582286',13.038355,80.255597,'PR Foundation','600018','TN-FND-2020-200',NULL,'Tamil Nadu','2026-08-16 14:08:19.199683','VERIFIED','2026-08-16 14:08:19.197671',8);
/*!40000 ALTER TABLE `foundations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `message` varchar(500) NOT NULL,
  `read_at` datetime(6) DEFAULT NULL,
  `reference_id` bigint DEFAULT NULL,
  `status` enum('READ','UNREAD') NOT NULL,
  `title` varchar(150) NOT NULL,
  `type` enum('DELIVERY_UPDATED','DONATION_ACCEPTED','DONATION_DELIVERED','DONATION_EXPIRED','DONATION_PICKED_UP','FOUNDATION_REJECTED','FOUNDATION_VERIFIED','NEW_DONATION') NOT NULL,
  `recipient_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_notification_recipient` (`recipient_id`),
  KEY `idx_notification_status` (`status`),
  KEY `idx_notification_created_at` (`created_at`),
  KEY `idx_notification_recipient_created` (`recipient_id`,`created_at`),
  KEY `idx_notification_recipient_status` (`recipient_id`,`status`),
  KEY `idx_notification_reference` (`reference_id`),
  CONSTRAINT `FKqqnsjxlwleyjbxlmm213jaj3f` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (1,'2026-08-14 18:33:44.431435','Your food donation has been accepted by Hope Food Relief Foundation.','2026-08-15 14:31:25.070263',4,'READ','Donation Accepted','DONATION_ACCEPTED',2),(2,'2026-08-15 11:16:59.309148','Your food donation has been accepted by Hope Food Relief Foundation.','2026-08-15 14:31:23.916631',5,'READ','Donation Accepted','DONATION_ACCEPTED',2),(3,'2026-08-15 13:40:26.255181','A new food donation Fresh Vegetable Biryani is available near your location.','2026-08-15 14:27:05.271241',6,'READ','New Food Donation Nearby','NEW_DONATION',6),(4,'2026-08-15 13:47:10.578721','Your food donation has been accepted by Hope Food Relief Foundation.','2026-08-15 14:31:22.500394',6,'READ','Donation Accepted','DONATION_ACCEPTED',2),(5,'2026-08-15 13:47:52.563505','Your food donation has been picked up by Hope Food Relief Foundation.','2026-08-15 14:31:21.374045',6,'READ','Donation Picked Up','DONATION_PICKED_UP',2),(6,'2026-08-15 13:48:15.085474','Your food donation has been successfully delivered by Hope Food Relief Foundation.','2026-08-15 14:31:20.136790',6,'READ','Donation Delivered','DONATION_DELIVERED',2),(7,'2026-08-15 14:10:16.892591','A new food donation Mottom Biriyani is available near your location.','2026-08-15 14:27:02.125455',7,'READ','New Food Donation Nearby','NEW_DONATION',6),(8,'2026-08-15 14:11:55.346860','Your food donation has been accepted by Hope Food Relief Foundation.','2026-08-15 14:31:17.444191',7,'READ','Donation Accepted','DONATION_ACCEPTED',2),(9,'2026-08-15 14:29:23.414348','Your food donation has been picked up by Hope Food Relief Foundation.','2026-08-15 14:31:15.903440',7,'READ','Donation Picked Up','DONATION_PICKED_UP',2),(10,'2026-08-15 14:30:50.789573','Your food donation has been successfully delivered by Hope Food Relief Foundation.','2026-08-15 14:31:14.386605',7,'READ','Donation Delivered','DONATION_DELIVERED',2),(11,'2026-08-15 14:51:00.919526','A new food donation Breakfast is available near your location.','2026-08-15 14:51:28.112457',8,'READ','New Food Donation Nearby','NEW_DONATION',6),(12,'2026-08-15 14:51:50.742237','Your food donation has been accepted by Hope Food Relief Foundation.','2026-08-15 14:52:38.555033',8,'READ','Donation Accepted','DONATION_ACCEPTED',2),(13,'2026-08-15 14:52:21.139623','Your food donation has been picked up by Hope Food Relief Foundation.','2026-08-15 14:52:34.997233',8,'READ','Donation Picked Up','DONATION_PICKED_UP',2),(14,'2026-08-15 14:52:44.534915','Your food donation has been successfully delivered by Hope Food Relief Foundation.','2026-08-15 14:52:57.990063',8,'READ','Donation Delivered','DONATION_DELIVERED',2),(15,'2026-08-16 10:54:13.214151','Your food donation has been successfully delivered by Hope Food Relief Foundation.','2026-08-16 10:54:58.481432',4,'READ','Donation Delivered','DONATION_DELIVERED',2),(16,'2026-08-16 10:58:06.856726','A new food donation Variety Rice is available near your location.','2026-08-16 10:58:35.793282',9,'READ','New Food Donation Nearby','NEW_DONATION',6),(17,'2026-08-16 10:58:06.862588','A new food donation Variety Rice is available near your location.',NULL,9,'UNREAD','New Food Donation Nearby','NEW_DONATION',9),(18,'2026-08-16 10:59:02.319278','Your food donation has been accepted by Hope Food Relief Foundation.','2026-08-16 10:59:12.064713',9,'READ','Donation Accepted','DONATION_ACCEPTED',2),(19,'2026-08-16 10:59:38.207391','Your food donation has been picked up by Hope Food Relief Foundation.','2026-08-16 11:00:16.197796',9,'READ','Donation Picked Up','DONATION_PICKED_UP',2),(20,'2026-08-16 10:59:56.338140','Your food donation has been successfully delivered by Hope Food Relief Foundation.','2026-08-16 11:00:09.736773',9,'READ','Donation Delivered','DONATION_DELIVERED',2),(21,'2026-08-16 13:18:30.825305','A new food donation full dinner meals is available near your location.','2026-08-16 13:19:56.993850',10,'READ','New Food Donation Nearby','NEW_DONATION',6),(22,'2026-08-16 13:18:30.835738','A new food donation full dinner meals is available near your location.',NULL,10,'UNREAD','New Food Donation Nearby','NEW_DONATION',9),(23,'2026-08-16 13:20:45.725287','Your food donation has been accepted by Hope Food Relief Foundation.','2026-08-16 13:21:05.326296',10,'READ','Donation Accepted','DONATION_ACCEPTED',2),(24,'2026-08-16 13:22:18.705222','Your food donation has been picked up by Hope Food Relief Foundation.','2026-08-16 13:22:30.360659',10,'READ','Donation Picked Up','DONATION_PICKED_UP',2),(25,'2026-08-16 13:22:34.333336','Your food donation has been successfully delivered by Hope Food Relief Foundation.','2026-08-16 13:22:42.549478',10,'READ','Donation Delivered','DONATION_DELIVERED',2);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(150) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('ADMIN','DONOR','FOUNDATION') NOT NULL,
  `status` enum('ACTIVE','INACTIVE','SUSPENDED') NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-08-14 09:10:15.195435','arun@gmail.com','Arun Kumar','$2a$10$9FH34oyC5ykEqpdNa3TNEOeLDKQlOUp9K7CZAceA9chyTRLUTM.Fa','9876543210','DONOR','ACTIVE','2026-08-16 13:57:13.881591'),(2,'2026-08-14 11:24:52.801366','paranthaman@gmail.com','Paranthaman','$2a$10$C7C4Jd42zxKptxY472kODuBfbnulF3Nj2gnkUqz3NyvgIJTrci3ZK','8148497159','DONOR','ACTIVE','2026-08-14 11:24:52.801366'),(3,'2026-08-14 11:44:36.709472','foundation@gmail.com','Helping Hands Foundation','$2a$10$eGgkfGUsj7lanYQOv9UAhe7PfeZfagf9exyDnzw69CXBLQcS.6s9q','9876543210','FOUNDATION','ACTIVE','2026-08-14 11:44:36.709472'),(4,'2026-08-14 12:03:00.249876','admin@gmail.com','FoodBridge Admin','$2a$10$z.Up4..bkt5GDnZTGWJoGefyZggtvN4hKeW5jhRlfNFV30d/4dr1K','9999999999','ADMIN','ACTIVE','2026-08-14 12:03:00.249876'),(5,'2026-08-14 12:41:57.724883','carefoundation@gmail.com','Care & Support Foundation','$2a$10$JXaOPRDrb7xd1pWWyGuzeu2P6/BXLHOSzumve4O2tQuIXHp5impy2','9876501234','FOUNDATION','ACTIVE','2026-08-14 12:41:57.724883'),(6,'2026-08-14 16:23:55.923380','testfoundation@gmail.com','Test Foundation','$2a$10$MK37gU27dk0vQ5DJQDYvQOKMYiZDL1Mh2P8Ei7RP7cCwTW2TeIT.a','9876501234','FOUNDATION','ACTIVE','2026-08-14 16:23:55.923380'),(7,'2026-08-15 10:21:25.157185','rmkfoundation@gmail.com','RMK Foundation','$2a$10$aJ49Atay.MZHiYehgnkkg.EYYjkJWL7fGlZXW3uw1wZVqseHa9IXK','9585367723','FOUNDATION','ACTIVE','2026-08-16 14:03:37.497552'),(8,'2026-08-15 15:29:38.377458','prfoundation@gmail.com','PR Foundation','$2a$10$uHc9xebYeM/IWDmhC74HneqDIvXExWM2KpE.sVKuSy2RQvXfFlDsi','9585983341','FOUNDATION','ACTIVE','2026-08-16 14:08:12.711872'),(9,'2026-08-15 17:44:48.902704','jesijeni@gmail.com','Jesijeni Charitable Trust','$2a$10$uxGs5xGkii2R3ElNfmgIr.S1MQuu4UQqtdtd5i0.dhuKxY8NB9wnS','8825592287','FOUNDATION','ACTIVE','2026-08-15 18:36:51.064252'),(10,'2026-08-16 12:45:25.923248','sathyafoundation@gmail.com','SathyaFoundation','$2a$10$MxIUZLzTwcQ8RxxJX27myOY4FwhfijJxjLjz2yXdqrQTFkS3/i72i',NULL,'FOUNDATION','ACTIVE','2026-08-16 12:45:25.923248'),(11,'2026-08-16 12:54:54.132719','udhavumnanbargal@gmail.com','Udhavum Nanbargal','$2a$10$z6lI/sChJNRV9KZdw6KyeetKRXmUz/Cy.BIzv9OjyfRqnVm5AuhNm','9856347021','FOUNDATION','ACTIVE','2026-08-16 13:03:10.487977');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-16 15:56:22
