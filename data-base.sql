-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.21-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Zrzucanie danych dla tabeli megak_hospital.doctors: ~3 rows (około)
INSERT INTO `doctors` (`id`, `login`, `password`, `mail`, `name`, `lastName`, `street`, `code`, `city`, `specialization`, `price`, `latitude`, `longitude`) VALUES
	('58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'abittner', 'dc5f862ee184ee44a00e7b03264287e4b86502a7e0d9a5d3c16d46bb633b7e674505dd5caa3c79d26435d9a467a568caeef65e27d1ee57bc4f9f8080d7420289', 'abittner@o2.pl', 'Anastazja', 'Bittner', 'Zofii Nałkowskiej 11', '01-886', 'Warszawa', 'Chirurg', '400', 52.2754097, 20.9530735),
	('dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'mkowalski', 'dc5f862ee184ee44a00e7b03264287e4b86502a7e0d9a5d3c16d46bb633b7e674505dd5caa3c79d26435d9a467a568caeef65e27d1ee57bc4f9f8080d7420289', 'mkowalski@o2.pl', 'Michał ', 'Kowalski', 'al. Jerozolimskie 200', '02-486', 'Warszawa', 'Dermatolog', '100', 52.1951256, 20.9258423),
	('e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'gmartin', 'dc5f862ee184ee44a00e7b03264287e4b86502a7e0d9a5d3c16d46bb633b7e674505dd5caa3c79d26435d9a467a568caeef65e27d1ee57bc4f9f8080d7420289', 'gmartin@o2.pl', 'Gaja', 'Martin', 'Marszałkowska 10', '00-590', 'Warszawa', 'Chirurg', '100', 52.2156448, 21.0207577),
	('f58a629f-a770-410d-b6c2-784a455c989c', 'awisniewska', 'dc5f862ee184ee44a00e7b03264287e4b86502a7e0d9a5d3c16d46bb633b7e674505dd5caa3c79d26435d9a467a568caeef65e27d1ee57bc4f9f8080d7420289', 'awisniewska@o2.pl', 'Anna ', 'Wiśniewska', 'ul. Puławska 37', '02-508', 'Warszawa', 'Fizjoterapeuta', '100', 52.2075768, 21.0224094);

-- Zrzucanie danych dla tabeli megak_hospital.patients: ~0 rows (około)
INSERT INTO `patients` (`id`, `login`, `password`, `mail`, `name`, `lastName`, `street`, `code`, `city`) VALUES
	('7e0cbcf3-3ccd-4366-ae69-0d2cadf4fea8', 'Jan123', 'dc5f862ee184ee44a00e7b03264287e4b86502a7e0d9a5d3c16d46bb633b7e674505dd5caa3c79d26435d9a467a568caeef65e27d1ee57bc4f9f8080d7420289', 'Jan123@o2.pl', 'Jan', 'Kowalski', 'Mokra 657', '57-683', 'Warszawa');

-- Zrzucanie danych dla tabeli megak_hospital.schedules: ~110 rows (około)
INSERT INTO `schedules` (`id`, `idDr`, `day`, `hour`) VALUES
	(2653, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Pon', '09:00'),
	(2654, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Pon', '09:30'),
	(2655, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Pon', '10:00'),
	(2656, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Pon', '10:30'),
	(2657, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Pon', '12:00'),
	(2658, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Pon', '11:15'),
	(2659, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Pon', '12:30'),
	(2660, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Pon', '13:00'),
	(2661, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Śr', '07:00'),
	(2662, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Śr', '07:30'),
	(2663, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Śr', '09:00'),
	(2664, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Śr', '08:15'),
	(2665, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Śr', '08:00'),
	(2666, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Śr', '07:45'),
	(2667, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Śr', '10:15'),
	(2668, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Śr', '11:00'),
	(2669, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Wt', '11:00'),
	(2670, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Wt', '10:15'),
	(2671, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Wt', '09:15'),
	(2672, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Wt', '12:15'),
	(2673, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Wt', '14:15'),
	(2674, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Wt', '13:45'),
	(2675, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Wt', '13:30'),
	(2676, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Wt', '13:15'),
	(2677, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Czw', '12:45'),
	(2678, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Czw', '12:30'),
	(2679, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Czw', '11:15'),
	(2680, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Czw', '10:45'),
	(2681, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Czw', '11:30'),
	(2682, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Czw', '13:45'),
	(2683, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Pt', '11:30'),
	(2684, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Pt', '10:45'),
	(2685, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Pt', '10:30'),
	(2686, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Sob', '10:15'),
	(2687, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Sob', '09:15'),
	(2688, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Sob', '11:15'),
	(2689, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Sob', '12:00'),
	(2690, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Sob', '12:15'),
	(2691, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Sob', '14:15'),
	(2692, 'e0abfa32-e8ff-49a6-8638-7116f1b4840b', 'Sob', '12:45'),
	(2833, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pon', '07:00'),
	(2834, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pon', '07:30'),
	(2835, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pon', '08:15'),
	(2836, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pon', '08:00'),
	(2837, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pon', '09:15'),
	(2838, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pon', '09:00'),
	(2839, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pon', '08:45'),
	(2840, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Wt', '08:45'),
	(2841, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Wt', '08:30'),
	(2842, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Wt', '08:00'),
	(2843, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Wt', '07:45'),
	(2844, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Śr', '07:30'),
	(2845, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Śr', '08:30'),
	(2846, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Śr', '09:30'),
	(2847, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Śr', '09:15'),
	(2848, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Czw', '09:00'),
	(2849, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Czw', '08:15'),
	(2850, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Czw', '08:00'),
	(2851, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pt', '07:45'),
	(2852, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pt', '08:15'),
	(2853, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pt', '08:30'),
	(2854, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pt', '09:00'),
	(2855, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pt', '09:15'),
	(2856, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pt', '09:30'),
	(2857, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pt', '10:15'),
	(2858, 'dd2bd77d-8d0a-4ab8-b801-69c8d152a22a', 'Pt', '10:00'),
	(2861, 'f58a629f-a770-410d-b6c2-784a455c989c', 'Wt', '06:00'),
	(2862, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pon', '07:00'),
	(2863, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pon', '07:45'),
	(2864, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pon', '08:15'),
	(2865, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pon', '08:45'),
	(2866, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pon', '09:15'),
	(2867, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pon', '10:00'),
	(2868, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Śr', '07:00'),
	(2869, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Śr', '07:30'),
	(2870, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Śr', '08:00'),
	(2871, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Śr', '08:30'),
	(2872, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Śr', '09:00'),
	(2873, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Wt', '12:00'),
	(2874, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Wt', '12:30'),
	(2875, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Wt', '13:00'),
	(2876, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Wt', '13:45'),
	(2877, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Wt', '14:15'),
	(2878, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Wt', '14:45'),
	(2879, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Wt', '15:15'),
	(2880, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Wt', '15:45'),
	(2881, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Wt', '16:30'),
	(2882, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Czw', '11:00'),
	(2883, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Czw', '11:30'),
	(2884, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Czw', '12:00'),
	(2885, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Czw', '12:30'),
	(2886, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Czw', '13:00'),
	(2887, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Czw', '13:30'),
	(2888, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Czw', '14:00'),
	(2889, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '09:00'),
	(2890, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '09:30'),
	(2891, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '10:00'),
	(2892, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '10:30'),
	(2893, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '11:00'),
	(2894, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '11:30'),
	(2895, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '12:00'),
	(2896, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '12:30'),
	(2897, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '13:00'),
	(2898, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '13:30'),
	(2899, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '14:00'),
	(2900, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Śr', '06:00'),
	(2901, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Czw', '06:00'),
	(2902, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '06:00'),
	(2903, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Pt', '06:15'),
	(2904, '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', 'Sob', '06:00');

-- Zrzucanie danych dla tabeli megak_hospital.specializations: ~24 rows (około)
INSERT INTO `specializations` (`id`, `specialization`) VALUES
	(1, 'Chirurg'),
	(2, 'Dermatolog'),
	(3, 'Dietetyk'),
	(4, 'Endokrynolog'),
	(5, 'Fizjoterapeuta'),
	(6, 'Gastrolog'),
	(7, 'Ginekolog'),
	(8, 'Internista'),
	(9, 'Kardiolog'),
	(10, 'Laryngolog'),
	(13, 'Lekarz rodzinny'),
	(14, 'Logopeda'),
	(15, 'Neurolog'),
	(16, 'Okulista'),
	(17, 'Onkolog'),
	(18, 'Ortodonta'),
	(19, 'Ortopeda'),
	(20, 'Pediatra'),
	(21, 'Psychiatra'),
	(23, 'Stomatolog'),
	(24, 'Urolog'),
	(25, 'Wenerolog'),
	(26, 'Weterynarz'),
	(27, 'Lekarz Chorób Zakaźnych');

-- Zrzucanie danych dla tabeli megak_hospital.terms: ~2 rows (około)
INSERT INTO `terms` (`id`, `hour`, `dayOfWeek`, `year`, `numberDay`, `month`, `idDr`, `idPt`, `price`, `status`, `nameDr`, `lastNameDr`, `namePt`, `lastNamePt`) VALUES
	('06:151Mrz202458c94bac-43b6-4147-a6a0-cd1d3d3730f4', '06:15', 'Pt', '2024', '1', 'Mrz', '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', '7e0cbcf3-3ccd-4366-ae69-0d2cadf4fea8', '100', 'unpaid', 'Anastazja', 'Bittner', 'Jan', 'Kowalski'),
	('11:0029Lut202458c94bac-43b6-4147-a6a0-cd1d3d3730f4', '11:00', 'Czw', '2024', '29', 'Lut', '58c94bac-43b6-4147-a6a0-cd1d3d3730f4', '7e0cbcf3-3ccd-4366-ae69-0d2cadf4fea8', '100', 'unpaid', 'Anastazja', 'Bittner', 'Jan', 'Kowalski');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
