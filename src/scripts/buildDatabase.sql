--script for building the table used by closetMk2UI and closetMk2Service
USE restTest;
--NOTE: all test data will not be in prod
CREATE TABLE Users (
  userId INT PRIMARY KEY NOT NULL,
  username VARCHAR(45),
  password VARCHAR(64),
  role ENUM('user', 'admin'),
  lastLogin TIMESTAMP
);
--create a test admin with password foo
INSERT INTO Users VALUES(0,'testAdmin','2C26B46B68FFC68FF99B453C1D30413413422D706483BFA0F98A5E886266E7AE','admin',NOW());
--create a test user with password bar
INSERT INTO Users VALUES(0,'testUser','FCDE2B2EDBA56BF408601FB721FE9B5C338D10EE429EA04FAE5511B68FBF8FB9','user',NOW());
CREATE TABLE Access (
  id VARCHAR(45) PRIMARY KEY NOT NULL,
  secret VARCHAR(25)
);

CREATE TABLE RefOrg (
  referringOrganization VARCHAR(255) NOT NULL,
  referringProgOrLocation VARCHAR(255) NOT NULL,
  orgAddressOne VARCHAR(255),
  orgAddressTwo VARCHAR(255),
  orgAddressCity VARCHAR(100),
  orgAddressState VARCHAR(2),
  orgAddressZip VARCHAR(5),
  PRIMARY KEY (referringOrganization, referringProgOrLocation)
);
--Add example data for RefOrg
INSERT INTO RefOrg VALUES('Test Organization','Fake Town','123 Fake Street','','Anytown','CA',90000);
INSERT INTO RefOrg VALUES('Self','Self','','','','','');
--Create table for employees/individuals to make referrals
CREATE TABLE Employee (
  eid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(100),
  lastName VARCHAR(100),
  email VARCHAR(100),
  primaryPhone VARCHAR(10),
  primaryPhoneExt VARCHAR(5),
  cellPhone VARCHAR(10)
);
--create table tying employee to an organization
CREATE TABLE RefOrgEmployee (
	referringOrganization VARCHAR(255) NOT NULL,
	referringProgOrLocation VARCHAR(255) NOT NULL,
	eid INT NOT NULL UNIQUE,
	CONSTRAINT fk_roe_opl FOREIGN KEY (referringOrganization,referringProgOrLocation) REFERENCES RefOrg(referringOrganization,referringProgOrLocation),
	CONSTRAINT fk_roe_e FOREIGN KEY (eid) REFERENCES Employee(eid),
	PRIMARY KEY (referringOrganization,referringProgOrLocation,eid)
);
CREATE TABLE AgeRange (
  ageRange VARCHAR(20) PRIMARY KEY NOT NULL
);

INSERT INTO AgeRange VALUES('Newborn');
INSERT INTO AgeRange VALUES('Child');
INSERT INTO AgeRange VALUES('Youth');
INSERT INTO AgeRange VALUES('Adult');

CreateTable ClientId (
  clientId INT NOT NULL PRIMARY KEY
);
INSERT INTO ClientId VALUES(1);

CREATE TABLE Client (
  clientId INT PRIMARY KEY NOT NULL,
  ageRange VARCHAR(20) NOT NULL,
  gender ENUM('male','female','other'),
  clientFirstName VARCHAR(100),
  clientLastName VARCHAR(100),
  guardianFirstName VARCHAR(100),
  guardianLastName VARCHAR(100),
  guardianAddressOne VARCHAR(255),
  guardianAddressTwo VARCHAR(255),
  guardianCity VARCHAR(100),
  guardianState VARCHAR(2),
  guardianZip VARCHAR(5),
  guardianPhone VARCHAR(10),
  CONSTRAINT fk_ar_c FOREIGN KEY (ageRange) REFERENCES AgeRange(ageRange)
);

CREATE TABLE Situation (
  situation VARCHAR(100) PRIMARY KEY NOT NULL
);
INSERT INTO Situation VALUES('At risk youth');
INSERT INTO Situation VALUES('Child Protective Services');
INSERT INTO Situation VALUES('Disabled');
INSERT INTO Situation VALUES('Domestic Violence');
INSERT INTO Situation VALUES('Foster Child');
INSERT INTO Situation VALUES('Homeless');
INSERT INTO Situation VALUES('Incarceration/Re-entry');
INSERT INTO Situation VALUES('Interview');
INSERT INTO Situation VALUES('Juvenile Justice System');
INSERT INTO Situation VALUES('Mental Health');
INSERT INTO Situation VALUES('Military');
INSERT INTO Situation VALUES('Refugee');
INSERT INTO Situation VALUES('Single Parent');
INSERT INTO Situation VALUES('Substance abuse');
INSERT INTO Situation VALUES('Teen Mom');
INSERT INTO Situation VALUES('Transitional living');
INSERT INTO Situation VALUES('Unemployed ');
INSERT INTO Situation VALUES('Undocumented');
INSERT INTO Situation VALUES('Veteran');
INSERT INTO Situation VALUES('Disaster/Crisis');
INSERT INTO Situation VALUES('Other');

CREATE TABLE ClientSituation (
  clientId INT NOT NULL,
  situation VARCHAR(100) NOT NULL,
  CONSTRAINT fk_sit_cli FOREIGN KEY (clientId) REFERENCES Client(clientId),
  CONSTRAINT fk_sit_sit FOREIGN KEY (situation) REFERENCES Situation(situation),
  PRIMARY KEY (clientId,situation)
);

CREATE TABLE ClientOtherSituation (
  clientId INT PRIMARY KEY NOT NULL,
  situation VARCHAR(100) NOT NULL,
  CONSTRAINT fk_osit_cli FOREIGN KEY (clientId) REFERENCES Client(clientId)
);

CREATE TABLE ClientReasonForReferral (
  clientId INT PRIMARY KEY NOT NULL,
  situation VARCHAR(750),
  CONSTRAINT fk_resref_cli FOREIGN KEY (clientId) REFERENCES Client(clientId)
);
CREATE TABLE ShoeType (
  shoeType VARCHAR(10) PRIMARY KEY NOT NULL
);
INSERT INTO ShoeType VALUES('Toddler');
INSERT INTO ShoeType VALUES('Kids');
INSERT INTO ShoeType VALUES('Adults');

CREATE TABLE ReferralRequest (
  clientId INT PRIMARY KEY NOT NULL,
  clothesStylePreference VARCHAR(10),
  dressSize VARCHAR(5),
  shirtSize VARCHAR(5),
  jacketSize VARCHAR(5),
  pantsSize VARCHAR(5),
  pantsWaist VARCHAR(5),
  pantsLength VARCHAR(5),
  shoeSize VARCHAR(5),
  shoeType VARCHAR(10),
  womenShoeStylePreference VARCHAR(10),
  SpecialRequest VARCHAR(500),
  CONSTRAINT fk_rr_ci FOREIGN KEY (clientId) REFERENCES Client(clientId)
)
