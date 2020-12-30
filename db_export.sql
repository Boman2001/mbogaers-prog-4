-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server versie:                10.4.17-MariaDB-1:10.4.17+maria~bionic - mariadb.org binary distribution
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Versie:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Databasestructuur van studenthome wordt geschreven
DROP DATABASE IF EXISTS `studenthome`;
CREATE DATABASE IF NOT EXISTS `studenthome` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `studenthome`;

-- Structuur van  tabel studenthome.inhabitants wordt geschreven
DROP TABLE IF EXISTS `inhabitants`;
CREATE TABLE IF NOT EXISTS `inhabitants` (
  `UserID` int(10) unsigned NOT NULL,
  `StudenthomeID` int(10) unsigned NOT NULL,
  `SignedUpOn` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`UserID`,`StudenthomeID`),
  KEY `fk_inhabitants_studentenhome` (`StudenthomeID`),
  CONSTRAINT `fk_inhabitants_studentenhome` FOREIGN KEY (`StudenthomeID`) REFERENCES `studenthome` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_inhabitants_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel studenthome.inhabitants: ~3 rows (ongeveer)
DELETE FROM `inhabitants`;
/*!40000 ALTER TABLE `inhabitants` DISABLE KEYS */;
INSERT INTO `inhabitants` (`UserID`, `StudenthomeID`, `SignedUpOn`) VALUES
	(14, 8, '2020-12-29 15:12:46'),
	(18, 8, '2020-12-29 15:03:33'),
	(19, 8, '2020-12-29 15:03:09'),
	(20, 8, '2020-12-29 00:00:00');
/*!40000 ALTER TABLE `inhabitants` ENABLE KEYS */;

-- Structuur van  tabel studenthome.meal wordt geschreven
DROP TABLE IF EXISTS `meal`;
CREATE TABLE IF NOT EXISTS `meal` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(32) NOT NULL,
  `Description` varchar(64) NOT NULL,
  `Ingredients` varchar(64) NOT NULL,
  `Allergies` varchar(32) NOT NULL,
  `CreatedOn` date NOT NULL DEFAULT current_timestamp(),
  `OfferedOn` date NOT NULL,
  `Price` int(10) unsigned NOT NULL,
  `UserID` int(10) unsigned NOT NULL,
  `StudenthomeID` int(10) unsigned NOT NULL,
  `MaxParticipants` int(10) unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fK_meal_user` (`UserID`),
  KEY `fk_meal_studentenhome` (`StudenthomeID`),
  CONSTRAINT `fK_meal_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_meal_studentenhome` FOREIGN KEY (`StudenthomeID`) REFERENCES `studenthome` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel studenthome.meal: ~6 rows (ongeveer)
DELETE FROM `meal`;
/*!40000 ALTER TABLE `meal` DISABLE KEYS */;
INSERT INTO `meal` (`ID`, `Name`, `Description`, `Ingredients`, `Allergies`, `CreatedOn`, `OfferedOn`, `Price`, `UserID`, `StudenthomeID`, `MaxParticipants`) VALUES
	(1, 'Zuurkool met worst', 'Zuurkool a la Montizaan, specialiteit van het huis.', 'Zuurkool, worst, spekjes', 'Lactose, gluten', '2020-09-01', '2020-09-01', 5, 1, 1, 10),
	(2, 'Spaghetti', 'Spaghetti Bolognese', 'Pasta, tomatensaus, gehakt', 'Lactose', '2020-09-01', '2020-09-01', 3, 1, 1, 15),
	(3, '<string>', '<string>', '<string>', '<string>', '2020-12-29', '2025-09-01', 55, 6, 8, 60),
	(4, '<string>', '<string>', '<string>', '<string>', '2020-12-29', '2025-09-01', 54, 6, 8, 60),
	(5, '<string>', '<string>', '<string>', '<string>', '2020-12-29', '2025-09-01', 55, 6, 8, 60),
	(6, '<string>', '<string>', '<string>', '<string>', '2020-12-29', '2023-09-01', 55, 6, 8, 60);
/*!40000 ALTER TABLE `meal` ENABLE KEYS */;

-- Structuur van  tabel studenthome.participants wordt geschreven
DROP TABLE IF EXISTS `participants`;
CREATE TABLE IF NOT EXISTS `participants` (
  `UserID` int(10) unsigned NOT NULL,
  `StudenthomeID` int(10) unsigned NOT NULL,
  `MealID` int(10) unsigned NOT NULL,
  `SignedUpOn` date NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`UserID`,`StudenthomeID`,`MealID`),
  KEY `fk_participants_studentenhome` (`StudenthomeID`),
  KEY `fk_participants_meal` (`MealID`),
  CONSTRAINT `fk_participants_meal` FOREIGN KEY (`MealID`) REFERENCES `meal` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_participants_studentenhome` FOREIGN KEY (`StudenthomeID`) REFERENCES `studenthome` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_participants_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel studenthome.participants: ~1 rows (ongeveer)
DELETE FROM `participants`;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` (`UserID`, `StudenthomeID`, `MealID`, `SignedUpOn`) VALUES
	(6, 8, 3, '2020-12-30');
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;

-- Structuur van  tabel studenthome.studenthome wordt geschreven
DROP TABLE IF EXISTS `studenthome`;
CREATE TABLE IF NOT EXISTS `studenthome` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(32) NOT NULL,
  `Address` varchar(32) NOT NULL,
  `House_Nr` int(10) unsigned NOT NULL,
  `UserID` int(10) unsigned NOT NULL,
  `Postal_Code` varchar(256) NOT NULL,
  `Telephone` varchar(256) NOT NULL,
  `City` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `fk_studenthome_user` (`UserID`),
  CONSTRAINT `fk_studenthome_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel studenthome.studenthome: ~6 rows (ongeveer)
DELETE FROM `studenthome`;
/*!40000 ALTER TABLE `studenthome` DISABLE KEYS */;
INSERT INTO `studenthome` (`ID`, `Name`, `Address`, `House_Nr`, `UserID`, `Postal_Code`, `Telephone`, `City`) VALUES
	(1, 'Princenhage', 'Princenhage', 11, 1, '4706RX', '061234567891', 'Breda'),
	(2, 'Haagdijk 23', 'Haagdijk', 4, 1, '4706RX', '061234567891', 'Breda'),
	(3, 'Den Hout', 'Lovensdijkstraat', 61, 1, '4706RX', '061234567891', 'Den Hout'),
	(4, '<string>', 'Langendijk', 63, 6, '4706RX', '061234567891', 'Breda'),
	(5, 'Lovensdijk', 'Lovensdijkstraat', 62, 1, '4706RX', '061234567891', 'Breda'),
	(8, '<string>', '<string>', 93, 6, '<string>', '<string>', '<email>');
/*!40000 ALTER TABLE `studenthome` ENABLE KEYS */;

-- Structuur van  tabel studenthome.user wordt geschreven
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `First_Name` varchar(32) NOT NULL,
  `Last_Name` varchar(32) NOT NULL,
  `Email` varchar(32) NOT NULL,
  `Student_Number` varchar(32) NOT NULL,
  `Password` char(64) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel studenthome.user: ~17 rows (ongeveer)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`ID`, `First_Name`, `Last_Name`, `Email`, `Student_Number`, `Password`) VALUES
	(1, 'Jan', 'Smit', 'jsmit@server.nl', '222222', 'secret'),
	(2, 'Mark', 'Rutte', 'mark@rutte.nl', '333333', 'vvddegekste'),
	(3, 'Dion', 'Koeze', 'dion@koeze.nl', '444444', 'krispijn'),
	(4, 'Corona', 'Virus', 'covid19@who.nl', '555555', 'walter'),
	(6, '<string>', '<string>', '<email>', '<string>', '$2b$10$qto6THvVgFmbun0Bw1eXquYlT9DHf3QmrF9G0UYaOSOcXM6hFaxqi'),
	(7, '<string>', '<string>', '<email>', '<string>', '$2b$10$cWFckcpTl2aR17dIZ5ooTunkvNm764r1p.sBncq6rfmG4TOInpwgS'),
	(8, '<string>', '<string>', '<email>', '<string>', '$2b$10$c0EWcOUqqcg8vnjxbU0VouKA513ZCKOlJbQvSe6rsdzdVbpK5FA4G'),
	(9, '<string>', '<string>', '<email>', '<string>', '$2b$10$GK9HuugL6XUvUIloGfVBp.oukHe/tb45hodPzl2hXmm6G4/qHr/g2'),
	(10, '<string>', '<string>', '<email>', '<string>', '$2b$10$WB6tnuj2ocl2CLed2XYy8OilApFTeIBAimj3EyxGhmM6mrN5CwC.G'),
	(11, '<string>', '<string>', '<email>', '<string>', '$2b$10$sbJk2Au7Hon7ddgqMuBZ4e5v2NQct4sZ7ZDP4auYoDBmPC4/ho45.'),
	(12, '<string>', '<string>', '<email>', '<string>', '$2b$10$qDzW/GR96EiAfxd5ljXuyONRAzISvwAD/wxbVp8EGQdLCBmSTu1im'),
	(13, '<string>', '<string>', '<email>', '<string>', '$2b$10$NBtH.Oqnpdc7BkP2h5QRqefhL4lQu0Psz19fYLAzO6VpmcLGkwvca'),
	(14, '<string>', '<string>', '<email>', '<string>', '$2b$10$3q2iHbA.YdcpFTuYUPjnxO.GceWeeZAR83jmimq7qbOLA2HXJoGjC'),
	(15, '<string>', '<string>', '<email>', '<string>', '$2b$10$pdJ/AjsPzBSORK9gIBuxheWAZcSo1X/ooMpUvEf.3/WSf1CZdtHTC'),
	(16, '<string>', '<string>', '<email>', '<string>', '$2b$10$yEnjopGuvPL31UVuktBbf.BbiYP.gjU/F8v38DnRXMgeMt57N62ki'),
	(17, '<string>', '<string>', '<email>', '<string>', '$2b$10$hHNtBpZl35OS71E/4//es.p0ysWneZ4tR2UMsh99PmoENv9aFgL.S'),
	(18, '<string>', '<string>', '<email>', '<string>', '$2b$10$ilwu6dgO.zJQouohaS.WieroavTaddzbyM2djz1cuwo5Elzkn.yM2'),
	(19, '<string>', '<string>', '<email>', '<string>', '$2b$10$tFNBF19Lzt1GQpKK4kFB2OVMj9aCCATeJcAl14z7u/gfDzj4euOsa'),
	(20, '<string>', '<string>', '<email>', '<string>', '$2b$10$hvOUs4oAke7wa1BMX4wYbuxpzsG7zIHZEGV.JdwrrgOniq3pes1fO'),
	(21, '<string>', '<string>', '<email>', '<string>', '$2b$10$VYXEmRMaB76DB3CRGU7joOIZ8xUIbJ5SCEG1tQ0MsFh0c3BnyMCEe');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Structuur van  view studenthome.view_participants wordt geschreven
DROP VIEW IF EXISTS `view_participants`;
-- Tijdelijke tabel wordt aangemaakt zodat we geen VIEW afhankelijkheidsfouten krijgen
CREATE TABLE `view_participants` (
	`StudenthomeID` INT(10) UNSIGNED NOT NULL,
	`MealID` INT(10) UNSIGNED NOT NULL,
	`First_Name` VARCHAR(32) NULL COLLATE 'latin1_swedish_ci',
	`Last_Name` VARCHAR(32) NULL COLLATE 'latin1_swedish_ci',
	`Email` VARCHAR(32) NULL COLLATE 'latin1_swedish_ci',
	`Student_Number` VARCHAR(32) NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Structuur van  view studenthome.view_studenthome wordt geschreven
DROP VIEW IF EXISTS `view_studenthome`;
-- Tijdelijke tabel wordt aangemaakt zodat we geen VIEW afhankelijkheidsfouten krijgen
CREATE TABLE `view_studenthome` (
	`ID` INT(10) UNSIGNED NOT NULL,
	`Name` VARCHAR(32) NOT NULL COLLATE 'latin1_swedish_ci',
	`Address` VARCHAR(32) NOT NULL COLLATE 'latin1_swedish_ci',
	`House_Nr` INT(10) UNSIGNED NOT NULL,
	`Postal_Code` VARCHAR(256) NOT NULL COLLATE 'latin1_swedish_ci',
	`Telephone` VARCHAR(256) NOT NULL COLLATE 'latin1_swedish_ci',
	`City` VARCHAR(256) NOT NULL COLLATE 'latin1_swedish_ci',
	`Contact` VARCHAR(65) NULL COLLATE 'latin1_swedish_ci',
	`Email` VARCHAR(32) NULL COLLATE 'latin1_swedish_ci',
	`Student_Number` VARCHAR(32) NULL COLLATE 'latin1_swedish_ci'
) ENGINE=MyISAM;

-- Structuur van  view studenthome.view_participants wordt geschreven
DROP VIEW IF EXISTS `view_participants`;
-- Tijdelijke tabel wordt verwijderd, en definitieve VIEW wordt aangemaakt.
DROP TABLE IF EXISTS `view_participants`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_participants` AS select `participants`.`StudenthomeID` AS `StudenthomeID`,`participants`.`MealID` AS `MealID`,`user`.`First_Name` AS `First_Name`,`user`.`Last_Name` AS `Last_Name`,`user`.`Email` AS `Email`,`user`.`Student_Number` AS `Student_Number` from (`participants` left join `user` on(`participants`.`UserID` = `user`.`ID`));

-- Structuur van  view studenthome.view_studenthome wordt geschreven
DROP VIEW IF EXISTS `view_studenthome`;
-- Tijdelijke tabel wordt verwijderd, en definitieve VIEW wordt aangemaakt.
DROP TABLE IF EXISTS `view_studenthome`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_studenthome` AS select `studenthome`.`ID` AS `ID`,`studenthome`.`Name` AS `Name`,`studenthome`.`Address` AS `Address`,`studenthome`.`House_Nr` AS `House_Nr`,`studenthome`.`Postal_Code` AS `Postal_Code`,`studenthome`.`Telephone` AS `Telephone`,`studenthome`.`City` AS `City`,concat(`user`.`First_Name`,' ',`user`.`Last_Name`) AS `Contact`,`user`.`Email` AS `Email`,`user`.`Student_Number` AS `Student_Number` from (`studenthome` left join `user` on(`studenthome`.`UserID` = `user`.`ID`));

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
