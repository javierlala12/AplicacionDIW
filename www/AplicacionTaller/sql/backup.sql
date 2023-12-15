-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 30-11-2023 a las 21:33:35
-- Versión del servidor: 8.1.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `taller`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maintenance_records`
--

CREATE TABLE `maintenance_records` (
  `record_id` tinyint NOT NULL,
  `maintenance_date` varchar(255) DEFAULT NULL,
  `maintenance_type` varchar(100) DEFAULT NULL,
  `maintenance_description` text,
  `cost` varchar(255) DEFAULT NULL,
  `vehicle_id` tinyint DEFAULT NULL,
  `technician` varchar(255) DEFAULT NULL,
  `assigned_box` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `maintenance_records`
--

INSERT INTO `maintenance_records` (`record_id`, `maintenance_date`, `maintenance_type`, `maintenance_description`, `cost`, `vehicle_id`, `technician`, `assigned_box`) VALUES
(1, '2023-07-23', 'cambio de aceite', 'cambio de aceite y filtro', '11', 1, 'Juan', '1'),
(2, '2023-08-03', 'cambio de aceite', 'cambio de aceite y filtro', '50', 3, 'Pablo', '2'),
(3, '2023-09-10', 'revisión general', 'revisión general del vehículo', '100', 4, 'María', '3'),
(4, '2023-10-15', 'cambio de frenos', 'cambio de pastillas de freno delanteras', '150', 5, 'Luis', '4'),
(5, '2023-11-22', 'cambio de llantas', 'cambio de llantas y alineación', '200', 6, 'Ana', '5'),
(6, '2023-07-15', 'revisión general', 'revisión general del vehículo', '100', 7, 'Juan', '6'),
(7, '2023-08-20', 'cambio de filtro de aire', 'cambio de filtro de aire', '30', 8, 'Isabel', '7'),
(8, '2023-09-27', 'cambio de batería', 'cambio de batería', '120', 9, 'David', '8'),
(9, '2023-10-12', 'cambio de limpiaparabrisas', 'cambio de limpiaparabrisas delanteros', '40', 10, 'Sofía', '9'),
(10, '2023-11-29', 'limpieza de tapicería', 'limpieza profunda de tapicería', '80', 2, 'Pablo', '10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehicles`
--

CREATE TABLE `vehicles` (
  `vehicle_id` tinyint NOT NULL,
  `vehicle_make` varchar(255) DEFAULT NULL,
  `vehicle_model` varchar(255) DEFAULT NULL,
  `vehicle_year` varchar(10) DEFAULT NULL,
  `license_plate` varchar(20) DEFAULT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `fuel_type` varchar(50) DEFAULT NULL,
  `kilometers` varchar(10) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `vehicles`
--

INSERT INTO `vehicles` (`vehicle_id`, `vehicle_make`, `vehicle_model`, `vehicle_year`, `license_plate`, `owner`, `fuel_type`, `kilometers`, `color`) VALUES
(1, 'Ford', 'Mustang', '2023', 'ABC123', 'Pedro', 'gasolina', '1000', 'rojo'),
(2, 'Toyota', 'Camry', '2022', 'DEF456', 'María', 'híbrido', '5000', 'azul'),
(3, 'Honda', 'Accord', '2021', 'GHI789', 'Luis', 'diésel', '8000', 'verde'),
(4, 'Hyundai', 'Sonata', '2020', 'JKL012', 'Ana', 'gasolina', '12000', 'negro'),
(5, 'Nissan', 'Altima', '2019', 'MNO345', 'Juan', 'híbrido', '15000', 'blanco'),
(6, 'Kia', 'Optima', '2018', 'PQR678', 'Isabel', 'diésel', '18000', 'plata'),
(7, 'Mazda', '6', '2017', 'STU901', 'David', 'gasolina', '21000', 'gris'),
(8, 'Subaru', 'Legacy', '2016', 'VWX123', 'Sofía', 'híbrido', '24000', 'dorado'),
(9, 'Kia', 'Optima', '2018', 'PQR678', 'Isabel', 'diésel', '18000', 'plata'),
(10, 'Mazda', '6', '2017', 'STU901', 'David', 'gasolina', '21000', 'gris');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `maintenance_records`
--
ALTER TABLE `maintenance_records`
  ADD PRIMARY KEY (`record_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indices de la tabla `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`vehicle_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `maintenance_records`
--
ALTER TABLE `maintenance_records`
  MODIFY `record_id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `vehicle_id` tinyint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `maintenance_records`
--
ALTER TABLE `maintenance_records`
  ADD CONSTRAINT `maintenance_records_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`vehicle_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
