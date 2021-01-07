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
CREATE DATABASE IF NOT EXISTS `studenthomeTest` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `studenthomeTest`;

-- Structuur van  tabel studenthome.inhabitants wordt geschreven
CREATE TABLE IF NOT EXISTS `inhabitants` (
  `UserID` int(10) unsigned NOT NULL,
  `StudenthomeID` int(10) unsigned NOT NULL,
  `SignedUpOn` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`UserID`,`StudenthomeID`),
  KEY `fk_inhabitants_studentenhome` (`StudenthomeID`),
  CONSTRAINT `fk_inhabitants_studentenhome` FOREIGN KEY (`StudenthomeID`) REFERENCES `studenthome` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_inhabitants_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumpen data van tabel studenthome.inhabitants: ~4 rows (ongeveer)
DELETE FROM `inhabitants`;
/*!40000 ALTER TABLE `inhabitants` DISABLE KEYS */;
INSERT INTO `inhabitants` (`UserID`, `StudenthomeID`, `SignedUpOn`) VALUES
	(14, 8, '2020-12-29 15:12:46'),
	(18, 8, '2020-12-29 15:03:33'),
	(19, 8, '2020-12-29 15:03:09'),
	(20, 8, '2020-12-29 00:00:00');
/*!40000 ALTER TABLE `inhabitants` ENABLE KEYS */;

-- Structuur van  tabel studenthome.meal wordt geschreven
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel studenthome.meal: ~6 rows (ongeveer)
DELETE FROM `meal`;
/*!40000 ALTER TABLE `meal` DISABLE KEYS */;
INSERT INTO `meal` (`ID`, `Name`, `Description`, `Ingredients`, `Allergies`, `CreatedOn`, `OfferedOn`, `Price`, `UserID`, `StudenthomeID`, `MaxParticipants`) VALUES
	(1, 'Zuurkool met worst', 'Zuurkool a la Montizaan, specialiteit van het huis.', 'Zuurkool, worst, spekjes', 'Lactose, gluten', '2020-09-01', '2020-09-01', 5, 1, 1, 10),
	(2, 'Spaghetti', 'Spaghetti Bolognese', 'Pasta, tomatensaus, gehakt', 'Lactose', '2020-09-01', '2020-09-01', 3, 1, 1, 15),
	(3, '<string>', '<string>', '<string>', '<string>', '2020-12-29', '2025-09-01', 55, 6, 8, 60),
	(4, '<string>', '<string>', '<string>', '<string>', '2020-12-29', '2025-09-01', 54, 6, 8, 60),
	(5, '46.92963632204793', '<string>', '<string>', '<string>', '2020-12-29', '2220-09-01', 55, 32, 8, 60),
	(6, '<string>', '<string>', '<string>', '<string>', '2020-12-29', '2023-09-01', 55, 6, 8, 60),
	(24, '33.143295667662144', '<string>', '<string>', '<string>', '2021-01-01', '2220-09-01', 55, 32, 8, 60),
	(26, '14.932168817922776', '<string>', '<string>', '<string>', '2021-01-01', '2220-09-01', 55, 32, 8, 60);
/*!40000 ALTER TABLE `meal` ENABLE KEYS */;

-- Structuur van  tabel studenthome.participants wordt geschreven
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
	(6, 8, 5, '2020-12-30');
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;

-- Structuur van  tabel studenthome.studenthome wordt geschreven
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
  UNIQUE KEY `Name` (`Name`),
  KEY `fk_studenthome_user` (`UserID`),
  CONSTRAINT `fk_studenthome_user` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel studenthome.studenthome: ~38 rows (ongeveer)
DELETE FROM `studenthome`;
/*!40000 ALTER TABLE `studenthome` DISABLE KEYS */;
INSERT INTO `studenthome` (`ID`, `Name`, `Address`, `House_Nr`, `UserID`, `Postal_Code`, `Telephone`, `City`) VALUES
	(1, 'Princenhage', 'Princenhage', 11, 1, '4706RX', '061234567891', 'Breda'),
	(2, 'Haagdijk 23', 'Haagdijk', 4, 1, '4706RX', '061234567891', 'Breda'),
	(3, 'Den Hout', 'Lovensdijkstraat', 61, 1, '4706RX', '061234567891', 'Den Hout'),
	(4, '2', 'Langendijk', 63, 6, '4706RX', '061234567891', 'Breda'),
	(5, '26.51981675825892', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(8, '<string>', '<string>', 93, 32, '<string>', '<string>', '<email>'),
	(9, '1', '<string>', 6, 32, '<string>', '<string>', '4921ZB'),
	(10, '11', '<string>', 6, 32, '<string>', '<string>', '<email>'),
	(11, '111', '<string>', 6, 32, '<string>', '<string>', '<email>'),
	(12, '1111', '<string>', 6, 32, '<string>', '<string>', '<email>'),
	(13, '11111', '<string>', 6, 32, '4921ZB', '0031636303815', '<email>'),
	(15, '48.92342779474098', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(16, '33.88346841323835', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(17, '22.21451616250204', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(19, '10.931386194485293', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(21, '29.085177365329173', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(23, '18.866745813001394', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(25, '38.7244777263134', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(27, '4.96196299085343', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(31, '36.262245035266325', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(32, '26.024192952927105', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(34, '25.788888962632317', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(36, '10.718089606322756', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(38, '18.099793797928044', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(40, '4.566307732048358', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(42, '31.622351943304672', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(44, '39.39240842056465', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(46, '34.1895602838465', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(48, '9.651790349046397', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(52, '45.62959084758575', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(56, '40.340248853265116', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(60, '29.34780685667844', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(62, '16.959994835504276', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(64, '19.36886191850529', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(66, '2.919466209767241', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(68, '5.410614566553818', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(70, '8.980704545362661', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(72, '47.83675574180217', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(99, '29.420991939836348', '<string>', 6, 32, '4921zb', '0031635343625', '<email>'),
	(103, '6.77951921955724', '<string>', 6, 32, '4921zb', '0031635343625', '<email>');
/*!40000 ALTER TABLE `studenthome` ENABLE KEYS */;

-- Structuur van  tabel studenthome.user wordt geschreven
CREATE TABLE IF NOT EXISTS `user` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `First_Name` varchar(32) NOT NULL,
  `Last_Name` varchar(32) NOT NULL,
  `Email` varchar(32) NOT NULL,
  `Student_Number` varchar(32) NOT NULL,
  `Password` char(64) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Student_Number` (`Student_Number`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;

-- Dumpen data van tabel studenthome.user: ~30 rows (ongeveer)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`ID`, `First_Name`, `Last_Name`, `Email`, `Student_Number`, `Password`) VALUES
	(1, 'Jan', 'Smit', 'jsmit@server.nl', '222222', 'secret'),
	(2, 'Mark', 'Rutte', 'mark@rutte.nl', '333333', 'vvddegekste'),
	(3, 'Dion', 'Koeze', 'dion@koeze.nl', '444444', 'krispijn'),
	(4, 'Corona', 'Virus', 'covid19@who.nl', '555555', 'walter'),
	(6, '<string>', '<string>', '<email>1', '<string>', '$2b$10$qto6THvVgFmbun0Bw1eXquYlT9DHf3QmrF9G0UYaOSOcXM6hFaxqi'),
	(14, '<string>', '<string>', '<email>', '999999999', '$2b$10$3q2iHbA.YdcpFTuYUPjnxO.GceWeeZAR83jmimq7qbOLA2HXJoGjC'),
	(15, '<string>', '<string>', '2', '9999999', '$2b$10$pdJ/AjsPzBSORK9gIBuxheWAZcSo1X/ooMpUvEf.3/WSf1CZdtHTC'),
	(16, '<string>', '<string>', '3', '999999', '$2b$10$yEnjopGuvPL31UVuktBbf.BbiYP.gjU/F8v38DnRXMgeMt57N62ki'),
	(17, '<string>', '<string>', '4', '99999', '$2b$10$hHNtBpZl35OS71E/4//es.p0ysWneZ4tR2UMsh99PmoENv9aFgL.S'),
	(18, '<string>', '<string>', '5', '9999', '$2b$10$ilwu6dgO.zJQouohaS.WieroavTaddzbyM2djz1cuwo5Elzkn.yM2'),
	(19, '<string>', '<string>', '6', '999', '$2b$10$tFNBF19Lzt1GQpKK4kFB2OVMj9aCCATeJcAl14z7u/gfDzj4euOsa'),
	(20, '<string>', '<string>', '7', '99', '$2b$10$hvOUs4oAke7wa1BMX4wYbuxpzsG7zIHZEGV.JdwrrgOniq3pes1fO'),
	(21, '<string>', '<string>', '8', '9', '$2b$10$VYXEmRMaB76DB3CRGU7joOIZ8xUIbJ5SCEG1tQ0MsFh0c3BnyMCEe'),
	(24, '<string>', '<string>', 'email@emailru.nl', '55', '$2b$10$aDMdcS3rMr6NcIPBCcyK7.pwXwUaOW0zLp4Ur5tanjmzNvOuUd.ne'),
	(25, '<string>', '<string>', 'email@email.org', '56', '$2b$10$2kOmFLn0BnpET7YMzvvTfO8VlzL9AelRViu7zl8dulVqYgJfRIYQm'),
	(30, 'herman', 'last', 'email@emailors.org', '202020', '$2b$10$a5gcuW03ML7OAmlNrAGySu.rEOccVrdJxjIc01ND08LQXIo5Skzcq'),
	(32, 'herman', 'last', 'email@emailors.o4rg', '26602020', '$2b$10$jgNp14Bn2406m.ycY.g6e.qfZVmvClfA6FYBSmlk17ozPVSn3T8gu'),
	(35, 'herman', 'last', '30.69636416705296@emailors.org', '30.69636416705296', '$2b$10$lgDl9LP0bsQA/ag3BJaYu.d7l7G9Tavfukl3Ux8qbgBoalsZxpmEa'),
	(36, 'herman', 'last', '26.058379734189664@emailors.org', '26.058379734189664', '$2b$10$FrpPs3R5KPyrAsj9Mp1h/u2iNzGEYOmcdUfhvz1ds62g4gBNfUjt2'),
	(37, 'herman', 'last', '19.336210252589147@emailors.org', '19.336210252589147', '$2b$10$WKFx183i73u9LTXU1bRA0.oen7TpziKPHRMOsdCAp7UHbkOgWNZWe'),
	(39, 'herman', 'last', '3.1495976990819186@emailors.org', '3.1495976990819186', '$2b$10$S.1Il6YMs3XQmYjqkrj53uke/abgaAOiva3gJmxM7Bpi4RoJgIBM.'),
	(41, 'herman', 'last', '15.624560752279493@emailors.org', '15.624560752279493', '$2b$10$Cpy2/rfRSPA.5s2KzFFqb.V6sLDKttxWaetWVx73hjLKs42kbe50i'),
	(43, 'herman', 'last', '18.464934648393914@emailors.org', '18.464934648393914', '$2b$10$LQlF2l6tXdKndMjPKw8juuSordaI6sWno1OKoeiIBuVeV0xNXcUQG'),
	(45, 'herman', 'last', '0.06414870306319376@emailors.org', '0.06414870306319376', '$2b$10$pZBx6J12prQM/1ujg1czsuei83Eui9t9ijTW5XwaMKkspbanQjyJ6'),
	(47, 'herman', 'last', '6.8806968960689385@emailors.org', '6.8806968960689385', '$2b$10$ee9nII/.FDkHEVrum7/m7OMGCa7i.ZEjU/GbWlBtWmNACJCm8Qz7m'),
	(49, 'herman', 'last', '26.10957525788291@emailors.org', '26.10957525788291', '$2b$10$h5jboxDDA1pv7IRphzoFGOfM1MhN3aGsLAs.IKVFfbtE8OY5DCivO'),
	(51, 'herman', 'last', '45.856913864525126@emailors.org', '45.856913864525126', '$2b$10$3/CX5zq9PhkjHR6r0zlO8O68hO.9OavUywK77Kln4XII0AiF3tlSK'),
	(53, 'herman', 'last', '1.625790027593399@emailors.org', '1.625790027593399', '$2b$10$y2OX.c6lHOGUTZkE5PJPHeKNJTwcEERJoXHadJApXO96Bn.NafJ6q'),
	(55, 'herman', 'last', '32.49008664749834@emailors.org', '32.49008664749834', '$2b$10$J4NaIDMFybsaCHtZ63IFZulgYBgQYi81mASYpT.8/bP6iq1/GfR6a'),
	(57, 'herman', 'last', '49.79671943241088@emailors.org', '49.79671943241088', '$2b$10$mw/OapiTTCRGgQSLpXXtqOOmR6w7GbPH3QW7eYvZV7hR2rYI6z33u'),
	(59, 'herman', 'last', '3.1729177307074696@emailors.org', '3.1729177307074696', '$2b$10$Ohv2v9W9Et27ixqxI8ovseWQ3jMWAzkj2j6jZ4gMm5jZA0cTqd11y'),
	(61, 'herman', 'last', '20.449901393553482@emailors.org', '20.449901393553482', '$2b$10$6TfH9TgtGOvr967buQTHxeAfIZasARn9sO24/Rz/t0lZtv9JuQcly'),
	(64, 'herman', 'last', '45.672099362463@emailors.org', '45.672099362463', '$2b$10$a2Bq7wnzqqDrcahbDYG7juoch857/3zHSd35AC/FCB/LXVOu918Mu'),
	(65, 'herman', 'last', '6.884959448575945@emailors.org', '6.884959448575945', '$2b$10$1/5isj2Ogi80t2YAiitoZewEnDAL3GLidshM9Y.mvlyPcT8ws4rV6'),
	(67, 'herman', 'last', '33.60342487093637@emailors.org', '33.60342487093637', '$2b$10$WqhYdIGGIgJukYGTenrvUOxyvquxlrChH.QIgmHOjfWd0.cvdXpai'),
	(69, 'herman', 'last', '40.0486538353078@emailors.org', '40.0486538353078', '$2b$10$byn9GXvvWxkFIrUNvtz1leYaO5JzYZ06XST2fwzurHtJBRWnsQe/a'),
	(72, 'herman', 'last', '47.836364543335186@emailors.org', '47.836364543335186', '$2b$10$mVkLf1fOOPG8Tjz4gejaNOlQp5AXntcY5tKpkLJBVxwLV/vCp84LO'),
	(73, 'herman', 'last', '4.517128761803779@emailors.org', '4.517128761803779', '$2b$10$IQ45AP7PktCOxyFydpiacOQcyAzHgA03y8rPlPl/C.0V4UShi2Q.6'),
	(76, 'herman', 'last', '23.002941949625853@emailors.org', '23.002941949625853', '$2b$10$TZhiliBlYDjcyJyhKFLE0ef2Dr/ci8xjb1MRM7hk4LGr0eI79wrNa'),
	(77, 'herman', 'last', '26.175487288004284@emailors.org', '26.175487288004284', '$2b$10$ek8KpnLgReow/XrNyTWVy.tf7oNbHtUcHdrugX2k8j5R/18aNIBr.');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

-- Structuur van  view studenthome.view_participants wordt geschreven
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
-- Tijdelijke tabel wordt verwijderd, en definitieve VIEW wordt aangemaakt.
DROP TABLE IF EXISTS `view_participants`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_participants` AS select `participants`.`StudenthomeID` AS `StudenthomeID`,`participants`.`MealID` AS `MealID`,`user`.`First_Name` AS `First_Name`,`user`.`Last_Name` AS `Last_Name`,`user`.`Email` AS `Email`,`user`.`Student_Number` AS `Student_Number` from (`participants` left join `user` on(`participants`.`UserID` = `user`.`ID`));

-- Structuur van  view studenthome.view_studenthome wordt geschreven
-- Tijdelijke tabel wordt verwijderd, en definitieve VIEW wordt aangemaakt.
DROP TABLE IF EXISTS `view_studenthome`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_studenthome` AS select `studenthome`.`ID` AS `ID`,`studenthome`.`Name` AS `Name`,`studenthome`.`Address` AS `Address`,`studenthome`.`House_Nr` AS `House_Nr`,`studenthome`.`Postal_Code` AS `Postal_Code`,`studenthome`.`Telephone` AS `Telephone`,`studenthome`.`City` AS `City`,concat(`user`.`First_Name`,' ',`user`.`Last_Name`) AS `Contact`,`user`.`Email` AS `Email`,`user`.`Student_Number` AS `Student_Number` from (`studenthome` left join `user` on(`studenthome`.`UserID` = `user`.`ID`));

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
