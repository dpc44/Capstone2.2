/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `Banner` (
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `ma_phim` int DEFAULT NULL,
  `hinh_anh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`ma_banner`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `Banner_ibfk_1` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `CumRap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dia_chi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ma_he_thong_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `ma_he_thong_rap` (`ma_he_thong_rap`),
  CONSTRAINT `CumRap_ibfk_1` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `HeThongRap` (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `DatVe` (
  `tai_khoan` int DEFAULT NULL,
  `ma_lich_chieu` int DEFAULT NULL,
  `ma_ghe` int DEFAULT NULL,
  `id_dat_ve` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_dat_ve`),
  KEY `ma_ghe` (`ma_ghe`),
  KEY `ma_lich_chieu` (`ma_lich_chieu`),
  KEY `tai_khoan` (`tai_khoan`),
  CONSTRAINT `DatVe_ibfk_1` FOREIGN KEY (`tai_khoan`) REFERENCES `NguoiDung` (`tai_khoan`),
  CONSTRAINT `DatVe_ibfk_2` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `LichChieu` (`ma_lich_chieu`),
  CONSTRAINT `DatVe_ibfk_3` FOREIGN KEY (`ma_ghe`) REFERENCES `Ghe` (`ma_ghe`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loai_ghe` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ma_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `Ghe_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `HeThongRap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `LichChieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int DEFAULT NULL,
  `ma_phim` int DEFAULT NULL,
  `ngay_gio_chieu` datetime NOT NULL,
  `gia_ve` int NOT NULL,
  PRIMARY KEY (`ma_lich_chieu`),
  KEY `ma_phim` (`ma_phim`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `LichChieu_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `RapPhim` (`ma_rap`),
  CONSTRAINT `LichChieu_ibfk_2` FOREIGN KEY (`ma_phim`) REFERENCES `Phim` (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `NguoiDung` (
  `tai_khoan` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `so_dt` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mat_khau` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `loai_nguoi_dung` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`tai_khoan`),
  UNIQUE KEY `NguoiDung_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `Phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trailer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hinh_anh` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mo_ta` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ngay_khoi_chieu` date DEFAULT NULL,
  `danh_gia` int DEFAULT NULL,
  `hot` tinyint(1) DEFAULT NULL,
  `dang_chieu` tinyint(1) DEFAULT NULL,
  `sap_chieu` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ma_phim`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `RapPhim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ma_cum_rap` int DEFAULT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `ma_cum_rap` (`ma_cum_rap`),
  CONSTRAINT `RapPhim_ibfk_1` FOREIGN KEY (`ma_cum_rap`) REFERENCES `CumRap` (`ma_cum_rap`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(1, 1, 'banner_movie1.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(2, 2, 'banner_movie2.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(3, 3, 'banner_movie3.jpg');
INSERT INTO `Banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(4, 4, 'banner_movie4.jpg'),
(5, 5, 'banner_movie5.jpg');

INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(1, 'CumRap A', '123 Main St', 1);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(2, 'CumRap B', '456 Oak St', 2);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(3, 'CumRap C', '789 Pine St', 1);
INSERT INTO `CumRap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(4, 'CumRap D', '101 Elm St', 3),
(5, 'CumRap E', '202 Maple St', 4);

INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `id_dat_ve`) VALUES
(1, 1, 1, 1);
INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `id_dat_ve`) VALUES
(2, 2, 3, 2);
INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `id_dat_ve`) VALUES
(3, 3, 5, 3);
INSERT INTO `DatVe` (`tai_khoan`, `ma_lich_chieu`, `ma_ghe`, `id_dat_ve`) VALUES
(4, 4, 2, 4),
(5, 5, 4, 5),
(8, 1, 2, 6);

INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(1, 'Ghe 1', 'Standard', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(2, 'Ghe 2', 'VIP', 1);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(3, 'Ghe 3', 'Standard', 2);
INSERT INTO `Ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(4, 'Ghe 4', 'VIP', 3),
(5, 'Ghe 5', 'Standard', 4);

INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(1, 'Cineplex', 'cineplex_logo.png');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(2, 'MegaPlex', 'megaplex_logo.png');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(3, 'SilverScreens', 'silverscreens_logo.png');
INSERT INTO `HeThongRap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(4, 'StarCinemas', 'starcinemas_logo.png'),
(5, 'CinemaCity', 'cinemacity_logo.png');

INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(1, 1, 1, '2024-01-10 18:00:00', 10);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(2, 2, 2, '2024-02-15 20:30:00', 12);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(3, 3, 3, '2024-03-20 15:45:00', 15);
INSERT INTO `LichChieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(4, 4, 4, '2024-04-25 17:30:00', 8),
(5, 5, 5, '2024-05-05 21:00:00', 10),
(6, 1, 2, '2024-01-24 09:59:07', 3000);

INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(1, 'John Doe', 'john@example.com', '123456789', 'password1', 'Customer');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(2, 'Jane Doe', 'jane@example.com', '987654321', 'password2', 'Admin');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(3, 'Alice Smith', 'alice@example.com', '555111222', 'password3', 'Customer');
INSERT INTO `NguoiDung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(4, 'Bob Johnson', 'bob@example.com', '444333222', 'password4', 'Admin'),
(5, 'Charlie Brown', 'charlie@example.com', '999888777', 'password5', 'Customer'),
(8, 'thien an Poli', 'caophat1@gmail.com', '36985214789', '$2b$10$21Wg8V3GZBK4UbbsodU9PuUf21rq7r/FPYc2RkZbid/fcRmsdDLGW', 'Admin');

INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(1, 'Movie 1', 'trailer_link_1', '1706681659301_300.webp', 'Description 1', '2024-01-01', 4, 1, 1, 0);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(2, 'Movie 2', 'trailer_link_2', 'movie2.jpg', 'Description 2', '2024-02-01', 3, 0, 0, 1);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(3, 'Movie 3', 'trailer_link_3', 'movie3.jpg', 'Description 3', '2024-03-01', 5, 1, 1, 1);
INSERT INTO `Phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`) VALUES
(4, 'Movie 4', 'trailer_link_4', 'movie4.jpg', 'Description 4', '2024-04-01', 3, 0, 1, 0),
(5, 'Movie 5', 'trailer_link_5', 'movie5.jpg', 'Description 5', '2024-05-01', 4, 1, 0, 1),
(6, 'test3', 'test3 trailer', NULL, 'test3 moTa', '2024-01-26', 4, 0, 1, 0),
(7, 'test3', 'test3 trailer', '1706681732009_300.webp', 'test3 moTa', '2024-01-26', 4, 0, 1, 0);

INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(1, 'Rap 1', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(2, 'Rap 2', 1);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(3, 'Rap 3', 2);
INSERT INTO `RapPhim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(4, 'Rap 4', 3),
(5, 'Rap 5', 4);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;