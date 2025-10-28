-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 28, 2023 at 11:57 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medical`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adm_id` int(222) NOT NULL,
  `username` varchar(222) NOT NULL,
  `password` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `code` varchar(222) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `rs` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adm_id`, `username`, `password`, `email`, `code`, `date`, `rs`) VALUES
(1, 'admin', '81dc9bdb52d04dc20036dbd8313ed055', 'admin@mail.com', '', '2023-08-24 06:19:40', 1),
(2, 'Raisa', '81dc9bdb52d04dc20036dbd8313ed055', 'raisa@gmail.com', '', '2023-08-25 05:10:32', 2),
(3, 'Test', '81dc9bdb52d04dc20036dbd8313ed055', 'test@gmail.com', '', '2023-08-24 06:35:49', 3),
(4, 'rohan', 'fcea920f7412b5da7be0cf42b8c93759', 'rohan@gmail.com', '', '2023-08-28 09:25:35', 4),
(5, 'sakin khan', 'a8698009bce6d1b8c2128eddefc25aad', 'sakib@gmail.com', '', '2023-08-26 06:57:04', 5),
(6, 'niloy', '25d55ad283aa400af464c76d713c07ad', 'niloy@gmail.com', '', '2023-08-28 09:27:42', 0);

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `d_id` int(222) NOT NULL,
  `rs_id` int(222) NOT NULL,
  `title` varchar(222) NOT NULL,
  `slogan` varchar(222) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `img` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`d_id`, `rs_id`, `title`, `slogan`, `price`, `img`) VALUES
(1, 1, 'Zimax', 'Medicine of fever.', 140.00, '62908867a48e4.jpg'),
(2, 1, 'Zimax', 'syrap', 300.00, '629089fee52b9.jpg'),
(3, 4, 'Myolax50', 'Tablet', 230.00, '62908bdf2f581.jpg'),
(4, 1, 'XpaXR', 'For childern', 180.00, '62908d393465b.jpg'),
(5, 2, 'Myolox 50', 'For better health', 500.00, '606d7491a9d13.jpg'),
(6, 2, 'Napa', 'For you', 500.00, '606d74c416da5.jpg'),
(7, 2, 'Ambox', 'syrup', 200.00, '606d74f6ecbbb.jpg'),
(8, 2, 'Tory90', 'Null', 100.00, '606d752a209c3.jpg'),
(9, 3, 'ETP', '25', 500.00, '606d7575798fb.jpg'),
(10, 3, 'Myolax', '50', 700.00, '606d75a7e21ec.jpg'),
(11, 3, 'Estromeg', '25', 600.00, '606d75ce105d0.jpg'),
(12, 3, 'Astrosin', 'TS', 100.00, '606d7600dc54c.jpg'),
(13, 4, 'DDR', '30', 1100.00, '606d765f69a19.jpg'),
(14, 4, 'XpaXR', 'for back pain', 300.00, '606d768a1b2a1.jpg'),
(15, 4, 'Zimax', '500', 200.00, '606d76ad0c0cb.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `remark`
--

CREATE TABLE `remark` (
  `id` int(11) NOT NULL,
  `frm_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `remark` mediumtext NOT NULL,
  `remarkDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `remark`
--

INSERT INTO `remark` (`id`, `frm_id`, `status`, `remark`, `remarkDate`) VALUES
(1, 2, 'in process', 'none', '2023-07-01 05:17:49'),
(2, 3, 'in process', 'none', '2023-07-27 11:01:30'),
(3, 2, 'closed', 'thank you for your order!', '2023-07-27 11:11:41'),
(4, 3, 'closed', 'none', '2023-07-27 11:42:35'),
(5, 4, 'in process', 'none', '2023-07-27 11:42:55'),
(6, 1, 'rejected', 'none', '2023-07-27 11:43:26'),
(7, 7, 'in process', 'none', '2023-07-27 13:03:24'),
(8, 8, 'in process', 'none', '2023-07-27 13:03:38'),
(9, 9, 'rejected', 'thank you', '2023-07-27 13:03:53'),
(10, 7, 'closed', 'thank you for your ordering with us', '2023-07-27 13:04:33'),
(11, 8, 'closed', 'thanks ', '2023-07-27 13:05:24'),
(12, 5, 'closed', 'none', '2023-07-27 13:18:03'),
(13, 13, 'in process', 'ok', '2023-07-22 03:25:05'),
(14, 13, 'closed', '.', '2023-07-22 13:12:33'),
(15, 18, 'in process', 'on the way', '2023-08-26 05:36:04'),
(16, 18, 'closed', 'd', '2023-08-26 05:40:01');

-- --------------------------------------------------------

--
-- Table structure for table `res_category`
--

CREATE TABLE `res_category` (
  `c_id` int(222) NOT NULL,
  `c_name` varchar(222) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `res_category`
--

INSERT INTO `res_category` (`c_id`, `c_name`, `date`) VALUES
(1, 'Online shop', '2023-08-27 18:01:30'),
(2, 'Pharmacy', '2023-08-27 18:01:30');

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `rs_id` int(222) NOT NULL,
  `c_id` int(222) NOT NULL,
  `title` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `phone` varchar(222) NOT NULL,
  `url` varchar(222) NOT NULL,
  `o_hr` varchar(222) NOT NULL,
  `c_hr` varchar(222) NOT NULL,
  `o_days` varchar(222) NOT NULL,
  `address` text NOT NULL,
  `image` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`rs_id`, `c_id`, `title`, `email`, `phone`, `url`, `o_hr`, `c_hr`, `o_days`, `address`, `image`, `date`) VALUES
(1, 1, 'AYURVEDIC', 'ayu@mail.com', '3547854700', 'www.ayu.com', '8am', '8pm', 'mon-sat', 'mohakhali', '6290877b473ce.jpg', '2023-08-27 17:38:05'),
(2, 2, 'EVOMED', 'evo@gmail.com', '0557426406', 'www.evo.com', '11am', '9pm', 'Mon-Sat', 'banani', '606d720b5fc71.jpg', '2023-08-27 17:38:05'),
(3, 3, 'MEMEDI', 'memedi@gmail.com', '1458745855', 'www.memedi.com', '9am', '8pm', 'mon-sat', 'khilgao', '6290860e72d1e.jpg', '2023-08-27 17:38:05'),
(4, 4, 'MEDICAL SHOP', 'shop.com', '6545687458', 'www.shop.com', '7am', '8pm', 'mon-sat', 'banosri', '6290af6f81887.jpg', '2023-08-27 17:38:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(222) NOT NULL,
  `username` varchar(222) NOT NULL,
  `f_name` varchar(222) NOT NULL,
  `l_name` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `phone` varchar(222) NOT NULL,
  `password` varchar(222) NOT NULL,
  `address` text NOT NULL,
  `status` int(222) NOT NULL DEFAULT 1,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `username`, `f_name`, `l_name`, `email`, `phone`, `password`, `address`, `status`, `date`) VALUES
(1, 'risha', 'risha', 'tasnin', 'risha@mail.com', '1458965547', 'a32de55ffd7a9c4101a0c5c8788b38ed', 'mohakhali', 1, '2023-08-15 08:40:36'),
(2, 'rohan', 'rohan', 'hafiz', 'rohan@mail.com', '3578545458', 'bc28715006af20d0e961afd053a984d9', 'GULSAN', 1, '2023-05-27 08:41:07'),
(3, 'dipika', 'dipika', 'padukon', 'dipika@mail.com', '0258545696', '58b2318af54435138065ee13dd8bea16', 'gulistan', 1, '2023-07-27 08:41:37'),
(4, 'ranvir', 'ranvir', 'singh', 'ranvib@mail.com', '7412580010', '5f4dcc3b5aa765d61d8327deb882cf99', 'dhanmondi', 1, '2023-07-01 05:14:42'),
(5, 'alila', 'alia', 'vatt', 'alia@mail.com', '7896547850', '5f4dcc3b5aa765d61d8327deb882cf99', 'kolabagan', 1, '2023-07-27 10:53:51'),
(6, 'katrina', 'katrina', 'kaif', 'kat@mail.com', '7896969696', '5f4dcc3b5aa765d61d8327deb882cf99', 'banani', 1, '2023-08-25 05:24:48'),
(8, 'akib', 'Meraj', 'Hosen', 'akib@gmail.com', '01600000000', '81dc9bdb52d04dc20036dbd8313ed055', 'uttora', 1, '2023-08-25 05:24:48'),
(9, '', 'som', 'borua', 'som@gmail.com', '1234567890', 'e10adc3949ba59abbe56e057f20f883e', 'dhaka', 1, '2023-08-26 05:31:13'),
(10, 'shom', 'shom', 'shom', 's@gmail.com', '1234567892', 'e10adc3949ba59abbe56e057f20f883e', '232141', 1, '2023-08-26 05:33:10'),
(11, 'joyboy', 'joy', 'boy', 'joy@gmail.com', '01234567898', '25f9e794323b453885f5181f1b624d0b', 'ochinpur', 1, '2023-08-28 09:38:04');

-- --------------------------------------------------------

--
-- Table structure for table `users_orders`
--

CREATE TABLE `users_orders` (
  `o_id` int(222) NOT NULL,
  `u_id` int(222) NOT NULL,
  `title` varchar(222) NOT NULL,
  `quantity` int(222) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(222) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `code` varchar(222) DEFAULT NULL,
  `rs_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users_orders`
--

INSERT INTO `users_orders` (`o_id`, `u_id`, `title`, `quantity`, `price`, `status`, `date`, `code`, `rs_id`) VALUES
(1, 4, 'XpaXR', 2, 600.00, 'rejected', '2023-08-28 09:56:44', NULL, '3'),
(2, 4, 'Zimax500', 1, 700.00, 'closed', '2023-08-28 09:56:44', NULL, '3'),
(3, 5, 'Myolax50', 2, 300.00, 'closed', '2023-08-28 09:56:44', NULL, '4'),
(4, 5, 'Arthosin', 1, 500.00, 'in process', '2023-08-28 09:56:44', NULL, '2'),
(5, 5, 'ETP25', 1, 10.00, 'closed', '2023-08-28 09:56:44', NULL, '4'),
(6, 5, 'HPRDS', 1, 140.00, NULL, '2023-08-28 09:56:44', NULL, '1'),
(7, 6, 'Tory', 1, 140.00, 'closed', '2023-08-28 09:56:44', NULL, '1'),
(8, 6, 'Brezofil', 1, 3600.00, 'closed', '2023-08-28 09:56:44', NULL, '1'),
(9, 6, 'Clofenac', 1, 800.00, 'rejected', '2023-08-28 09:56:44', NULL, '1'),
(10, 8, 'Tory90', 2, 140.00, NULL, '2023-08-28 09:56:44', NULL, '1'),
(11, 7, 'Emjard25', 1, 800.00, NULL, '2023-08-28 09:56:44', '', '1'),
(12, 7, 'DDR30', 1, 3600.00, NULL, '2023-08-28 09:56:44', '', '1'),
(13, 8, 'Ambrox', 1, 700.00, 'closed', '2023-08-28 09:56:44', '1234', '2'),
(14, 8, 'Tory90', 1, 140.00, NULL, '2023-08-28 09:56:44', '', '1'),
(15, 8, 'Napa', 1, 100.00, 'closed', '2023-08-28 09:56:44', '', '3'),
(16, 10, 'Tory90', 2, 140.00, NULL, '2023-08-28 09:56:44', '123456', '1'),
(17, 10, 'Tory90', 1, 140.00, NULL, '2023-08-28 09:56:44', '123456', '1'),
(18, 10, 'Ambrox', 1, 230.00, 'closed', '2023-08-28 09:56:44', '', '4'),
(19, 10, 'Patties', 1, 140.00, NULL, '2023-08-26 06:50:09', '567', '1'),
(20, 11, 'Zimax', 2, 140.00, NULL, '2023-08-28 09:38:43', '12345', '1'),
(21, 11, 'Zimax', 1, 140.00, NULL, '2023-08-28 09:51:38', '', '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adm_id`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`d_id`);

--
-- Indexes for table `remark`
--
ALTER TABLE `remark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `res_category`
--
ALTER TABLE `res_category`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`rs_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`);

--
-- Indexes for table `users_orders`
--
ALTER TABLE `users_orders`
  ADD PRIMARY KEY (`o_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adm_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `d_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `remark`
--
ALTER TABLE `remark`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `res_category`
--
ALTER TABLE `res_category`
  MODIFY `c_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `rs_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users_orders`
--
ALTER TABLE `users_orders`
  MODIFY `o_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
