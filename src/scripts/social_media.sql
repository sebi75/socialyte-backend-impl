DROP DATABASE IF EXISTS `social_media`;
CREATE DATABASE `social_media`;
USE `social_media`;

SET NAMES utf8;
SET character_set_client = utf8mb4;

CREATE TABLE `users` (
    `uid` int(11) NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_0900_ai_ci;
INSERT INTO `users` VALUES (1, "sebys7", "sebisemeniuc@gmail.com");


