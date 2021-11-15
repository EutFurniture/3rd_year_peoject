-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2021 at 02:56 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eut_furniture`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalprice` int(11) NOT NULL,
  `date` date NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `cart_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalprice` int(11) NOT NULL,
  `date` date NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `cartsss`
--

CREATE TABLE `cartsss` (
  `cart_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `totalprice` int(11) NOT NULL,
  `date` date NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cartsss`
--

INSERT INTO `cartsss` (`cart_id`, `customer_id`, `product_id`, `quantity`, `totalprice`, `date`, `active`) VALUES
(11, 2, 9, 1, 25000, '2021-09-09', 1),
(12, 2, 10, 1, 35000, '2021-09-09', 1),
(13, 2, 11, 1, 20000, '2021-09-09', 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`, `date`) VALUES
(1, 'dining sets', '2021-08-04'),
(2, 'Table sets', '2021-08-12'),
(3, 'Chair', '2021-08-19'),
(4, 'sofa', '2021-08-20'),
(5, 'bed', '2021-08-01'),
(6, 'Gift', '2021-08-12'),
(7, 'customized products', '2021-08-20'),
(8, 'Promotion', '2021-08-24');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nic` varchar(13) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(600) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `points` int(50) NOT NULL,
  `date` date NOT NULL,
  `order_frequency` varchar(50) NOT NULL,
  `lname` varchar(200) NOT NULL,
  `star` int(11) NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `proimg` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `email`, `nic`, `phone`, `address`, `password`, `fname`, `points`, `date`, `order_frequency`, `lname`, `star`, `feedback`, `proimg`) VALUES
(1, 'mithu26@gmail.com', '9122345876', '0768993028', 'Puloly North West Puloy', '12345678', ' Mathanraj Mithush', 26, '2021-09-01', '4', '', 3, 'better', ''),
(2, 'SanthiniKuganesan@gmail.com', '9465422876', '0764580123', 'Thumpalai', '123456', 'Santhini Kuganesan', 23, '2021-09-01', '3', '', 4, 'Best quality', ''),
(3, 'Asvin@gmail.com', '9231227865', '0776891230', 'Manthikai', '123456', 'Asvin mithush', 52, '2021-07-04', '5', '', 5, 'nice collection', ''),
(6, 'suvi@gmail.com', '9476554329', '0764521891', 'Mount Lavania, Dehiwala', '123456', 'Suviththa Yoganathan', 15, '2020-08-12', '2', '', 4, 'good quality', ''),
(7, 'jathu@gmail.com', '9078664532', '0761239012', 'Point pedro, Jaffna', '123456', 'Jathurnan', 12, '2021-08-04', '4', '', 5, 'great experience', ''),
(8, 'meera@gmail.com', '6788764543', '0761234590', 'Malavaththai', '4256572871', 'Meera Kowtham', 25, '2021-08-11', '5', '', 3, 'better', ''),
(9, 'preethi@gmail.com', '6877564538', '0778912345', 'Manthikai', '1234546', 'Preethi', 30, '2021-02-04', '6', '', 4, 'great', ''),
(10, 'yuva@gmail.com', '874546337', '0779012367', 'Thampasiddy', '1235656', 'Yuva', 23, '2021-08-19', '8', '', 4, 'great experience', ''),
(11, 'rajevan@gmail.com', '764533987', '0761290456', 'Puloly', 'hjshjnvnbn', 'Rajeevan', 23, '2021-05-05', '30', '', 3, 'nice collection', ''),
(12, 'jeevika@gmail.com', '897445635', '0778901000', 'Point Pedro', '123557', 'Jeevika', 56, '2021-08-20', '6', '', 4, 'good quality Products', ''),
(13, 'malathi@gmail.com', '754678876', '0765671200', 'Nelliyadi', '132456', 'Malathi', 50, '2021-08-24', '9', '', 3, 'great ', ''),
(14, 'Vinai@gmail.com', '897645327', '0762349012', 'Karaveddy', '123456', 'Vinai Vishva', 40, '2021-08-04', '2', '', 5, 'great experience', ''),
(15, 'gajanikangesan@gmail.com ', '967764567', '076553342', 'vaddukottai, jaffna', '$2b$10$SEckVv6Ynk.HIulgRi', 'gajani', 12501, '0000-00-00', '', '', 4, 'great shopping', 'profile3.jpg'),
(18, 'gajanikank19@gmail.com', '984567665v', '0764544356', 'pannalai', '$2b$10$LhIVF090rdSNaqURMWwm2e0/HIYL/CCRo8C2XDJgiePncq4bBKvVy', 'Gajani kangesan', 1000, '2021-09-18', '', '', 4, 'Great', 'profile2.jfif'),
(19, '2018cs070@stu.ucsc.cmb.ac.lk', '985564765v', '0765467878', 'jaffna', '$2b$10$xCwmMrH5tL5BguAIsLQPUeSB7UUa2m0/P8G9umOxn89QuUC05xHua', 'suvitha yogaa', 1001, '2021-09-19', '', '', 4, 'very good', 'profile6.jpg'),
(21, '2018cs050@stu.ucsc.cmb.ac.lk', '975923456v', '077545468', 'manipay', '$2b$10$HqibYH4kSw0EAxF/s4WV7.I5XclK215AQqzRsh1Ykl2a.BWvhBZlm', 'Karunya kunaratnam', 1000, '2021-09-19', '', '', 4, 'Great', 'deliver1.jpg'),
(22, '2018cs080@stu.ucsc.cmb.ac.lk', '976645678v', '076656578', 'manipay', '$2b$10$17pWlTesPO/m2XtKpGJree0Xz2pgo0OScXNFoikA6bX.tp6To79w.', 'Karunya ', 1000, '2021-09-19', '', '', 4, 'Great', 'deliver2.jpg'),
(23, '2018cs000@stu.ucsc.cmb.ac.lk', '976788765v', '0776565438', 'manipay', '$2b$10$KKr8SZKh3SH6Es5tZDBSK.nLRvXZR.NpgweK2bE.XpPTGYiMBijXe', 'Karunya Kunaratnam', 1000, '2021-09-19', '', '', 4, 'great experience', 'emp1.jpg'),
(25, '2018cs0980@stu.ucsc.cmb.ac.lk', '976767676V', '0769620640', 'manipay', '$2b$10$FSDT4a6s57wCWY5zp3SCLutfdvggFIouu.Pv/DHLQsVENN3lPjpOG', 'KAJANI', 0, '2021-09-20', '', '', 0, '', 'user.jpg'),
(26, '2018cs090@stu.ucsc.cmb.ac.lk', '988228787v', '0769620640', 'manipay', '$2b$10$pR90XdO5foZ9ZuyYio.Th.I8aO2nftFEFTencZ0Chu4A9on9OOXIO', 'KARUNYA', 1250, '2021-09-20', '', '', 4, 'better experience', 'emp1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `customized_products`
--

CREATE TABLE `customized_products` (
  `cus_product_id` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `color` varchar(50) NOT NULL,
  `material` varchar(50) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `delivery_date` date NOT NULL,
  `price` varchar(20) NOT NULL,
  `status` varchar(50) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `category_name` varchar(50) NOT NULL,
  `quantity` varchar(20) NOT NULL,
  `design` varchar(100) NOT NULL,
  `measurement` varchar(200) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1,
  `total_payment` varchar(20) NOT NULL,
  `advanced_payment` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `c_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customized_products`
--

INSERT INTO `customized_products` (`cus_product_id`, `description`, `color`, `material`, `product_name`, `delivery_date`, `price`, `status`, `customer_id`, `category_name`, `quantity`, `design`, `measurement`, `active`, `total_payment`, `advanced_payment`, `date`, `c_active`) VALUES
(1, 'it is like computer desk. not used glass.', '#e63a0f', 'plastic', 'Child Chair', '0000-00-00', '', 'Pending', 2, 'chair', '4', 's4.jpg', '35cmx50cm', 0, '', '', '0000-00-00', 1),
(9, 'wood comfortable chair', '#7c4b4b', 'wood', 'Chair', '0000-00-00', '', 'Pending', 15, '', '', '6f3368021277ef187120437881eb439e.jpg', '58cmx47cm', 0, '', '', '0000-00-00', 0),
(10, 'wooden', '#6f2f2f', 'wood', 'table', '0000-00-00', '', 'Complete', 15, '', '', '85b2389767fb03f32a575f802c056d71.jpg', '12cmx34cm', 0, '', '', '2021-09-17', 0),
(11, 'metal', '#6d5f5f', 'metal', 'cupboard', '0000-00-00', '', 'Complete', 15, '', '', '11adcc25b675f9541c288511ca156f42.jpg', '12*34', 0, '', '', '2021-09-17', 0),
(12, 'rounded table', '#5a4444', 'wood', 'table', '0000-00-00', '', 'Complete', 15, '', '', '36_ Round Top Pedestal Dining Table with 12_ Drop Leaf - International Concepts.jpg', '12cmx34cm', 0, '', '', '2021-09-17', 0),
(13, 'wooden chair', '#674646', 'wood', 'chair', '0000-00-00', '', 'Complete', 18, '', '', 'ch4.jpg', '12cmx34cm', 0, '', '', '2021-09-18', 0),
(14, 'rectangle table', '#784a4a', 'wood', 'table', '0000-00-00', '', 'Complete', 19, '', '', '85b2389767fb03f32a575f802c056d71.jpg', '1.5mx1m', 0, '', '', '2021-09-19', 0),
(15, 'wood', '#c71a1a', 'wood', 'chair', '0000-00-00', '', 'Complete', 21, '', '', 'ch1.jpg', '12cmx24', 0, '', '', '2021-09-19', 0),
(16, 'wood', '#9c1616', 'wood', 'chair', '0000-00-00', '', 'Reject', 22, '', '', 'g1.jpg', '12cmx34cm', 0, '', '', '2021-09-19', 1),
(17, 'rouded', '#2d1010', 'wood', 'table', '0000-00-00', '', 'Reject', 23, '', '', '85b2389767fb03f32a575f802c056d71.jpg', '12x34', 0, '', '', '2021-09-19', 0),
(18, 'wood', '#514343', 'wood', 'chair', '0000-00-00', '', 'Reject', 26, '', '', '6f3368021277ef187120437881eb439e.jpg', '12x34', 0, '', '', '2021-09-20', 0);

-- --------------------------------------------------------

--
-- Table structure for table `delivery`
--

CREATE TABLE `delivery` (
  `delivery_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `date` date NOT NULL,
  `returned_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `NIC` varchar(10) NOT NULL,
  `email` varchar(500) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `job_start_date` date NOT NULL,
  `confirm_password` varchar(600) NOT NULL,
  `address` varchar(200) NOT NULL,
  `role` varchar(50) NOT NULL,
  `password` varchar(600) NOT NULL,
  `emp_img` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `NIC`, `email`, `phone_no`, `job_start_date`, `confirm_password`, `address`, `role`, `password`, `emp_img`) VALUES
(68, 'Karunya', '975951049V', 'karunyakunaratnam@gmail.com', '0769620640', '2021-09-01', '', 'vigneshwaravasa, manipay', 'Delivery Manager', '', 'dManager.jpg'),
(69, 'Kamal', '926677543V', 'groupcs13ucsc@gmail.com', '0766653456', '2021-09-06', '', 'manipay, jaffna', 'Delivery Person', '', 'deliver1.jpg'),
(70, 'Karthick', '917768576V', 'karunyachemis@gmail.com', '0764435367', '2021-09-06', '', 'urumbirai, srilanka', 'Delivery Person', '', 'deliver4.jpg'),
(71, 'Ashwin', '908876554V', 'pirashathkunaratnam28@gmail.com', '0776655432', '2021-09-06', '', 'jaffna,srilankan', 'Delivery Person', '', 'deliver3.jpg'),
(73, 'Suvitha Yoganathan', '987734567V', 'suviyoga2@gmail.com', '0762435564', '2021-09-06', '', 'manipay, jaffna', 'admin', '', 'admin.jpg'),
(74, 'Daranya Manisekaran', '976544321V', 'daranyasehar@gmail.com', '0776543576', '2021-09-09', '', 'Tellipalai ,jaffna', 'Sales Manager', '', 'profile6.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `gift`
--

CREATE TABLE `gift` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `gift_img` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `quantity` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `gift`
--

INSERT INTO `gift` (`ID`, `name`, `gift_img`, `price`, `quantity`) VALUES
(1, 'Sofa ', 'sofa.jpg', 'Rs.4000.00', '6'),
(2, 'chair', 'chair.jpg', 'Rs.2000.00', '7'),
(4, 'table', 'table1.jpg', 'Rs.2500.00', '5'),
(6, 'dining', 'dining1.jpg', 'Rs.5000.00', '4');

-- --------------------------------------------------------

--
-- Table structure for table `oldcategory`
--

CREATE TABLE `oldcategory` (
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `oldcategory`
--

INSERT INTO `oldcategory` (`category_id`, `name`, `date`) VALUES
(6, 'Dining table', '2021-05-10'),
(8, 'bed sets', '2021-07-10'),
(9, 'Table', '2021-07-02'),
(10, 'Chair', '2021-06-20'),
(11, 'Sofa set', '2021-06-30'),
(13, 'stool', '2021-08-04'),
(19, 'Gift', '2021-08-16'),
(20, 'customized products', '2021-08-19');

-- --------------------------------------------------------

--
-- Table structure for table `oldproducts`
--

CREATE TABLE `oldproducts` (
  `product_id` int(11) NOT NULL,
  `product_img` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `material` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `quantity` varchar(10) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `oldproducts`
--

INSERT INTO `oldproducts` (`product_id`, `product_img`, `name`, `material`, `price`, `quantity`, `category_id`, `description`) VALUES
(20, 'chair.jpg', 'Chairs', 'metal', 'Rs.5000.00', '10', 10, 'This is the chair set. We have multiple color such as brown, butter color.'),
(25, 'table2.jpg', 'table', 'plastic', 'Rs.10,000.00', '6', 11, 'This is the table. We have multiple color such as brown, butter color.'),
(26, 'category2.jpg', 'bed set', 'wood', 'Rs.40,000.00', '8', 8, 'This is the bed set. We have multiple color such as brown, butter color.'),
(28, 'sofa.jpg', 'sofa', 'Fabric', 'Rs.25,000.00', '12', 11, 'This is the sofa set. We have multiple color such as brown, butter color.'),
(32, 'dining2.jpg', 'dining', 'Wood and plastic', 'Rs.25,000.00', '4', 6, 'This is the dining set. We have multiple color such as brown, butter color.'),
(33, 'stool.jpg', 'Plastic Stool', 'plastic', 'Rs.3000.00', '5', 13, 'This is the stool. We have multiple color such as brown, black color.'),
(34, 'table1.jpg', 'Metal table', 'Metal', 'Rs.10,000.00', '5', 9, ''),
(37, 'stool.jpg', 'stools', '', '2000', '4', 19, ''),
(38, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(39, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(40, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(41, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(42, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(43, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(44, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(45, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(46, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(47, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(48, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(49, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(50, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(51, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(54, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(55, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(56, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(57, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(58, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(59, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(60, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(61, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(62, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(63, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(64, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(65, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(66, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(67, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(68, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(69, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(70, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(71, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(72, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(73, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(74, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(76, '', 'Table', 'wood', '', '1', 20, 'Tablefhhd'),
(77, '', 'Table', 'wood', '', '1', 20, 'Tablefhhd'),
(78, '', 'Table', 'wood', '', '1', 20, 'Tablefhhd'),
(79, '', 'Table', 'wood', '', '1', 20, 'Tablefhhd'),
(80, '', 'Table', 'wood', '', '1', 20, 'Tablefhhd'),
(81, '', 'Table', 'wood', '', '1', 20, 'Tablefhhd'),
(82, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(83, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(84, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(85, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(86, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(87, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(88, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(89, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(90, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(91, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(92, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(93, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(94, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(95, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(96, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(97, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(98, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(99, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(100, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(101, '', 'Table', 'wood', '', '1', 20, 'Tablefhhd'),
(102, '', 'Table', 'wood', '', '1', 20, 'Tablefhhd'),
(103, '', 'Table', 'wood', '', '1', 20, 'Tablefhhd'),
(104, '', 'Table', 'wood', '', '1', 20, 'Tablefhhd'),
(105, '', 'Table', 'wood', '', '1', 20, 'Tablefhhd'),
(106, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(107, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(108, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(109, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(110, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(111, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(112, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(113, '', 'Round table', 'wood', '', '1', 20, 'Round table bxcnxbn'),
(114, '', 'Dining table', 'wood', '', '1', 20, 'Dining table'),
(115, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(116, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(117, '', 'sofa', 'fabric', '', '1', 20, 'dvschghsd'),
(118, '', 'Chair', 'plastic', '', '1', 20, 'hdfgdgfjhvc '),
(119, 'tablebase.jpg', 'tracks', 'ssd', '4000', '2', 11, 'This is the dining set. We have multiple color such as brown, butter color.'),
(120, 'bb.jpg', 'dmfjd', 'asss', '2000', '5', 8, 'This is the stool. We have multiple color such as brown, black color.');

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `order_id` int(255) NOT NULL,
  `product_id` int(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`order_id`, `product_id`, `quantity`, `total`) VALUES
(61, 42, 1, 0),
(62, 11, 1, 0),
(63, 6, 1, 0),
(64, 5, 1, 0),
(65, 2, 1, 0),
(66, 12, 1, 0),
(67, 18, 1, 0),
(68, 20, 1, 0),
(69, 14, 1, 0),
(70, 18, 1, 0),
(71, 15, 1, 0),
(72, 14, 1, 0),
(73, 13, 1, 0),
(74, 17, 1, 0),
(75, 16, 1, 0),
(76, 16, 1, 0),
(77, 16, 1, 0),
(78, 12, 1, 25999),
(78, 14, 1, 32000),
(81, 9, 1, 25000),
(81, 15, 1, 27000),
(82, 9, 1, 25000),
(82, 12, 1, 25999),
(83, 9, 1, 25000),
(83, 14, 1, 32000),
(84, 11, 1, 20000),
(84, 14, 1, 32000),
(85, 10, 1, 35000),
(85, 11, 1, 20000),
(86, 9, 1, 25000),
(86, 10, 2, 70000),
(87, 9, 1, 25000),
(87, 10, 1, 35000),
(88, 9, 1, 25000),
(88, 10, 2, 70000),
(89, 43, 1, 45000),
(90, 23, 1, 0),
(91, 44, 1, 20000),
(92, 45, 1, 30000),
(93, 2, 3, 90000),
(94, 3, 2, 40000),
(95, 4, 2, 20000),
(96, 47, 1, 12000),
(97, 2, 2, 2000),
(98, 3, 2, 60000),
(99, 4, 2, 2000),
(101, 9, 1, 25000),
(101, 10, 2, 70000),
(102, 9, 2, 50000),
(102, 10, 1, 35000),
(103, 11, 1, 20000),
(104, 48, 2, 48000),
(105, 14, 1, 32000),
(106, 11, 1, 20000),
(107, 11, 1, 20000),
(107, 12, 2, 51998),
(108, 11, 1, 20000),
(108, 14, 1, 32000),
(109, 21, 1, 0),
(110, 50, 1, 20000),
(112, 2, 2, 40000),
(112, 4, 2, 40000),
(113, 11, 1, 20000),
(114, 52, 1, 1000),
(115, 11, 1, 20000),
(116, 3, 3, 3000),
(117, 2, 2, 40000),
(117, 11, 1, 20000),
(119, 9, 1, 25000);

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(255) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`order_id`, `product_id`, `quantity`, `total`) VALUES
(61, 45, 3, 0),
(62, 5, 1, 0),
(63, 25, 1, 0),
(64, 5, 1, 0),
(65, 2, 1, 0),
(66, 2, 1, 0),
(67, 10, 1, 0),
(68, 34, 1, 0),
(69, 10, 1, 0),
(70, 15, 1, 0),
(71, 9, 1, 0),
(72, 10, 1, 0),
(73, 5, 1, 0),
(74, 39, 1, 0),
(75, 40, 1, 0),
(76, 31, 1, 0),
(77, 39, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `orderitemsss`
--

CREATE TABLE `orderitemsss` (
  `order_id` int(255) NOT NULL,
  `product_id` int(255) NOT NULL,
  `quantity` int(255) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `orderproduct`
--

CREATE TABLE `orderproduct` (
  `order_id` int(20) NOT NULL,
  `customer_id` int(20) NOT NULL,
  `o_date` date NOT NULL,
  `order_last_date` date NOT NULL,
  `advance_price` int(20) NOT NULL,
  `total_price` int(20) NOT NULL,
  `o_description` varchar(100) NOT NULL,
  `o_status` varchar(50) NOT NULL,
  `o_d_date` date NOT NULL,
  `employee_id` int(11) NOT NULL,
  `order_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orderproduct`
--

INSERT INTO `orderproduct` (`order_id`, `customer_id`, `o_date`, `order_last_date`, `advance_price`, `total_price`, `o_description`, `o_status`, `o_d_date`, `employee_id`, `order_type`) VALUES
(5, 1, '2021-05-05', '2021-07-05', 800, 8000, 'rounded glass table', 'Completed', '2021-07-04', 12, ''),
(6, 3, '2021-01-01', '2021-05-07', 500, 5000, 'metal table', 'Ready to deliver', '0000-00-00', 0, ''),
(8, 1, '2021-07-16', '2021-05-04', 500, 5000, 'soft', 'Processing', '0000-00-00', 12, ''),
(9, 2, '2021-06-01', '2021-07-05', 800, 5000, 'wood and glass', 'Returned', '2021-07-04', 12, ''),
(10, 3, '2021-05-01', '2021-07-06', 700, 7000, 'plastic', 'Pending', '2021-07-05', 1, ''),
(11, 6, '2021-07-06', '2021-07-12', 1000, 10000, 'glass', 'Ready to deliver', '0000-00-00', 0, ''),
(13, 1, '2021-07-19', '2021-07-13', 1000, 8000, 'round', 'Pending', '0000-00-00', 12, ''),
(14, 6, '2021-07-20', '2021-07-08', 700, 7000, 'metal table', 'Returned', '2021-07-08', 1, ''),
(15, 26, '2021-02-02', '2021-03-04', 2000, 4000, 'fdvfd vf', 'confirm', '2021-03-03', 23, ''),
(16, 25, '2021-03-10', '0000-00-00', 4000, 8000, 'vfnndvkgjkgjtk', 'pending', '2021-08-04', 26, ''),
(17, 0, '2021-04-08', '0000-00-00', 0, 0, '', '', '0000-00-00', 0, ''),
(18, 0, '2021-08-05', '0000-00-00', 0, 0, '', '', '0000-00-00', 0, ''),
(19, 0, '2021-02-02', '0000-00-00', 0, 0, '', '', '0000-00-00', 0, ''),
(20, 0, '2021-08-09', '0000-00-00', 0, 0, '', '', '0000-00-00', 0, ''),
(26, 2, '2021-08-20', '0000-00-00', 2000, 4000, '', '', '0000-00-00', 0, 'customized'),
(27, 1, '2021-08-20', '0000-00-00', 500, 5000, '', '', '0000-00-00', 0, 'customized'),
(28, 1, '2021-08-20', '0000-00-00', 4000, 5000, '', '', '0000-00-00', 0, 'customized'),
(29, 1, '2021-08-20', '0000-00-00', 54454, 6788, '', '', '0000-00-00', 0, 'customized'),
(30, 1, '2021-08-20', '0000-00-00', 8000, 1223, '', '', '0000-00-00', 0, 'customized'),
(31, 1, '2021-08-20', '0000-00-00', 8000, 5600, '', '', '0000-00-00', 0, 'customized'),
(32, 3, '2021-08-20', '0000-00-00', 3000, 7000, '', '', '0000-00-00', 0, 'customized'),
(33, 2, '2021-08-20', '0000-00-00', 2000, 4000, '', '', '0000-00-00', 0, 'customized'),
(34, 2, '2021-08-20', '0000-00-00', 4355, 665, '', '', '0000-00-00', 0, 'customized'),
(35, 2, '2021-08-20', '0000-00-00', 3456, 7880, '', '', '0000-00-00', 0, 'customized'),
(36, 2, '2021-08-20', '0000-00-00', 2000, 3000, '', '', '0000-00-00', 0, 'customized'),
(37, 1, '2021-08-20', '0000-00-00', 2000, 8939, '', '', '0000-00-00', 0, 'customized'),
(38, 1, '2021-08-20', '0000-00-00', 7888, 123445, '', '', '0000-00-00', 0, 'customized'),
(39, 2, '2021-08-20', '0000-00-00', 1200, 2400, '', '', '0000-00-00', 0, 'customized'),
(40, 3, '2021-08-20', '0000-00-00', 6578, 12345, '', '', '0000-00-00', 0, 'customized'),
(42, 6, '2021-08-20', '0000-00-00', 200, 1200, '', '', '0000-00-00', 0, 'customized'),
(43, 6, '2021-08-20', '0000-00-00', 300, 1500, '', '', '0000-00-00', 0, 'customized'),
(44, 6, '2021-08-20', '0000-00-00', 2134, 12344, '', '', '0000-00-00', 0, 'customized'),
(45, 6, '2021-08-20', '0000-00-00', 1233, 4555, '', '', '0000-00-00', 0, 'customized'),
(46, 6, '2021-08-20', '0000-00-00', 233, 1234, '', '', '0000-00-00', 0, 'customized'),
(47, 1, '2021-08-20', '0000-00-00', 1234, 4567, '', '', '0000-00-00', 0, 'customized'),
(48, 1, '2021-08-20', '0000-00-00', 2001, 83733, '', '', '0000-00-00', 0, 'customized'),
(49, 1, '2021-08-20', '0000-00-00', 344, 11244, '', '', '0000-00-00', 0, 'customized'),
(50, 1, '2021-08-20', '0000-00-00', 8900, 29001, '', '', '0000-00-00', 0, 'customized'),
(51, 1, '2021-08-20', '0000-00-00', 3221, 5677, '', '', '0000-00-00', 0, 'customized'),
(52, 2, '2021-08-20', '0000-00-00', 700, 9876, '', '', '0000-00-00', 0, 'customized'),
(53, 1, '2021-08-21', '0000-00-00', 456, 6788, '', '', '0000-00-00', 0, 'customized'),
(54, 1, '2021-08-21', '0000-00-00', 4556, 22234, '', '', '0000-00-00', 0, 'customized'),
(55, 1, '2021-08-21', '0000-00-00', 435, 1235, '', '', '0000-00-00', 0, 'customized'),
(56, 1, '2021-08-21', '0000-00-00', 3221, 122344, '', '', '0000-00-00', 0, 'customized'),
(57, 1, '2021-08-21', '0000-00-00', 2000, 43556, '', '', '0000-00-00', 0, 'customized'),
(58, 1, '2021-08-21', '0000-00-00', 2000, 12344, '', '', '0000-00-00', 0, 'customized'),
(59, 1, '2021-08-21', '0000-00-00', 1233, 2344, '', '', '0000-00-00', 0, 'customized'),
(60, 1, '2021-08-21', '0000-00-00', 2000, 44555, '', '', '0000-00-00', 0, 'customized'),
(61, 1, '2021-08-21', '0000-00-00', 123, 11222, '', '', '0000-00-00', 0, 'customized'),
(62, 1, '2021-08-21', '0000-00-00', 2111, 5566, '', '', '0000-00-00', 0, 'customized'),
(63, 3, '2021-08-21', '0000-00-00', 1234, 5533, '', '', '0000-00-00', 0, 'customized'),
(64, 3, '2021-08-21', '0000-00-00', 2000, 1234, '', '', '0000-00-00', 0, 'customized'),
(65, 6, '2021-08-21', '0000-00-00', 12345, 87753, '', '', '0000-00-00', 0, 'customized'),
(66, 6, '2021-08-21', '0000-00-00', 1233, 45667, '', '', '0000-00-00', 0, 'customized'),
(67, 6, '2021-08-21', '0000-00-00', 12341, 8905, '', '', '0000-00-00', 0, 'customized'),
(68, 6, '2021-08-21', '0000-00-00', 568, 1200, '', '', '0000-00-00', 0, 'customized'),
(69, 6, '2021-08-21', '0000-00-00', 2000, 1345, '', '', '0000-00-00', 0, 'customized'),
(70, 2, '2021-08-21', '0000-00-00', 2000, 12334, '', '', '0000-00-00', 0, 'customized'),
(71, 2, '2021-08-21', '0000-00-00', 2000, 5000, '', '', '0000-00-00', 0, 'customized'),
(72, 2, '2021-08-21', '0000-00-00', 2160, 2500, '', '', '0000-00-00', 0, 'customized'),
(73, 1, '2021-08-21', '0000-00-00', 2000, 1256, '', '', '0000-00-00', 0, 'customized'),
(74, 2, '2021-08-21', '0000-00-00', 2000, 12345, '', '', '0000-00-00', 0, 'customized'),
(75, 2, '2021-08-21', '0000-00-00', 1233333, 445566, '', '', '0000-00-00', 0, 'customized'),
(76, 2, '2021-08-21', '0000-00-00', 2000, 12, '', '', '0000-00-00', 0, 'customized'),
(77, 3, '2021-08-21', '0000-00-00', 1235, 678, '', '', '0000-00-00', 0, 'customized'),
(78, 1, '2021-08-21', '0000-00-00', 3456, 12344, '', '', '0000-00-00', 0, 'customized'),
(79, 1, '2021-08-21', '0000-00-00', 2000, 3000, '', '', '0000-00-00', 0, 'customized'),
(80, 1, '2021-08-21', '0000-00-00', 2000, 1290, '', '', '0000-00-00', 0, 'customized'),
(81, 1, '2021-08-21', '0000-00-00', 5544, 1234, '', '', '0000-00-00', 0, 'customized');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `o_date` date NOT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 NOT NULL,
  `order_last_date` date NOT NULL,
  `advance_price` int(10) NOT NULL,
  `total_price` int(10) NOT NULL,
  `order_description` varchar(200) CHARACTER SET utf8mb4 NOT NULL,
  `employee_id` int(11) NOT NULL,
  `order_type` varchar(50) NOT NULL,
  `o_d_date` date NOT NULL,
  `Bill_image` varchar(50) NOT NULL,
  `o_priority` int(10) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `c_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `customer_id`, `o_date`, `status`, `order_last_date`, `advance_price`, `total_price`, `order_description`, `employee_id`, `order_type`, `o_d_date`, `Bill_image`, `o_priority`, `active`, `c_active`) VALUES
(61, 3, '2021-08-02', 'Completed', '2021-08-10', 500, 5000, 'Rounded table', 69, '', '0000-00-00', '', 0, 0, 1),
(62, 7, '2021-08-07', 'Completed', '2021-08-15', 700, 7000, 'dining chair', 70, '', '0000-00-00', '', 0, 0, 1),
(63, 12, '2021-08-13', 'Completed', '2021-08-20', 800, 8000, 'Bed', 71, '', '0000-00-00', '', 0, 0, 1),
(64, 13, '2021-08-21', 'Completed', '2021-08-27', 400, 4000, 'chair', 69, '', '0000-00-00', '', 0, 0, 1),
(65, 8, '2021-08-25', 'Completed', '2021-09-01', 700, 7000, 'chair', 70, '', '0000-00-00', '', 0, 0, 1),
(66, 15, '2021-08-31', 'Completed', '2021-09-06', 800, 8000, 'Dining set', 71, '', '0000-00-00', '', 0, 0, 0),
(67, 7, '2021-09-01', 'Completed', '2021-09-07', 400, 4000, 'Chair', 69, '', '0000-00-00', '', 0, 0, 1),
(68, 13, '2021-09-01', 'Completed', '2021-09-06', 500, 5000, 'Table', 70, '', '0000-00-00', '', 0, 0, 1),
(69, 2, '2021-09-01', 'Completed', '2021-09-06', 800, 8000, 'Sofa set', 70, '', '0000-00-00', '', 0, 0, 1),
(70, 15, '2021-09-06', 'Completed', '2021-09-15', 400, 4000, 'Bed', 71, '', '0000-00-00', '', 0, 0, 0),
(71, 9, '2021-09-13', 'Completed', '2021-09-27', 1000, 10000, 'sofa set and, bed set', 69, '', '0000-00-00', 'bill3.jpg', 0, 0, 1),
(72, 11, '2021-09-16', 'Completed', '2021-09-20', 700, 7000, 'Chairs', 70, '', '0000-00-00', '', 0, 0, 1),
(73, 10, '2021-09-18', 'Completed', '2021-09-25', 400, 4000, 'Sofa set', 71, '', '0000-00-00', 'bill1.png', 0, 0, 1),
(74, 9, '2021-09-19', 'Completed', '2021-09-25', 700, 7000, 'Bed ', 70, '', '0000-00-00', 'bill2.jpg', 0, 0, 1),
(75, 11, '2021-09-24', 'Completed', '2021-09-27', 400, 4000, 'Sofa set', 71, '', '0000-00-00', '', 0, 0, 1),
(76, 15, '2021-09-26', 'Completed', '2021-09-29', 800, 8000, 'Sofa set', 69, '', '0000-00-00', '', 0, 0, 0),
(77, 8, '2021-09-26', 'Completed', '2021-09-22', 700, 7000, 'Chair set', 70, '', '0000-00-00', '', 0, 0, 1),
(80, 15, '2021-09-16', 'Processing', '0000-00-00', 10400, 52000, '', 0, 'Normal', '0000-00-00', '', 0, 0, 1),
(81, 15, '2021-09-16', 'Processing', '0000-00-00', 10400, 52000, '', 0, 'Normal', '0000-00-00', '', 0, 0, 1),
(82, 15, '2021-09-16', 'Processing', '0000-00-00', 10200, 50999, '', 0, 'Normal', '0000-00-00', '', 0, 0, 1),
(84, 15, '2021-09-16', 'Processing', '0000-00-00', 10400, 52000, '', 0, 'Normal', '0000-00-00', '', 0, 0, 1),
(85, 15, '2021-09-16', 'Processing', '0000-00-00', 11000, 55000, '', 0, 'Normal', '0000-00-00', '', 0, 0, 1),
(86, 15, '2021-09-17', 'Processing', '0000-00-00', 19000, 95000, '', 0, 'online', '0000-00-00', '', 0, 0, 1),
(87, 15, '2021-09-17', 'Processing', '0000-00-00', 12000, 60000, '', 0, 'online', '0000-00-00', '', 0, 0, 1),
(88, 15, '2021-09-17', 'Processing', '0000-00-00', 19000, 95000, '', 0, 'online', '0000-00-00', '', 0, 0, 1),
(89, 15, '2021-09-17', 'Processing', '0000-00-00', 9000, 45000, '', 0, 'customized', '0000-00-00', '', 0, 0, 1),
(90, 15, '2021-09-17', 'Finished', '0000-00-00', 0, 0, '', 0, '', '0000-00-00', '', 0, 0, 1),
(91, 15, '2021-09-17', 'Processing', '0000-00-00', 4000, 20000, '', 0, 'customized', '0000-00-00', '', 0, 0, 1),
(92, 15, '2021-09-17', 'Processing', '0000-00-00', 6000, 30000, '', 0, 'customized', '0000-00-00', '', 0, 0, 1),
(93, 15, '2021-09-17', 'Finished', '2021-09-17', 1000, 20000, 'chair', 0, 'Showroom', '0000-00-00', '', 0, 0, 0),
(94, 15, '2021-09-17', 'Finished', '2021-09-17', 2000, 15000, 'chair', 0, 'Showroom', '0000-00-00', '', 0, 0, 0),
(95, 15, '2021-09-17', 'Finished', '2021-09-17', 1000, 20000, 'chair', 0, 'Showroom', '0000-00-00', '', 0, 0, 0),
(96, 15, '2021-09-17', 'Processing', '0000-00-00', 2400, 12000, '', 0, 'customized', '0000-00-00', '', 0, 0, 1),
(97, 15, '2021-09-17', 'Finished', '2021-09-17', 0, 2000, 'rectangle table set', 0, 'Showroom', '0000-00-00', '', 0, 0, 0),
(98, 15, '2021-09-18', 'Finished', '2021-09-18', 0, 60000, 'rectangle table set', 0, 'Showroom', '0000-00-00', '', 0, 0, 0),
(99, 15, '2021-09-18', 'Completed', '2021-09-18', 0, 2000, 'rectangle table set', 71, 'Showroom', '0000-00-00', '', 0, 0, 0),
(100, 15, '2021-09-18', 'Finished', '2021-09-18', 1000, 10000, 'rectangle table set', 0, 'Showroom', '0000-00-00', '', 0, 0, 0),
(101, 15, '2021-09-18', 'Completed', '2021-09-21', 19000, 95000, '', 69, 'online', '0000-00-00', 'bill4.jpg', 0, 0, 0),
(102, 15, '2021-09-18', 'Completed', '2021-09-23', 17000, 85000, '', 70, 'online', '0000-00-00', '', 0, 0, 0),
(103, 18, '2021-09-18', 'Completed', '2021-09-21', 4000, 20000, '', 70, 'online', '0000-00-00', 'bill4.jpg', 0, 0, 0),
(104, 18, '2021-09-18', 'Processing', '0000-00-00', 4800, 24000, '', 0, 'customized', '0000-00-00', '', 0, 0, 1),
(108, 19, '2021-09-19', 'Completed', '2021-09-28', 10400, 52000, '', 70, 'online', '0000-00-00', 'bill5.jpg', 0, 0, 0),
(109, 19, '2021-09-19', 'gift', '0000-00-00', 0, 0, '', 0, '', '0000-00-00', '', 0, 0, 1),
(110, 19, '2021-09-19', 'Completed', '2021-09-23', 4000, 20000, '', 70, 'customized', '0000-00-00', '', 0, 0, 1),
(111, 19, '2021-09-19', 'gift', '2021-09-19', 0, 0, 'rectangle table set', 0, 'Showroom', '0000-00-00', '', 0, 0, 1),
(112, 19, '2021-09-19', 'Finished', '2021-09-19', 0, 80000, 'rectangle table set', 0, 'Showroom', '0000-00-00', '', 0, 0, 1),
(113, 21, '2021-09-19', 'Completed', '2021-09-21', 4000, 20000, '', 70, 'online', '0000-00-00', 'bill3.jpg', 0, 0, 0),
(114, 21, '2021-09-19', 'Processing', '0000-00-00', 200, 1000, '', 0, 'customized', '0000-00-00', '', 0, 0, 1),
(115, 22, '2021-09-19', 'Completed', '2021-09-21', 4000, 20000, '', 70, 'online', '0000-00-00', 'bill3.jpg', 0, 0, 1),
(116, 19, '2021-09-19', 'Ready to deliver', '2021-09-19', 0, 3000, '', 0, 'Showroom', '0000-00-00', '', 0, 0, 1),
(117, 23, '2021-09-19', 'Finished', '2021-09-22', 4000, 60000, '', 69, 'online', '0000-00-00', 'bill1.jpg', 0, 0, 0),
(118, 15, '2021-09-19', '', '2021-09-19', 0, 0, '', 0, 'Showroom', '0000-00-00', '', 0, 0, 1),
(119, 26, '2021-09-20', 'Completed', '2021-09-22', 5000, 25000, '', 69, 'online', '0000-00-00', 'bill3.jpg', 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `payment_method` varchar(25) NOT NULL,
  `payment_status` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `pBill_image` varchar(200) NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `payment_method`, `payment_status`, `active`, `pBill_image`, `order_id`) VALUES
(7, 'cash on delivery', 'Paid', 0, '', 61),
(8, 'card', 'Paid', 0, '', 62),
(9, 'cash on delivery', 'Paid', 0, '', 63),
(10, 'cash on delivery', 'Paid', 0, '', 64),
(11, 'cash on delivery', 'Paid', 0, '', 65),
(12, 'cash on delivery', 'Paid', 0, '', 66),
(13, 'card', 'Paid', 0, '', 67),
(14, 'cash on delivery', 'Paid', 0, '', 68),
(15, 'cash on delivery', 'Paid', 0, '', 69),
(16, 'cash on delivery', 'Paid', 0, '', 70),
(17, 'card', 'Paid', 0, '', 71),
(18, 'card', 'Paid', 0, '', 72),
(19, 'cash on delivery', 'Paid', 0, 'bill1.png', 73),
(20, 'cash on delivery', 'Paid', 0, 'bill2.jpg', 74),
(21, 'card', 'Paid', 0, '', 75),
(22, 'cash on delivery', 'Paid', 0, '', 76),
(23, 'card', 'Paid', 0, '', 77),
(24, 'cash on delivery', 'Advance Paid', 0, '', 82),
(25, 'cash on delivery', 'Advance Paid', 0, '', 88),
(26, 'cash on delivery', 'Advance Paid', 0, '', 89),
(27, 'cash on delivery', 'Advance Paid', 0, '', 89),
(28, 'cash on delivery', 'Advance Paid', 0, '', 89),
(29, 'cash on delivery', 'Advance Paid', 0, '', 89),
(30, 'card', 'Paid', 0, '', 89),
(31, 'card', 'Paid', 0, '', 89),
(32, 'cash on delivery', 'Advance Paid', 0, '', 91),
(33, 'cash on delivery', 'Advance Paid', 0, '', 91),
(34, 'cash on delivery', 'Advance Paid', 0, '', 91),
(35, 'cash on delivery', 'Advance Paid', 0, '', 91),
(36, 'cash on delivery', 'Advance Paid', 0, '', 91),
(37, 'cash on delivery', 'Advance Paid', 0, '', 91),
(38, 'cash on delivery', 'Advance Paid', 0, '', 91),
(39, 'cash on delivery', 'Advance Paid', 0, '', 91),
(40, 'card', 'Paid', 0, '', 91),
(41, 'card', 'Paid', 0, '', 91),
(42, 'cash on delivery', 'Advance Paid', 0, '', 92),
(43, 'cash on delivery', 'Advance Paid', 0, '', 92),
(44, 'cash on delivery', 'Advance Paid', 0, '', 92),
(45, 'cash on delivery', 'Advance Paid', 0, '', 92),
(46, 'cash on delivery', 'Advance Paid', 0, '', 89),
(47, 'cash on delivery', 'Advance Paid', 0, '', 89),
(48, 'cash on delivery', 'Advance Paid', 0, '', 89),
(49, 'cash on delivery', 'Advance Paid', 0, '', 89),
(50, 'cash on delivery', 'Advance Paid', 0, '', 89),
(51, 'cash on delivery', 'Advance Paid', 0, '', 89),
(52, 'cash on delivery', 'Advance Paid', 0, '', 89),
(53, 'cash on delivery', 'Advance Paid', 0, '', 89),
(54, 'cash on delivery', 'Advance Paid', 0, '', 92),
(55, 'cash on delivery', 'Advance Paid', 0, '', 92),
(56, 'cash on delivery', 'Advance Paid', 0, '', 92),
(57, 'cash on delivery', 'Advance Paid', 0, '', 92),
(58, 'cash on delivery', 'Advance Paid', 0, '', 92),
(59, 'cash on delivery', 'Advance Paid', 0, '', 92),
(60, 'cash on delivery', 'Advance Paid', 0, '', 92),
(61, 'cash on delivery', 'Advance Paid', 0, '', 92),
(62, 'card', 'Paid', 0, '', 92),
(63, 'card', 'Paid', 0, '', 92),
(64, 'card', 'Paid', 0, '', 94),
(65, 'card', 'Paid', 0, '', 95),
(66, 'card', 'Paid', 0, '', 96),
(67, 'card', 'Paid', 0, '', 97),
(68, 'cash', 'Paid', 0, '', 98),
(69, 'cash', 'Paid', 0, '', 99),
(70, 'card', 'Paid', 0, '', 101),
(71, 'cash on delivery', 'Paid', 0, 'bill4.jpg', 102),
(72, 'cash on delivery', 'Paid', 0, 'bill5.jpg', 103),
(73, 'cash on delivery', 'Advance Paid', 0, '', 104),
(74, 'cash on delivery', 'Paid', 0, 'bill6.jpg', 108),
(75, 'cash on delivery', 'Paid', 0, '', 110),
(76, 'cash', 'Paid', 0, '', 112),
(77, 'cash on delivery', 'Paid', 0, 'bill4.jpg', 113),
(78, 'cash on delivery', 'Advance Paid', 0, '', 114),
(79, 'cash on delivery', 'Paid', 0, 'bill1.png', 115),
(80, 'cash', 'Paid', 0, '', 116),
(81, 'cash on delivery', 'Paid', 0, 'bill5.jpg', 117),
(82, 'cash', 'Paid', 0, '', 117),
(83, 'cash on delivery', 'Paid', 0, 'bill4.jpg', 119);

-- --------------------------------------------------------

--
-- Table structure for table `pproduct`
--

CREATE TABLE `pproduct` (
  `product_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `quantity` varchar(10) NOT NULL,
  `material` varchar(50) NOT NULL,
  `product_img` text NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `measurement` varchar(100) NOT NULL,
  `color` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pproduct`
--

INSERT INTO `pproduct` (`product_id`, `price`, `product_name`, `quantity`, `material`, `product_img`, `category_id`, `description`, `measurement`, `color`) VALUES
(1, 1200, 'Plastic chair', '2', 'wooden', '/c7.jpg\n', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(2, 1800, 'chair', '10', 'wooden', '/c5.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(3, 1300, 'Garden Dining Chair', '5', 'Iron', '/ch1.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(4, 1500, 'Side chair', '10', 'plastic', '/images/ch2.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(5, 18000, 'Dining chair', '5', 'wood', '/ch3.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(6, 800, 'Sunshine chair', '18', 'plastic', '/ch4.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(7, 8000, 'computer chair', '5', 'plastic', 'c4.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(8, 5000, 'Fabric chair', '4', 'wood', 'c2.jpg', 3, 'This is the chair set. We have multiple color such as brown, butter color.', '', ''),
(9, 25000, 'Dining set', '3', 'wooden', '/d5.jpg', 1, '', '', ''),
(10, 35000, 'Dining set', '0', '', '/d4.jpg', 1, '', '', ''),
(11, 20000, 'plastic dining set', '5', '', '/d6.jpg', 1, '', '', ''),
(12, 25999, 'Bistro & Dining set', '3', '', '/d8.jpg', 1, '', '', ''),
(13, 32999, 'Glass Dining set', '3', '', '/d11.jpg', 1, '', '', ''),
(14, 32000, 'Patio Sets ', '3', '', '/d10.jpg', 1, '', '', ''),
(15, 27000, 'Dining set', '2', '', 'd2.jpg', 1, '', '', ''),
(16, 50999, 'Rectangular set', '4', '', 'd12.jpeg\r\n', 1, '', '', ''),
(17, 120000, '', '2', '', 's1.jpg', 4, '', '', ''),
(18, 0, '', '2', '', 's2.jpg', 4, '', '', ''),
(19, 0, '', '3', '', 's3.png', 4, '', '', ''),
(20, 4000, 'Round Table', '3', '', 's4.jpg', 4, '', '', ''),
(21, 1599, 'Low Pot Table Lamp', '5', '', 'g1.jpg', 5, '', '', ''),
(22, 2199, 'Wailea outdoor chair', '5', '', 'g2.jpg', 5, '', '', ''),
(23, 3799, 'Dog Bed', '5', '', 'g3.jpg', 5, '', '', ''),
(24, 3999, 'BookShelf', '5', '', 'g4.jpg', 5, '', '', ''),
(25, 1999, 'child Table', '5', '', 'g5.jpg', 5, '', '', ''),
(26, 3999, 'CupBoard ', '5', '', 'g6.jpg', 5, '', '', ''),
(27, 3199, 'Bamboo Round Table', '5', '', 'g7.jpg', 5, '', '', ''),
(28, 5490, 'Book Smarts', '3', '', 'g8.jpg', 5, '', '', ''),
(29, 2000, 'Metal table', '4', '', 'chair.jpg', 5, '', '', ''),
(30, 0, 'Table', '1', 'wood', '', 7, 'Tablefhhd', '', ''),
(31, 0, 'Dining table', '1', 'wood', '', 7, 'Dining table', '', ''),
(32, 4000, 'Table', '1', 'wood', 'table1.jpg', 7, 'Tablefhhd', '', ''),
(33, 3000, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(34, 0, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(35, 2000, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(36, 4000, 'Round table', '1', 'wood', 'g7.jpg', 7, 'Round table bxcnxbn', '', ''),
(37, 5000, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(38, 3000, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(39, 6000, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(40, 6000, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(41, 2000, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(42, 3000, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(43, 5500, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(44, 3200, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(45, 3500, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(46, 4200, 'Round table', '1', 'wood', 'g7.jpg', 7, 'Round table bxcnxbn', '', ''),
(47, 1500, 'Round table', '1', 'wood', 'g7.jpg', 7, 'Round table bxcnxbn', '', ''),
(48, 4400, 'Round table', '1', 'wood', 'g7.jpg', 7, 'Round table bxcnxbn', '', ''),
(49, 3200, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(50, 4000, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(51, 1200, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(52, 3100, 'Round table', '1', 'wood', 'g7.jpg', 7, 'Round table bxcnxbn', '', ''),
(53, 4000, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(54, 2000, 'Dining table', '1', 'wood', 'dining1.jpg', 7, 'Dining table', '', ''),
(55, 10, 'table', '4', 'wood', 'table1.jpg', 2, 'This is the dining set. We have multiple color such as brown, butter color.', '', ''),
(56, 0, 'Sponch Chair', '6', 'Sponch', 'ch.jpg', 3, 'This is the stool. We have multiple color such as brown, black color.', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `price` varchar(100) NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `quantity` varchar(10) NOT NULL,
  `material` varchar(50) NOT NULL,
  `product_img` varchar(20) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `price`, `product_name`, `quantity`, `material`, `product_img`, `category_id`) VALUES
(2, 'Rs.25,000.00', 'sofa', '5', 'fabric', '', 9),
(3, 'Rs.10,000.00', 'Table', '5', 'wood', '', 9),
(4, '', '', '', '', '9', 0),
(5, '', '', '', '', '9', 0);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `currency` varchar(2) NOT NULL DEFAULT 'Rs',
  `price` int(20) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `quantity` varchar(10) NOT NULL,
  `material` varchar(50) NOT NULL,
  `product_img` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `description` varchar(255) NOT NULL,
  `measurement` varchar(255) NOT NULL,
  `color` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `currency`, `price`, `product_name`, `quantity`, `material`, `product_img`, `category_id`, `start_date`, `end_date`, `description`, `measurement`, `color`) VALUES
(1, 'Rs', 1200, 'Plastic chair', '5', 'wooden', 'c7.jpg\r\n', 3, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(2, 'Rs', 1800, 'chair', '1', 'wooden', 'c5.jpg', 3, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(3, 'Rs', 1300, 'Garden Dining Chair', '5', 'Iron', 'ch1.jpg', 3, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(4, 'Rs', 1500, 'Side chair', '5', 'plastic', 'ch2.jpg', 3, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(5, 'Rs', 18000, 'Dining chair', '5', 'wood', 'ch3.jpg', 3, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(6, 'Rs', 800, 'Sunshine chair', '5', 'plastic', 'ch4.jpg', 3, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(7, 'Rs', 8000, 'computer chair', '5', 'plastic', 'c4.jpg', 3, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(8, 'Rs', 5000, 'Fabric chair', '5', 'wood', 'c2.jpg', 3, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(9, 'Rs', 25000, 'Dining set', '2', 'wooden', 'd5.jpg', 1, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(10, 'Rs', 35000, 'Dining set', '3', 'wooden', 'd4.jpg', 1, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(11, 'Rs', 20000, 'plastic dining set', '0', 'plastic', 'd6.jpg', 1, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(12, 'Rs', 25000, 'Bistro & Dining set', '4', 'wooden', 'd8.jpg', 1, '0000-00-00', '2021-10-29', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(13, 'Rs', 32000, 'Glass Dining set', '5', 'glass and metal', 'd11.jpg', 1, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(14, 'Rs', 32000, 'Patio Sets ', '4', 'wood', 'd10.jpg', 1, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(15, 'Rs', 27000, 'Dining set', '5', 'wooden', 'd2.jpg', 1, '0000-00-00', '2021-09-30', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(16, 'Rs', 50000, 'Rectangular set', '5', 'wooden', 'd12.jpeg\r\n', 1, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(17, 'Rs', 120000, 'Luxury Sofa set', '5', 'Chair Upholstery Fabric', 's1.jpg', 4, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(18, 'Rs', 47500, 'Modern Sofa set', '5', 'Marine Grade Vinyl', 's2.jpg', 4, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(19, 'Rs', 15000, '3 piece patio', '5', 'Marine Grade Vinyl Faux Leather Fabric', 's3.png', 4, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(20, 'Rs', 45000, 'Havertys kara sofa', '5', 'Marine Grade Vinyl Faux Leather Fabric', 's4.jpg', 4, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(21, 'Rs', 1500, 'Low Pot Table Lamp', '5', '', 'g1.jpg', 6, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(22, 'Rs', 2100, 'Wailea outdoor chair', '5', '', 'g2.jpg', 6, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(23, 'Rs', 37000, 'Dog Bed', '5', '', 'g3.jpg', 6, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(24, 'Rs', 3900, 'BookShelf', '5', '', 'g4.jpg', 6, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(25, 'Rs', 19000, 'child Table', '5', '', 'g5.jpg', 6, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(26, 'Rs', 3999, 'CupBoard ', '5', '', 'g6.jpg', 6, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(27, 'Rs', 31000, 'Bamboo Round Table', '5', '', 'g7.jpg', 6, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(28, 'Rs', 54000, 'Book Smarts', '5', '', 'g8.jpg', 6, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(29, 'Rs', 82500, 'Lawson-style sofa', '5', 'Marine Grade Vinyl Faux Leather Fabric', 's5.jpg', 4, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(30, 'Rs', 45000, 'Matelasse Damask Sofa', '5', 'Chair Upholstery Fabric', 's6.jpg', 4, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(31, 'Rs', 43000, 'Suede Sofa', '5', 'Chair Upholstery Fabric', 's7.png\r\n\r\n', 4, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(32, 'Rs', 25000, 'Dipan Minimalis', '5', 'wooden', 'b1.jpg', 5, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(33, 'Rs', 35000, 'vicente Bed', '5', 'cotton', 'b2.jpg', 5, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(34, 'Rs', 20000, 'Distrikt Bed', '5', 'cotton', 'b3.jpg', 5, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(35, 'Rs', 25000, 'Bistro & Dining set', '5', 'fabric', 'b4.jpg', 5, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(36, 'Rs', 32000, 'double bed set', '5', 'Upholstery Fabric', 'b5.png', 5, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(37, 'Rs', 32000, 'Patio Sets ', '5', 'cotton', 'b6.jpeg', 5, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(38, 'Rs', 32000, 'Patio Sets ', '5', 'cotton', 'b7.jpg', 5, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(39, 'Rs', 32000, 'Patio Sets ', '5', 'cotton', 'b8.jpeg\r\n', 5, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(40, 'Rs', 15000, 'Child chair', '5', 'wood and plastic', 'pp1.jpe\ng', 8, '2021-09-15', '2021-09-30', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(41, 'Rs', 28000, 'Child rounded table', '5', 'glass and wood ', 'pp2.jpg', 8, '2021-09-15', '2021-09-30', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(42, 'Rs', 3900, 'Child cushion', '5', 'cusion', 'pp3.jpg', 8, '2021-09-15', '2021-09-30', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(43, 'Rs', 45000, 'Chair', '1', 'wood', '6f3368021277ef187120437881eb439e.jpg', 7, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', '#7c4b4b'),
(44, 'Rs', 20000, 'table', '1', 'wood', '85b2389767fb03f32a575f802c056d71.jpg', 7, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', '#6f2f2f'),
(45, 'Rs', 30000, 'cupboard', '1', 'metal', '11adcc25b675f9541c288511ca156f42.jpg', 7, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', '#6d5f5f'),
(47, 'Rs', 12000, 'table', '1', 'wood', '36_ Round Top Pedestal Dining Table with 12_ Drop Leaf - International Concepts.jpg', 7, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', '#5a4444'),
(48, 'Rs', 12000, 'chair', '1', 'wood', 'ch4.jpg', 7, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', '#674646'),
(49, 'Rs', 10000, 'rounded table', '4', 'wood', '36_ Round Top Pedestal Dining Table with 12_ Drop Leaf - International Concepts.jpg', 2, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(50, 'Rs', 20000, 'table', '1', 'wood', '0b31579505c4915745b4883df68ab937.jpg', 7, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', '#784a4a'),
(51, 'Rs', 4000, 'new chair', '2', 'metal', 'pp3.jpg', 3, '2021-09-19', '2021-09-22', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(52, 'Rs', 1000, 'chair', '1', 'wood', 'ch1.jpg', 7, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', '#c71a1a'),
(53, 'Rs', 120000, 'table', '4', 'wood', '85b2389767fb03f32a575f802c056d71.jpg', 2, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(54, 'Rs', 3000, 'chair', '5', 'wood', 'Fluellen Ladder Back Stacking Side Chair.jpg', 3, '2021-09-15', '2021-09-29', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(55, 'Rs', 20000, 'chair', '6', 'wood', '6f3368021277ef187120437881eb439e.jpg', 3, '0000-00-00', '0000-00-00', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(56, 'Rs', 3000, 'table', '7', 'wood', '0b31579505c4915745b4883df68ab937.jpg', 2, '2021-09-09', '2021-09-30', 'Table & Chair - Wipe Clean using a damp cloth & a mild cleaner, Wipe dry with a clean cloth/Chair Cover - Machine wash warm, Normal Cycle, Do not bleach, Do not tumble dry, Iron medium temperature max 300F/150C, Dry Clean any solvent except tricholoethyle', '', ''),
(57, 'Rs', 20000, 'table', '6', 'wood', '0b31579505c4915745b4883df68ab937.jpg', 2, '0000-00-00', '0000-00-00', 'wooden', '', ''),
(58, 'Rs', 3000, 'table', '4', 'wood', 'Ascot Accent Table - Black.jpg', 8, '2021-09-21', '2021-09-29', 'wooden', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `return_item`
--

CREATE TABLE `return_item` (
  `return_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `return_date` date NOT NULL,
  `reason` varchar(200) NOT NULL,
  `order_id` int(11) NOT NULL,
  `reschedule_date` date NOT NULL,
  `return_status` varchar(100) NOT NULL,
  `o_priority` tinyint(1) NOT NULL,
  `product_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `return_item`
--

INSERT INTO `return_item` (`return_id`, `employee_id`, `return_date`, `reason`, `order_id`, `reschedule_date`, `return_status`, `o_priority`, `product_id`) VALUES
(12, 71, '2021-09-13', 'Scrached', 70, '2021-09-15', 'Completed', 0, 15),
(13, 69, '2021-09-20', 'Painting Missing', 71, '2021-09-27', 'Completed', 0, 9),
(14, 70, '2021-09-14', 'broken handles', 72, '2021-09-20', 'Completed', 0, 0),
(15, 70, '2021-09-19', 'broken handles', 77, '2021-09-22', 'Completed', 0, 16);

-- --------------------------------------------------------

--
-- Table structure for table `userlogin`
--

CREATE TABLE `userlogin` (
  `u_email` varchar(100) NOT NULL,
  `u_name` varchar(100) NOT NULL,
  `u_password` varchar(600) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_role` varchar(25) NOT NULL,
  `u_otp` int(20) NOT NULL,
  `u_verify` int(10) NOT NULL,
  `reset_otp` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userlogin`
--

INSERT INTO `userlogin` (`u_email`, `u_name`, `u_password`, `user_id`, `user_role`, `u_otp`, `u_verify`, `reset_otp`) VALUES
('karunyakunaratnam@gmail.com', 'Karunya', '$2b$10$3HT0zVuLNeGCOGb597SNdehqm0qdZvUhz0SWNxiRJZ2Z/ZsaO5Zly', 15, 'Delivery Manager', 0, 1, 957829),
('groupcs13ucsc@gmail.com', 'Kamal', '$2b$10$PsBqGtzVBuQBauZN5IdfgOnl.JXVYSw81.lOkNKOPzXGIG.dIH6.u', 16, 'Delivery Person', 267129, 1, 0),
('karunyachemis@gmail.com', 'Karthick', '$2b$10$2fDZadp9xm6RWCY9/0Be3OH/5istmKE7Dvq5betgXQzdgF4Gf9Uji', 17, 'Delivery Person', 771750, 1, 0),
('pirashathkunaratnam28@gmail.com', 'Ashwin', '$2b$10$5eB.uM5.VDbwGo/12sM66uk1cQWNkVWAf.gMTpbWowPMaNULctHp.', 18, 'Delivery Person', 155995, 1, 0),
('gajanikangesan@gmail.com ', 'gajani', '$2b$10$SEckVv6Ynk.HIulgRiiyxeSShex.hfKGA.FEUuLC9qaB1PY8A.FuS', 19, 'Customer', 540320, 1, 0),
('suviyoga2@gmail.com', 'Suvitha Yoganathan', '$2b$10$uR1f1nVF.Ra.28auwKsC1.NPyGs1cW1zrNuEqF7TCZ6ewaG5Glx3G', 20, 'admin', 280244, 1, 230308),
('daranyasehar@gmail.com', 'Daranya Manisekaran', '$2b$10$a2NcaWrXf0VAqS4w5sELge4eost4h9kVR67TyOILLP5LSD5illKma', 21, 'Sales Manager', 946631, 1, 736992),
('gajanikank19@gmail.com', 'Gajani kangesan', '$2b$10$LhIVF090rdSNaqURMWwm2e0/HIYL/CCRo8C2XDJgiePncq4bBKvVy', 25, 'Customer', 882349, 1, 0),
('2018cs070@stu.ucsc.cmb.ac.lk', 'suvitha yogaa', '$2b$10$SeLJJfi85wgHvvPXXUGdl.YNdCboh.pfvLxSBLkjraDEv38UUDpI.', 27, 'Customer', 655960, 1, 0),
('2018cs050@stu.ucsc.cmb.ac.lk', 'Karunya kunaratnam', '$2b$10$HqibYH4kSw0EAxF/s4WV7.I5XclK215AQqzRsh1Ykl2a.BWvhBZlm', 28, 'Customer', 683044, 1, 0),
('2018cs080@stu.ucsc.cmb.ac.lk', 'Karunya ', '$2b$10$17pWlTesPO/m2XtKpGJree0Xz2pgo0OScXNFoikA6bX.tp6To79w.', 29, 'Customer', 897214, 1, 0),
('2018cs000@stu.ucsc.cmb.ac.lk', 'Karunya Kunaratnam', '$2b$10$KKr8SZKh3SH6Es5tZDBSK.nLRvXZR.NpgweK2bE.XpPTGYiMBijXe', 30, 'Customer', 787993, 1, 0),
('2018cs0980@stu.ucsc.cmb.ac.lk', 'KAJANI', '$2b$10$FSDT4a6s57wCWY5zp3SCLutfdvggFIouu.Pv/DHLQsVENN3lPjpOG', 32, 'Customer', 429226, 0, 0),
('2018cs090@stu.ucsc.cmb.ac.lk', 'KARUNYA', '$2b$10$pR90XdO5foZ9ZuyYio.Th.I8aO2nftFEFTencZ0Chu4A9on9OOXIO', 33, 'Customer', 766885, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `cart1` (`customer_id`),
  ADD KEY `cart2` (`product_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `cart1` (`customer_id`),
  ADD KEY `cart2` (`product_id`);

--
-- Indexes for table `cartsss`
--
ALTER TABLE `cartsss`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `cart1` (`customer_id`),
  ADD KEY `cart2` (`product_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `customized_products`
--
ALTER TABLE `customized_products`
  ADD PRIMARY KEY (`cus_product_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `delivery`
--
ALTER TABLE `delivery`
  ADD PRIMARY KEY (`delivery_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `returned_id` (`returned_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gift`
--
ALTER TABLE `gift`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `oldcategory`
--
ALTER TABLE `oldcategory`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `oldproducts`
--
ALTER TABLE `oldproducts`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`order_id`,`product_id`);

--
-- Indexes for table `orderitemsss`
--
ALTER TABLE `orderitemsss`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `orderproduct`
--
ALTER TABLE `orderproduct`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `pproduct`
--
ALTER TABLE `pproduct`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `return_item`
--
ALTER TABLE `return_item`
  ADD PRIMARY KEY (`return_id`),
  ADD KEY `employee_id` (`employee_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `userlogin`
--
ALTER TABLE `userlogin`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT for table `cartsss`
--
ALTER TABLE `cartsss`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `customized_products`
--
ALTER TABLE `customized_products`
  MODIFY `cus_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `delivery`
--
ALTER TABLE `delivery`
  MODIFY `delivery_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `gift`
--
ALTER TABLE `gift`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `oldcategory`
--
ALTER TABLE `oldcategory`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `oldproducts`
--
ALTER TABLE `oldproducts`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

--
-- AUTO_INCREMENT for table `orderitemsss`
--
ALTER TABLE `orderitemsss`
  MODIFY `order_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderproduct`
--
ALTER TABLE `orderproduct`
  MODIFY `order_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `pproduct`
--
ALTER TABLE `pproduct`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `return_item`
--
ALTER TABLE `return_item`
  MODIFY `return_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `userlogin`
--
ALTER TABLE `userlogin`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `cart1` FOREIGN KEY (`customer_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `cart2` FOREIGN KEY (`product_id`) REFERENCES `pproduct` (`product_id`);

--
-- Constraints for table `customized_products`
--
ALTER TABLE `customized_products`
  ADD CONSTRAINT `customized_products_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`);

--
-- Constraints for table `delivery`
--
ALTER TABLE `delivery`
  ADD CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `userlogin` (`user_id`),
  ADD CONSTRAINT `delivery_ibfk_3` FOREIGN KEY (`returned_id`) REFERENCES `return_item` (`return_id`);

--
-- Constraints for table `oldproducts`
--
ALTER TABLE `oldproducts`
  ADD CONSTRAINT `oldproducts_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `oldcategory` (`category_id`);

--
-- Constraints for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `orderitemsss`
--
ALTER TABLE `orderitemsss`
  ADD CONSTRAINT `orderitemsss_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`);

--
-- Constraints for table `return_item`
--
ALTER TABLE `return_item`
  ADD CONSTRAINT `return_item_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`),
  ADD CONSTRAINT `return_item_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
