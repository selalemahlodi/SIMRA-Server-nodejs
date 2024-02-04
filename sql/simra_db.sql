-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2023 at 11:44 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simra_db`
--

-- --------------------------------------------------------
--
-- Table structure for table `event`
--
CREATE TABLE Event (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    venue VARCHAR(255) NOT NULL,
    image_path VARCHAR(255),
    description TEXT NOT NULL
);
--
-- Table structure for table `mst_maker`
--

CREATE TABLE `mst_maker` (
  `mstdata_id` int(12) NOT NULL,
  `mstdata_names` varchar(225) NOT NULL,
  `ratio_mst` float NOT NULL,
  `count_mst` float NOT NULL,
  `count_estimate` float NOT NULL,
  `samplingId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `coordinate`
--

CREATE TABLE `coordinate` (
  `coorniadteId` int(11) NOT NULL,
  `longitude` varchar(100) DEFAULT NULL,
  `latitude` varchar(100) DEFAULT NULL,
  `samplingId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coordinate`
--

INSERT INTO `coordinate` (`coorniadteId`, `longitude`, `latitude`, `samplingId`) VALUES
(2, '-10.3565545', '-20.3656125', 7),
(3, '-10.3565545', '-20.3656125', 7),
(6, '28.2292712', '-25.7478676', 21),
(7, '28.2292712', '-25.7478676', 22),
(8, '28.2292712', '-25.7478676', 23),
(9, '28.2292712', '-25.7478676', 24),
(10, '28.2292712', '-25.7478676', 25);

--
-- Dumping data for table `mst_maker`
--

INSERT INTO `mst_maker` (`mstdata_id`, `mstdata_names`, `ratio_mst`, `count_mst`, `count_estimate`,`samplingId`) VALUES
(1, 'Cow', 0.66, 3, 6.1,20),
(2, 'Human', 1.1, 2, 4.2,22),
(3, 'Dog', 0.01, 3.1, 1.2,25),
(4, 'Pig', 1.3, 4.2, 3.3,26),
(5, 'Chicken', 1.2, 1.4, 1.1,27);

-- --------------------------------------------------------
-- Table structure for table `FIBdata`
--

CREATE TABLE `FIBdata` (
  `indicatorid` int(11) NOT NULL,
  `indicator_name` varchar(255) DEFAULT NULL,
  `ratio` decimal(10,0) NOT NULL,
  `count` decimal(10,0) NOT NULL,
  `countAverage` decimal(10,0) NOT NULL,
  `samplingId` int(11) DEFAULT NULL


) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- Dumping data for table `FIBdata`
--

INSERT INTO `FIBdata` (`indicatorid`, `indicator_name`, `ratio`, `count`, `countAverage`,`samplingId`) VALUES
(1, 'Coliforms',5,1,5,21),
(2, 'E. coli',6,3,18,24),
(3, 'Enterococcus ',6,3,18,23),
(4, 'Clostridium',6,3,18,25);

--
-- Table structure for table `hydrogensulfide`
--

CREATE TABLE `hydrogensulfide` (
  `id` int(11) NOT NULL,
  `status` varchar(100) DEFAULT NULL,
  `samplingId` int(11) DEFAULT NULL,
  `risk_type` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hydrogensulfide`
--

INSERT INTO `hydrogensulfide` (`id`, `status`, `samplingId`, `risk_type`) VALUES
(5, '0', 7, 'negative(No Risk)'),
(6, '1', 16, 'positive (Risk)'),
(7, '0', 17, 'Negative (No Risk)'),
(8, '1', 18, 'positive (Risk)'),
(9, '0', 19, 'Negative (No Risk)'),
(10, '1', 20, 'positive (Risk)');

-- --------------------------------------------------------

--
-- Table structure for table `microbial`
--

CREATE TABLE `microbial` (
  `microbialId` int(11) NOT NULL,
  `samplingId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `municipality`
--

CREATE TABLE `municipality` (
  `muni_id` int(11) NOT NULL,
  `muni_name` varchar(100) DEFAULT NULL,
  `province_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `parameters`
--

CREATE TABLE `parameters` (
  `parameterid` int(11) NOT NULL,
  `alpha` float DEFAULT NULL,
  `beta` float DEFAULT NULL,
  `r` float DEFAULT NULL,
  `k` float DEFAULT NULL,
  `NFifty` float DEFAULT NULL,
  `pathogenName` varchar(255) DEFAULT NULL,
  `indicatorid` int(11) NOT NULL,
  `pathogenResult` float DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Dumping data for table `parameters`
--

INSERT INTO `parameters` (`parameterid`, `alpha`, `beta`,`r`,`k`, `NFifty`, `pathogenName`, `indicatorid`, `pathogenResult`) VALUES
(1, NULL, NULL, 0.059,1, NULL, 'Cryptosporidium parvum', 2, 1.1),
(2, 0.4, 54.9, NULL, 3,NULL, 'E. coli O157:H7', 3, 2.3),
(3, 0.145, 7.58, NULL, 23, NULL, 'Campylobacter jejuni', 4, 1.0),
(4, NULL, NULL, NULL, 0.0199, NULL, 'Giardia lamblia', 5, 2.3);

--
-- Dumping data for table `watersource`
--

INSERT INTO `municipality` (`muni_id`,`muni_name`, `province_id`) VALUES

(1, 'Metsimaholo Local', 2);

--
-- Table structure for table `multipleExplosure`
--
CREATE TABLE `Explosure` (
  `explosure_id` int(12) NOT NULL,
  `explosure_name` varchar(100) DEFAULT NULL,
  `explosure_result` float NOT NULL,
  `parameterid`int(12) NOT NULL
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `multipleExplosure`
--

INSERT INTO `Explosure` (`explosure_id`,`explosure_name`, `explosure_result`,`parameterid`) VALUES
(1, 'Weekly', 7.1 ,3),
(2, 'Monthly', 3.2, 5),
(3, 'Yearly', 18.0, 12),
(4, 'Quarterly', 10.1, 4),
(5, 'Half Yearly', 1.1, 2);


--
-- Table structure for table `province`
--

CREATE TABLE `province` (
  `province_id` INT NOT NULL AUTO_INCREMENT,
  `province_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`province_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


--
-- Dumping data for table `province`
--

INSERT INTO `province` (`province_name`) VALUES
('Kwazulu-Natal'),
('Gauteng'),
('Free State'),
('Limpopo'),
('Mpumalanga'),
('North west'),
('Western cape'),
('Estern cape'),
('Northen cape');

-- --------------------------------------------------------

--
-- Table structure for table `referencepathogen`
--

CREATE TABLE `referencepathogen` (
  `pathogenid` int(11) NOT NULL,
  `pathogenName` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `referencepathogen`
--

INSERT INTO `referencepathogen` (`pathogenid`, `pathogenName`, `model`) VALUES
(1, 'Cryptosporidium parvum', 'exponential'),
(2, ' E. coli O157:H7', 'beter-poisson'),
(3, 'Campylobacter jejuni', 'beter-poisson'),
(4, 'Salmonella typhi', 'beter-poisson'),
(5, 'S. Flexneri', 'beter-poisson'),
(6, 'Vibrio cholera', 'beter-poisson'),
(7, 'Giardia lambia', 'exponential'),
(8, 'Entamoeba col', 'beter-poisson');


-- --------------------------------------------------------
--
-- Table structure for table `mstreference`
--

CREATE TABLE `mstreference` (
  `ref_id` int(11) NOT NULL,
  `pathogenName` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mstreference`
--

INSERT INTO `mstreference` (`ref_id`, `pathogenName`, `model`) VALUES
(1, 'Cryptosporidium parvum', 'exponential'),
(2, ' E. coli O157:H7', 'beter-poisson'),
(3, 'Campylobacter jejuni', 'beter-poisson'),
(4, 'Salmonella typhi', 'beter-poisson'),
(5, 'S. Flexneri', 'beter-poisson'),
(6, 'Vibrio cholera', 'beter-poisson'),
(7, 'Giardia lambia', 'exponential'),
(8, 'Entamoeba col', 'beter-poisson');


-- --------------------------------------------------------
--
-- Table structure for table `samplingdata`
--

CREATE TABLE `samplingdata` (
  `samplingId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `weatherCondition` varchar(100) DEFAULT NULL,
  `sampling_date_created` datetime NOT NULL,
  `muni_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `samplingdata`
--

INSERT INTO `samplingdata` (`samplingId`, `userId`, `weatherCondition`, `sampling_date_created`, `muni_id`) VALUES
(3, 1, 'sunny', '2023-09-13 13:18:28', NULL),
(4, 1, 'sunny', '2023-09-13 13:52:29', NULL),
(5, 1, 'Wet', '2023-09-13 21:26:08', NULL),
(6, 1, 'Wet', '2023-09-13 21:28:17', NULL),
(7, 1, 'Wet', '2023-09-13 21:29:05', NULL),
(8, 1, 'Windy', '2023-09-13 22:48:25', NULL),
(9, 1, 'Windy', '2023-09-13 22:55:19', NULL),
(10, 1, 'Windy', '2023-09-13 22:57:58', NULL),
(11, 1, 'Windy', '2023-09-13 22:59:17', NULL),
(12, 1, 'Windy', '2023-09-13 23:12:04', NULL),
(13, 1, 'Windy', '2023-09-13 23:41:18', NULL),
(14, 1, 'Thunder and Lightning', '2023-09-13 23:45:19', NULL),
(15, 1, 'cloudy', '2023-09-14 07:10:42', NULL),
(16, 1, 'cloudy', '2023-09-14 07:12:37', NULL),
(17, 1, 'cloudy', '2023-09-14 07:14:39', NULL),
(18, 1, 'cloudy', '2023-09-14 07:16:12', NULL),
(19, 1, 'cloudy', '2023-09-14 07:17:07', NULL),
(20, 1, 'cloudy', '2023-09-14 07:29:08', NULL),
(21, 1, 'cloudy', '2023-09-14 07:29:31', NULL),
(22, 1, 'Windy', '2023-09-17 21:38:27', NULL),
(23, 1, 'Windy', '2023-09-17 21:38:56', NULL),
(24, 1, 'Windy', '2023-09-17 21:53:07', NULL),
(25, 1, 'Windy', '2023-09-17 21:53:20', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sanitaryinpectionquestion`
--

CREATE TABLE `sanitaryinpectionquestion` (
  `id` int(11) NOT NULL,
  `pitLatrine` tinyint(1) DEFAULT NULL,
  `domesticAnimal` tinyint(1) DEFAULT NULL,
  `diaperDisposal` tinyint(1) DEFAULT NULL,
  `wasteWaterRelease` tinyint(1) DEFAULT NULL,
  `openDefaction` tinyint(1) DEFAULT NULL,
  `unprotectedWaterSource` tinyint(1) DEFAULT NULL,
  `agriculturalActivity` tinyint(1) DEFAULT NULL,
  `observerLaundryActivity` tinyint(1) DEFAULT NULL,
  `samplingId` int(11) DEFAULT NULL,
  `risk_type` varchar(100) DEFAULT NULL,
  `total_avarage` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanitaryinpectionquestion`
--

INSERT INTO `sanitaryinpectionquestion` (`id`, `pitLatrine`, `domesticAnimal`, `diaperDisposal`, `wasteWaterRelease`, `openDefaction`, `unprotectedWaterSource`, `agriculturalActivity`, `observerLaundryActivity`, `samplingId`, `risk_type`, `total_avarage`) VALUES
(3, 0, 1, 1, 1, 1, 0, 1, 1, 7, 'high risk', '75'),
(4, 0, 1, 1, 1, 1, 0, 1, 1, 7, 'high risk', '75'),
(6, 0, 0, 0, 0, 0, 0, 0, 0, 9, 'low risk', '0'),
(7, 0, 0, 0, 0, 0, 0, 0, 0, 10, 'low risk', '0'),
(9, 1, 0, 1, 0, 1, 0, 1, 0, 12, 'medium risk', '50'),
(10, 1, 1, 1, 0, 0, 1, 1, 1, 13, 'high risk', '75'),
(12, 1, 0, 1, 0, 1, 0, 1, 0, 21, 'medium risk', '50'),
(13, 1, 0, 1, 1, 0, 0, 0, 1, 22, 'medium risk', '50'),
(14, 0, 0, 0, 0, 0, 0, 0, 0, 23, 'low risk', '0'),
(15, 0, 1, 0, 1, 1, 0, 0, 1, 24, 'medium risk', '50'),
(16, 1, 1, 1, 1, 1, 1, 1, 1, 25, 'very high risk', '100');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `mobileNo` varchar(11) NOT NULL,
  `password` varchar(50) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `level` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
   message_id INT PRIMARY KEY AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `message` varchar(100) NOT NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adminId` int(11) NOT NULL,
  `mobileNo` varchar(11) NOT NULL,
  `password` varchar(50) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `mobileNo`, `password`, `firstname`, `lastname`, `level`) VALUES
(1, '0123456789', '123zxc', 'Busi', 'Sila', 1),
(2, '0734728193', '123456', 'Tracy', 'Madela', 2),
(3, '0820986057', 'Luyanda03', 'Luyanda', 'Shabalala', 3);

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adminId`, `mobileNo`, `password`, `firstname`, `lastname`) VALUES
(1, '0635867751', 'ngoy', 'Glodi', 'Ngoy');


-- --------------------------------------------------------

--
-- Table structure for table `watersource`
--

CREATE TABLE `watersource` (
  `id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `waterAccessability` varchar(255) DEFAULT NULL,
  `samplingId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `mstPathogen`
--

CREATE TABLE `mstPathogen` (
  `mstPathogen_id` int(12) NOT NULL,
  `pathogene_Name` varchar(225) NOT NULL,
  `userCount` int(12) NOT NULL,
  `pathogen_res` float NOT NULL,
  `model` varchar(255) DEFAULT NULL,
  `samplingId` int(11) DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `watersource`
--

INSERT INTO `watersource` (`id`, `type`, `waterAccessability`, `samplingId`) VALUES
(1, 'River', 'hard', 3),
(4, 'Household Tap Water', 'Hard', NULL),
(5, 'Household Tap Water', 'Easy', NULL),
(6, 'Household Tap Water', 'Easy', NULL),
(7, 'Household Tap Water', 'Easy', NULL),
(8, 'Household Tap Water', 'Easy', NULL);

--
-- Dumping data for table `mstPathogen`
--

INSERT INTO `mstPathogen` (`mstPathogen_id`, `pathogene_Name`,`userCount`,`pathogen_res`, `model`, `samplingId`) VALUES
(1, 'Cryptosporidiumparvum', 300, 10, 'exponential',NULL),
(2, 'EcoliO157H7', 45, 0.13, 'exponential',NULL),
(3, 'Campylobacterjejuni', 76, 2.4, 'exponential',NULL),
(4, 'Salmonellatyphi', 40, 22, 'exponential',NULL),
(5, 'SFlexneri', 211, 46, 'exponential',NULL),
(6, 'Vibriocholera', 85, 57, 'exponential',NULL),
(7, 'Giardialambia',174 ,75, 'exponential',NULL),
(8, 'Entamoebacol', 200, 32, 'exponential',NULL);


--
-- Indexes for table `coordinate`
--
ALTER TABLE `coordinate`
  ADD PRIMARY KEY (`coorniadteId`),
  ADD KEY `samplingId` (`samplingId`);

-- Indexes for table `explosure_id`
--
ALTER TABLE `explosure`
  ADD PRIMARY KEY (`explosure_id`),
  ADD KEY (`parameterid`);


--
-- Indexes for table `hydrogensulfide`
--
ALTER TABLE `hydrogensulfide`
  ADD PRIMARY KEY (`id`),
  ADD KEY `samplingId` (`samplingId`);

  -- Indexes for table `FIBdata`
--
ALTER TABLE `FIBdata`
  ADD PRIMARY KEY (`indicatorid`),
  ADD KEY `samplingId` (`samplingId`);

    -- Indexes for table `MST_MAKER`
--
ALTER TABLE `mst_maker`
  ADD PRIMARY KEY (`mstdata_id`),
  ADD KEY `samplingId` (`samplingId`);

--
-- Indexes for table `microbial`
--
ALTER TABLE `microbial`
  ADD PRIMARY KEY (`microbialId`),
  ADD KEY `samplingId` (`samplingId`);

--
-- Indexes for table `municipality`
--
ALTER TABLE `municipality`
  ADD PRIMARY KEY (`muni_id`),
  ADD KEY `province_id` (`province_id`);

--
-- Indexes for table `province`
--



--
-- Indexes for table `referencepathogen`
--
ALTER TABLE `referencepathogen`
  ADD PRIMARY KEY (`pathogenid`);

--
-- Indexes for table `mstreference`
--
ALTER TABLE `mstreference`
  ADD PRIMARY KEY (`ref_id`);
--
-- Indexes for table `samplingdata`
--
ALTER TABLE `samplingdata`
  ADD PRIMARY KEY (`samplingId`),
  ADD KEY `userId` (`userId`),
  ADD KEY `muni_id` (`muni_id`);

--
-- Indexes for table `sanitaryinpectionquestion`
--
ALTER TABLE `sanitaryinpectionquestion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sam_san` (`samplingId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `user`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adminId`);

--
-- Indexes for table `watersource`
--
ALTER TABLE `watersource`
  ADD PRIMARY KEY (`id`),
  ADD KEY `samplingId` (`samplingId`);

--
-- Indexes for table `parameters`
--
ALTER TABLE `parameters`
ADD PRIMARY KEY (`parameterid`),
ADD KEY `pathogenName` (`pathogenName`),
ADD KEY `indicatorid` (`indicatorid`);

--

-- AUTO_INCREMENT for dumped tables
--
-- AUTO_INCREMENT for table `explosure`
--
ALTER TABLE `explosure`
MODIFY `explosure_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;


--
-- AUTO_INCREMENT for table `coordinate`
--
ALTER TABLE `coordinate`
  MODIFY `coorniadteId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
    --
-- Indexes for table `mst_maker`
--
ALTER TABLE `mst_maker`

  MODIFY `mstdata_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;


  -- AUTO_INCREMENT for table `FIB_data`
--
ALTER TABLE `FIBdata`
  MODIFY `indicatorid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
  ALTER TABLE `FIBdata` MODIFY ratio DECIMAL(10, 2) NOT NULL;

ALTER TABLE FIBdata MODIFY count DECIMAL(10, 2) NOT NULL;
ALTER TABLE FIBdata MODIFY countAverage DECIMAL(10, 2) NOT NULL;

 -- Indexes for table `mstPathogen`
--
ALTER TABLE `mstPathogen`
  ADD PRIMARY KEY (`mstPathogen_id`),
   ADD KEY `samplingId` (`samplingId`);
  -- AUTO_INCREMENT for table `mstPathogen`
--
ALTER TABLE `mstPathogen`
  MODIFY `mstPathogen_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `hydrogensulfide`
--
ALTER TABLE `hydrogensulfide`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `microbial`
--
ALTER TABLE `microbial`
  MODIFY `microbialId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `municipality`
--
ALTER TABLE `municipality`
  MODIFY `muni_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referencepathogen`
--
--
-- AUTO_INCREMENT for table `referencepathogen`
--
ALTER TABLE `referencepathogen`
  MODIFY `pathogenid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
-- AUTO_INCREMENT for table `referencepathogen`
--
ALTER TABLE `mstreference`
  MODIFY `ref_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `samplingdata`
--
ALTER TABLE `samplingdata`
  MODIFY `samplingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `sanitaryinpectionquestion`
--
ALTER TABLE `sanitaryinpectionquestion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `admin`
  MODIFY `adminId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `watersource`
--
ALTER TABLE `watersource`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

  --
-- AUTO_INCREMENT for table `paraneters`
--
ALTER TABLE `parameters`
  MODIFY `parameterid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;


--
-- Constraints for table `coordinate`
--
ALTER TABLE `coordinate`
  ADD CONSTRAINT `coordinate_ibfk_1` FOREIGN KEY (`samplingId`) REFERENCES `samplingdata` (`samplingId`);

--
-- Constraints for table `hydrogensulfide`
--
ALTER TABLE `hydrogensulfide`
  ADD CONSTRAINT `hydrogensulfide_ibfk_1` FOREIGN KEY (`samplingId`) REFERENCES `samplingdata` (`samplingId`);

--
-- Constraints for table `microbial`
--
ALTER TABLE `microbial`
  ADD CONSTRAINT `microbial_ibfk_1` FOREIGN KEY (`samplingId`) REFERENCES `samplingdata` (`samplingId`);

--
-- Constraints for table `municipality`
--
ALTER TABLE `municipality`
  ADD CONSTRAINT `municipality_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `province` (`province_id`);

--
-- Constraints for table `samplingdata`



ALTER TABLE `samplingdata`
  ADD CONSTRAINT `samplingdata_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  ADD CONSTRAINT `samplingdata_ibfk_2` FOREIGN KEY (`muni_id`) REFERENCES `municipality` (`muni_id`);

--
-- Constraints for table `sanitaryinpectionquestion`
--
ALTER TABLE `sanitaryinpectionquestion`
  ADD CONSTRAINT `sam_san` FOREIGN KEY (`samplingId`) REFERENCES `samplingdata` (`samplingId`);

--
-- Constraints for table `watersource`
--
ALTER TABLE `watersource`
  ADD CONSTRAINT `watersource_ibfk_1` FOREIGN KEY (`samplingId`) REFERENCES `samplingdata` (`samplingId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
