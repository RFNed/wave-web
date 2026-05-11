SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `beatmaps` (
  `id` int NOT NULL,
  `container_id` int NOT NULL,
  `version` varchar(64) DEFAULT NULL,
  `difficulty_rating` float DEFAULT NULL,
  `bpm` float DEFAULT NULL,
  `length_seconds` int DEFAULT NULL,
  `ar` float DEFAULT NULL,
  `od` float DEFAULT NULL,
  `hp` float DEFAULT NULL,
  `file_path` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `beatmap_containers` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `artist` varchar(255) DEFAULT NULL,
  `creator_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ranked_status` enum('pending','ranked','loved') DEFAULT 'pending',
  `cover_url` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `scores` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `beatmap_id` int NOT NULL,
  `score` bigint NOT NULL,
  `max_combo` int DEFAULT NULL,
  `accuracy` float DEFAULT NULL,
  `count_perfect` int DEFAULT '0',
  `count_good` int DEFAULT '0',
  `count_meh` int DEFAULT '0',
  `count_miss` int DEFAULT '0',
  `mods` varchar(64) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(32) NOT NULL,
  `email` varchar(128) DEFAULT NULL,
  `password_hash` text NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` timestamp NULL DEFAULT NULL,
  `country` char(2) DEFAULT NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `banner_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `total_score` bigint DEFAULT '0',
  `accuracy` float DEFAULT '0',
  `play_count` int DEFAULT '0',
  `is_enabled` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


ALTER TABLE `beatmaps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `container_id` (`container_id`);

ALTER TABLE `beatmap_containers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator_id` (`creator_id`);

ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_user` (`user_id`),
  ADD KEY `idx_map` (`beatmap_id`),
  ADD KEY `idx_score` (`score`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);


ALTER TABLE `beatmaps`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `beatmap_containers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `scores`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;


ALTER TABLE `beatmaps`
  ADD CONSTRAINT `beatmaps_ibfk_1` FOREIGN KEY (`container_id`) REFERENCES `beatmap_containers` (`id`) ON DELETE CASCADE;

ALTER TABLE `beatmap_containers`
  ADD CONSTRAINT `beatmap_containers_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `scores_ibfk_2` FOREIGN KEY (`beatmap_id`) REFERENCES `beatmaps` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
