-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Creato il: Gen 30, 2021 alle 18:19
-- Versione del server: 8.0.18
-- Versione PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodeapp`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `localita`
--

CREATE TABLE `localita` (
  `id` int(11) NOT NULL,
  `regione` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `citta` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `via` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `civico` int(11) DEFAULT NULL,
  `cap` int(11) DEFAULT NULL,
  `user` int(11) NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `localita`
--

INSERT INTO `localita` (`id`, `regione`, `citta`, `via`, `civico`, `cap`, `user`, `path`) VALUES
(2065, 'Lazio', 'Roma', 'ambaradam', 45, 40, 45, 'yxcQc4HgBoZOQlN49aXhxlK8.png'),
(2066, 'Sicilia', 'Palermo', 'del mare', 99, 3564, 45, 'NmuT2pfzTdQ8hLPxdvwlczmf.jpg'),
(2067, 'Toscana', 'Pisa', 'casetta', 67, 67890, 62, 'RDRAPT1YTkiW5hw2dD5wSUt7.jfif'),
(2068, 'Lazio', 'Roma', 'garibaldi', 55, 40, 62, 'GDz9cxYZjoE-_p9dkLI79kan.png');

-- --------------------------------------------------------

--
-- Struttura della tabella `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(45, 'antonio', 'anto@gmail', '2323'),
(62, 'chiara', 'chiara@mail', '3434'),
(63, 'giorgia', 'giorgia@mail', '1212'),
(64, 'ugo', 'ugo@mail', '3333');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `localita`
--
ALTER TABLE `localita`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_ins` (`user`);

--
-- Indici per le tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `localita`
--
ALTER TABLE `localita`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2071;

--
-- AUTO_INCREMENT per la tabella `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `localita`
--
ALTER TABLE `localita`
  ADD CONSTRAINT `user_ins` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
