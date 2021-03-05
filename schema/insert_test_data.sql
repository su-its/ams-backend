-- MySQL dump 10.16  Distrib 10.1.48-MariaDB, for debian-linux-gnueabihf (armv7l)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0+deb9u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `test`
--

/*CREATE DATABASE /*!32312 IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 ;*/

USE `Entering_And_Leaving_The_Room`;

--
-- Table structure for table `access_logs`
--

DROP TABLE IF EXISTS `access_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access_logs` (
  `user_id` int(10) unsigned NOT NULL,
  `entered_at` datetime NOT NULL,
  `exited_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`entered_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_logs`
--

LOCK TABLES `access_logs` WRITE;
/*!40000 ALTER TABLE `access_logs` DISABLE KEYS */;
INSERT INTO `access_logs` VALUES (2345,'2021-03-01 14:53:05','2021-03-01 14:53:26'),(50911044,'2020-12-10 11:45:00','2020-12-10 21:07:57'),(50911044,'2020-12-11 14:13:20','2020-12-11 21:04:01'),(50911044,'2020-12-17 12:45:31','2020-12-17 19:59:51'),(50911044,'2020-12-17 20:00:06','2020-12-17 20:00:12'),(50911044,'2020-12-21 18:02:55','2020-12-21 20:24:50'),(50911044,'2020-12-21 20:25:08','2020-12-21 20:25:16'),(50911044,'2021-01-05 11:13:45','2021-01-05 20:03:32'),(50911044,'2021-01-06 14:05:50','2021-01-06 16:11:01'),(50911044,'2021-01-06 16:11:11','2021-01-06 17:02:03'),(50911044,'2021-01-08 17:18:43','2021-01-08 18:22:46'),(50911044,'2021-01-14 11:49:36','2021-01-14 13:53:20'),(50911044,'2021-01-14 13:58:58','2021-01-14 13:59:56'),(50911044,'2021-01-18 18:05:31','2021-01-18 20:32:25'),(50911044,'2021-01-19 16:26:20','2021-01-19 19:46:28'),(50911044,'2021-01-21 12:59:54','2021-01-22 16:14:03'),(50911044,'2021-01-22 16:14:09','2021-01-22 20:00:43'),(50911044,'2021-01-25 17:33:48','2021-01-25 19:07:41'),(50911044,'2021-01-27 16:41:24','2021-01-27 17:53:20'),(50911044,'2021-01-28 12:19:51','2021-01-28 13:24:20'),(50911044,'2021-01-28 15:00:01','2021-01-28 19:03:15'),(50911044,'2021-01-29 16:23:14','2021-01-29 19:02:24'),(50911044,'2021-02-01 14:02:15','2021-02-01 14:14:32'),(50911044,'2021-02-01 14:20:12','2021-02-01 17:51:06'),(50911044,'2021-02-03 14:13:26','2021-02-03 18:34:01'),(50911044,'2021-02-04 11:45:24','2021-02-04 17:46:35'),(50911044,'2021-02-05 13:46:42','2021-02-05 18:54:59'),(50911044,'2021-02-08 12:00:05','2021-02-08 12:35:15'),(50911044,'2021-02-08 12:53:36','2021-02-08 19:04:15'),(50911044,'2021-02-10 15:55:12','2021-02-10 18:39:43'),(50911044,'2021-02-12 11:12:52','2021-02-12 18:44:03'),(50911044,'2021-02-13 14:36:52','2021-02-13 16:59:16'),(50911044,'2021-02-15 11:41:50','2021-02-15 23:59:59'),(50911044,'2021-02-16 12:26:33','2021-02-16 17:26:29'),(50911044,'2021-02-17 15:30:36','2021-02-17 19:11:58'),(50911044,'2021-02-18 13:29:13','2021-02-18 17:04:48'),(50911044,'2021-02-18 17:04:56','2021-02-18 19:56:30'),(50911044,'2021-02-24 12:49:53','2021-02-24 14:42:34'),(50920604,'2020-12-21 13:07:25','2020-12-21 13:07:30'),(70010033,'2021-01-04 15:59:35','2021-01-04 16:00:54'),(70010033,'2021-01-05 16:41:01','2021-01-05 20:02:52'),(70010033,'2021-02-01 15:38:22','2021-02-01 15:45:33'),(70010050,'2020-12-21 17:20:19','2020-12-21 17:43:31'),(70010050,'2021-01-04 13:53:21','2021-01-04 15:59:50'),(70010050,'2021-01-05 18:18:37','2021-01-05 20:03:22'),(70010050,'2021-01-06 13:04:23','2021-01-06 15:49:09'),(70010050,'2021-01-21 11:48:21','2021-01-21 12:55:35'),(70010050,'2021-01-21 14:47:15','2021-01-21 20:33:11'),(70010050,'2021-01-22 16:09:31','2021-01-22 16:11:49'),(70010050,'2021-01-22 17:40:39','2021-01-22 19:51:51'),(70010050,'2021-01-28 17:38:52','2021-01-28 19:01:06'),(70010050,'2021-02-01 15:38:01','2021-02-01 15:45:41'),(70010050,'2021-02-05 13:42:26','2021-02-05 18:54:09'),(70010050,'2021-02-15 16:46:41','2021-02-15 19:20:53'),(70010050,'2021-02-16 15:20:10','2021-02-16 15:33:47'),(70010086,'2020-12-10 13:10:38','2020-12-10 13:29:03'),(70011068,'2021-01-21 17:11:32','2021-01-21 21:00:00'),(70012004,'2020-12-08 17:58:04','2020-12-08 17:58:09'),(70012004,'2020-12-09 17:42:49','2020-12-09 17:42:53'),(70012004,'2021-01-05 10:53:48','2021-01-05 14:17:13'),(70012004,'2021-01-06 13:04:32','2021-01-08 15:59:51'),(70012004,'2021-01-08 15:59:56','2021-01-08 18:17:16'),(70012004,'2021-01-12 16:31:36','2021-01-12 17:22:10'),(70012004,'2021-01-19 13:57:36','2021-01-19 19:21:35'),(70012004,'2021-01-20 12:59:16','2021-01-20 16:07:41'),(70012004,'2021-01-22 12:04:30','2021-01-22 18:18:29'),(70012004,'2021-01-26 13:54:11','2021-01-26 14:17:41'),(70012004,'2021-01-26 16:06:13','2021-01-26 18:13:54'),(70012004,'2021-01-27 16:41:44','2021-01-27 17:05:53'),(70012004,'2021-01-28 12:19:36','2021-01-28 16:38:02'),(70012004,'2021-01-29 15:59:45','2021-01-29 16:09:33'),(70012004,'2021-02-05 13:37:47','2021-02-05 16:55:33'),(70012051,'2021-01-21 16:37:55','2021-01-21 17:10:43'),(70012051,'2021-01-22 16:54:27','2021-01-22 20:00:21'),(70012051,'2021-01-26 18:14:18','2021-01-26 18:59:21'),(70012051,'2021-02-05 18:53:53','2021-02-05 18:53:53'),(70012051,'2021-02-15 15:23:44','2021-02-15 19:33:34'),(70012051,'2021-02-27 17:16:43','2021-02-27 19:15:58'),(70612030,'2021-02-08 15:42:58','2021-02-08 15:48:00'),(70710075,'2021-01-26 18:14:00','2021-01-26 19:30:02'),(70710075,'2021-01-28 11:27:05','2021-01-28 11:42:25'),(70710075,'2021-02-19 14:35:15','2021-02-19 15:40:21'),(70710075,'2021-02-19 16:34:13','2021-02-19 19:09:08'),(70710075,'2021-02-26 14:07:49','2021-02-26 14:07:56'),(70710075,'2021-02-26 14:21:22','2021-02-26 17:18:08'),(70710101,'2021-01-19 19:31:05','2021-01-19 19:31:18'),(70710101,'2021-01-26 17:31:19','2021-01-26 18:59:34'),(70710101,'2021-02-03 13:11:00','2021-02-04 18:45:08'),(70710101,'2021-02-12 13:31:38','2021-02-12 14:04:55'),(70710101,'2021-02-12 16:39:58','2021-02-12 18:44:08'),(70710101,'2021-02-19 15:18:20','2021-02-19 15:39:58'),(70710101,'2021-02-19 16:34:07','2021-02-19 19:08:49'),(70710101,'2021-02-22 13:16:49','2021-02-22 13:16:57'),(70710101,'2021-02-22 13:38:51','2021-02-22 14:35:11'),(70710101,'2021-02-22 14:35:26','2021-02-22 14:41:15'),(70710101,'2021-02-22 14:41:41','2021-02-22 23:59:59'),(70711023,'2021-01-25 12:11:40','2021-01-25 14:28:06'),(70712021,'2021-02-08 15:43:03','2021-02-08 15:48:00'),(70712026,'2021-02-19 16:33:59','2021-02-19 23:59:59'),(70810007,'2021-01-28 18:29:24','2021-01-28 18:29:33'),(70810015,'2020-12-08 18:01:47','2020-12-08 18:10:30'),(70810015,'2020-12-10 17:57:05','2020-12-10 18:00:54'),(70810015,'2020-12-11 17:39:59','2020-12-11 18:38:53'),(70810015,'2021-01-19 16:56:41','2021-01-19 17:43:37'),(70810015,'2021-01-20 10:55:11','2021-01-20 11:00:47'),(70810015,'2021-01-28 17:37:10','2021-01-28 17:59:30'),(70810015,'2021-02-04 15:56:59','2021-02-04 17:23:24'),(70810015,'2021-02-08 17:33:17','2021-02-08 18:02:12'),(70810015,'2021-02-12 16:39:52','2021-02-12 18:19:14'),(70810015,'2021-02-15 12:31:12','2021-02-15 12:33:18'),(70810015,'2021-02-15 18:43:20','2021-02-15 19:33:43'),(70810015,'2021-02-19 17:00:24','2021-02-19 17:17:44'),(70810015,'2021-02-19 17:22:36','2021-02-19 17:37:14'),(70810015,'2021-02-24 16:10:15','2021-02-24 16:10:23'),(70810015,'2021-02-24 16:10:34','2021-02-24 16:15:02'),(70810032,'2020-12-21 12:36:25','2021-01-08 17:19:13'),(70810032,'2021-01-08 17:19:22','2021-01-08 18:23:09'),(70810032,'2021-01-13 16:35:19','2021-01-14 13:59:56'),(70810032,'2021-01-18 18:10:51','2021-01-18 18:40:00'),(70810032,'2021-01-19 14:16:23','2021-01-19 14:16:27'),(70810032,'2021-01-19 18:31:30','2021-01-19 18:31:33'),(70810032,'2021-01-20 12:58:26','2021-01-20 16:08:22'),(70810032,'2021-01-20 17:11:51','2021-01-20 17:11:57'),(70810032,'2021-01-21 12:59:19','2021-01-21 13:00:29'),(70810032,'2021-01-21 13:00:35','2021-01-21 13:04:16'),(70810032,'2021-01-21 13:04:21','2021-01-21 17:10:24'),(70810032,'2021-01-26 17:52:56','2021-01-26 17:52:59'),(70810039,'2021-01-28 14:10:25','2021-01-28 14:11:12'),(70910003,'2021-01-21 13:34:09','2021-01-21 13:38:56'),(70910003,'2021-02-04 15:30:23','2021-02-04 17:43:41'),(70910019,'2021-01-25 12:30:00','2021-01-25 19:07:36'),(70910019,'2021-02-01 13:27:54','2021-02-01 14:37:46'),(70910026,'2020-12-18 16:15:53','2020-12-18 17:03:37'),(70910027,'2020-12-11 21:04:26','2020-12-11 21:04:30'),(70910027,'2020-12-17 12:21:16','2020-12-17 15:46:43'),(70910027,'2020-12-22 18:01:12','2020-12-22 18:06:43'),(70910027,'2021-02-01 09:22:19','2021-02-01 15:05:15'),(70910027,'2021-02-15 14:43:52','2021-02-15 14:44:29'),(70910027,'2021-02-16 14:30:25','2021-02-16 23:59:59'),(70910059,'2020-12-10 21:08:23','2020-12-10 21:08:30'),(70910059,'2020-12-11 17:35:23','2020-12-11 21:03:57'),(70910059,'2020-12-12 15:04:58','2020-12-12 15:13:29'),(70910059,'2020-12-17 15:47:39','2020-12-17 15:51:41'),(70910059,'2020-12-18 16:15:12','2020-12-18 17:03:41'),(70910059,'2020-12-21 12:35:57','2020-12-21 13:06:59'),(70910059,'2020-12-21 14:44:48','2020-12-21 15:53:19'),(70910059,'2020-12-22 11:53:52','2020-12-22 12:44:04'),(70910059,'2020-12-22 14:45:37','2020-12-22 18:06:38'),(70910059,'2021-01-04 11:35:29','2021-01-04 11:35:43'),(70910059,'2021-01-04 12:52:21','2021-01-04 17:30:00'),(70910059,'2021-01-05 10:50:30','2021-01-05 14:34:13'),(70910059,'2021-01-06 09:43:00','2021-01-06 09:47:10'),(70910059,'2021-01-06 12:28:51','2021-01-06 12:32:19'),(70910059,'2021-01-06 12:54:24','2021-01-06 17:01:44'),(70910059,'2021-01-08 11:43:54','2021-01-08 11:44:46'),(70910059,'2021-01-08 12:17:04','2021-01-08 13:25:00'),(70910059,'2021-01-08 13:53:56','2021-01-08 13:54:03'),(70910059,'2021-01-08 15:59:21','2021-01-08 17:18:33'),(70910059,'2021-01-12 16:31:01','2021-01-12 17:05:29'),(70910059,'2021-01-13 16:34:57','2021-01-14 11:38:04'),(70910059,'2021-01-14 12:42:37','2021-01-14 12:42:44'),(70910059,'2021-01-14 14:04:22','2021-01-14 14:06:00'),(70910059,'2021-01-18 13:06:36','2021-01-18 13:06:57'),(70910059,'2021-01-18 13:07:02','2021-01-18 14:30:00'),(70910059,'2021-01-19 12:40:13','2021-01-19 14:49:40'),(70910059,'2021-01-19 14:51:12','2021-01-19 17:48:49'),(70910059,'2021-01-21 11:47:25','2021-01-21 20:39:30'),(70910059,'2021-01-22 11:04:42','2021-01-22 14:02:43'),(70910059,'2021-01-22 15:58:06','2021-01-22 20:00:37'),(70910059,'2021-01-25 12:03:09','2021-01-25 12:55:13'),(70910059,'2021-01-25 15:14:32','2021-01-25 19:07:19'),(70910059,'2021-01-26 10:10:03','2021-01-26 17:52:52'),(70910059,'2021-01-28 13:16:35','2021-01-28 13:24:04'),(70910059,'2021-01-28 15:00:19','2021-01-28 18:02:29'),(70910059,'2021-01-29 12:28:53','2021-01-29 14:04:51'),(70910059,'2021-01-29 15:57:21','2021-01-29 17:31:01'),(70910059,'2021-02-01 15:57:32','2021-02-01 17:50:50'),(70910059,'2021-02-04 11:46:47','2021-02-04 17:46:04'),(70910059,'2021-02-05 13:06:08','2021-02-05 13:48:17'),(70910059,'2021-02-05 15:27:03','2021-02-05 16:33:09'),(70910059,'2021-02-05 16:47:14','2021-02-05 18:54:51'),(70910059,'2021-02-08 11:09:06','2021-02-08 12:49:48'),(70910059,'2021-02-08 14:16:10','2021-02-08 19:04:34'),(70910059,'2021-02-10 12:19:40','2021-02-10 19:02:35'),(70910059,'2021-02-12 13:31:25','2021-02-12 18:43:17'),(70910059,'2021-02-13 14:36:48','2021-02-13 15:22:05'),(70910059,'2021-02-13 15:22:08','2021-02-13 17:01:21'),(70910059,'2021-02-15 11:41:46','2021-02-15 19:21:14'),(70910059,'2021-02-16 12:26:24','2021-02-16 14:09:40'),(70910059,'2021-02-16 16:21:12','2021-02-16 16:30:10'),(70910059,'2021-02-26 14:20:09','2021-02-26 14:20:58'),(70910059,'2021-02-26 14:21:04','2021-02-26 17:10:15'),(70910059,'2021-02-27 12:15:57','2021-02-27 19:17:33'),(70910088,'2020-12-10 11:40:14','2020-12-10 21:07:44'),(70910088,'2020-12-11 13:24:45','2020-12-11 13:47:40'),(70910088,'2020-12-11 15:58:57','2020-12-11 16:04:21'),(70910088,'2020-12-12 12:21:55','2020-12-12 13:54:15'),(70910088,'2021-01-06 12:29:04','2021-01-06 12:32:22'),(70910088,'2021-01-13 16:38:58','2021-01-14 13:59:56'),(70910088,'2021-01-14 14:03:37','2021-01-14 14:03:45'),(70910088,'2021-01-25 17:28:49','2021-01-25 19:07:15'),(70910088,'2021-01-26 10:01:26','2021-01-26 16:20:26'),(70910088,'2021-02-01 14:20:04','2021-02-01 17:51:00'),(70910088,'2021-02-03 14:57:00','2021-02-03 18:33:27'),(70910088,'2021-02-04 13:59:14','2021-02-04 17:45:47'),(70910088,'2021-02-08 13:23:35','2021-02-08 19:04:44'),(70910088,'2021-02-10 13:20:01','2021-02-10 19:03:21'),(70910088,'2021-02-12 11:01:20','2021-02-12 11:13:03'),(70910088,'2021-02-12 11:13:07','2021-02-12 18:43:24'),(70910088,'2021-02-15 12:09:56','2021-02-15 16:35:03'),(70910088,'2021-02-27 15:36:17','2021-02-27 16:29:47'),(70910702,'2020-12-09 12:33:04','2021-01-05 12:31:25'),(70910702,'2021-01-05 14:16:56','2021-01-05 14:17:04'),(70910702,'2021-01-19 12:25:05','2021-01-19 14:16:35'),(70910702,'2021-01-26 12:26:35','2021-01-26 14:17:54'),(70911046,'2020-12-08 17:53:03','2020-12-14 14:10:18'),(70911046,'2020-12-14 14:10:52','2020-12-14 19:14:11'),(70912006,'2021-01-25 16:17:44','2021-01-25 16:37:00'),(70912027,'2021-02-01 13:38:13','2021-02-01 13:38:17'),(70912042,'2020-12-07 20:52:27','2020-12-07 20:57:34'),(70912042,'2020-12-07 20:57:39','2020-12-07 20:57:43'),(70912042,'2020-12-08 19:16:42','2020-12-08 19:16:48'),(70912042,'2020-12-09 14:25:50','2020-12-09 19:52:50'),(70912042,'2020-12-10 16:09:58','2020-12-10 18:28:40'),(70912042,'2020-12-11 13:13:57','2020-12-11 21:04:17'),(70912042,'2020-12-14 13:03:34','2020-12-14 19:08:16'),(70912042,'2020-12-16 14:30:34','2020-12-16 18:02:45'),(70912042,'2020-12-17 12:11:37','2020-12-17 17:14:30'),(70912042,'2020-12-17 17:14:36','2020-12-17 20:47:20'),(70912042,'2020-12-21 13:07:12','2020-12-21 15:59:29'),(70912042,'2020-12-21 16:14:58','2020-12-21 18:59:33'),(70912042,'2020-12-21 20:30:45','2020-12-21 20:30:49'),(70912042,'2020-12-22 11:46:18','2020-12-22 19:54:08'),(70912042,'2020-12-22 21:18:29','2020-12-22 21:18:35'),(70912042,'2020-12-24 15:59:16','2020-12-24 17:39:53'),(70912042,'2021-01-04 12:51:57','2021-01-04 17:30:11'),(70912042,'2021-01-12 16:49:52','2021-01-12 18:04:37'),(70912042,'2021-01-13 12:05:18','2021-01-14 09:53:05'),(70912042,'2021-01-14 09:53:18','2021-01-14 09:57:16'),(70912042,'2021-01-14 13:59:04','2021-01-14 13:59:56'),(70912042,'2021-01-14 14:00:26','2021-01-14 14:06:34'),(70912042,'2021-01-14 14:08:09','2021-01-14 14:32:43'),(70912042,'2021-01-14 15:31:53','2021-01-14 15:36:01'),(70912042,'2021-01-14 15:36:16','2021-01-14 15:39:28'),(70912042,'2021-01-14 15:39:32','2021-01-14 15:39:37'),(70912042,'2021-01-14 15:39:40','2021-01-14 15:50:30'),(70912042,'2021-01-14 15:54:03','2021-01-14 15:58:51'),(70912042,'2021-01-14 16:02:11','2021-01-14 16:07:13'),(70912042,'2021-01-14 16:09:59','2021-01-14 16:33:49'),(70912042,'2021-01-14 16:38:01','2021-01-18 15:38:50'),(70912042,'2021-01-18 15:38:56','2021-01-18 15:39:00'),(70912042,'2021-01-18 15:39:04','2021-01-18 17:24:58'),(70912042,'2021-01-18 20:32:39','2021-01-18 20:32:45'),(70912042,'2021-01-19 12:02:52','2021-01-19 21:43:21'),(70912042,'2021-01-20 12:07:42','2021-01-20 18:56:43'),(70912042,'2021-01-21 13:06:58','2021-01-21 20:38:23'),(70912042,'2021-01-22 16:37:42','2021-01-22 20:00:34'),(70912042,'2021-01-25 12:51:00','2021-01-25 16:29:40'),(70912042,'2021-01-27 16:43:36','2021-01-27 19:34:15'),(70912042,'2021-01-28 12:15:05','2021-01-28 13:24:00'),(70912042,'2021-01-28 15:00:09','2021-01-28 19:03:04'),(70912042,'2021-01-29 15:58:54','2021-01-29 19:02:18'),(70912042,'2021-02-01 11:30:33','2021-02-01 16:23:01'),(70912042,'2021-02-03 14:17:23','2021-02-03 16:47:55'),(70912042,'2021-02-08 11:27:14','2021-02-08 15:25:26'),(70912042,'2021-02-08 18:03:58','2021-02-08 19:04:38'),(70912042,'2021-02-10 12:20:16','2021-02-10 18:39:33'),(70912042,'2021-02-12 12:56:18','2021-02-12 18:44:31'),(70912042,'2021-02-15 15:43:29','2021-02-15 19:26:34'),(70912042,'2021-02-16 14:36:11','2021-02-16 23:59:59'),(70912042,'2021-02-17 12:49:55','2021-02-17 19:12:33'),(70912042,'2021-02-18 12:11:42','2021-02-18 15:37:34'),(70912042,'2021-02-18 16:56:09','2021-02-18 17:04:20'),(70912042,'2021-02-18 17:04:32','2021-02-18 19:56:20'),(70912042,'2021-02-22 12:13:18','2021-02-22 19:33:31'),(70912042,'2021-02-23 14:39:50','2021-02-23 18:44:34'),(70912042,'2021-02-24 10:42:58','2021-02-24 18:41:15'),(70912042,'2021-02-27 12:05:10','2021-02-27 19:17:43'),(71030050,'2021-02-16 15:51:15','2021-02-16 16:00:13'),(71831003,'2021-02-16 15:46:22','2021-02-16 15:46:27'),(71930051,'2021-02-17 13:58:07','2021-02-17 16:48:36');
/*!40000 ALTER TABLE `access_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `in_room_users`
--

DROP TABLE IF EXISTS `in_room_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `in_room_users` (
  `user_id` int(10) unsigned NOT NULL,
  `entered_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `in_room_users`
--

LOCK TABLES `in_room_users` WRITE;
/*!40000 ALTER TABLE `in_room_users` DISABLE KEYS */;
INSERT INTO `in_room_users` VALUES (12312326,'2021-02-23 18:04:51'),(32132122,'2021-02-23 18:12:00'),(32232224,'2021-02-23 18:14:16'),(32232225,'2021-02-24 17:20:14');
/*!40000 ALTER TABLE `in_room_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-03 15:35:44
