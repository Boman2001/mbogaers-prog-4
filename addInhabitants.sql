DROP TABLE IF EXISTS `inhabitants` ;
CREATE TABLE IF NOT EXISTS `inhabitants` (
	`UserID` INT UNSIGNED NOT NULL,
	`StudenthomeID` INT UNSIGNED NOT NULL,
	`SignedUpOn` DATE NOT NULL,
	PRIMARY KEY (`UserID`, `StudenthomeID`)
) 
ENGINE = InnoDB;

ALTER TABLE `inhabitants` 
ADD CONSTRAINT `fk_inhabitants_user`
FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`)
ON DELETE NO ACTION
ON UPDATE CASCADE
,
ADD CONSTRAINT `fk_inhabitants_studentenhome`
FOREIGN KEY (`StudenthomeID`) REFERENCES `studenthome` (`ID`)
ON DELETE NO ACTION
ON UPDATE CASCADE;