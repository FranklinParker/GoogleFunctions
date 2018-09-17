drop table contact;

  CREATE TABLE `contact` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `firstName` varchar(50) NOT NULL,
    `lastName` varchar(50) NOT NULL,
    `email` varchar(100) NOT NULL,
    `address` varchar(50) DEFAULT NULL,
    `city` varchar(50) DEFAULT NULL,
    `state` varchar(50) DEFAULT NULL,
    `zip` varchar(50) DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO contact (firstName,lastName,email) VALUES('jill','jones','jj@aol.com');
