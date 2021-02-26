CREATE TABLE IF NOT EXISTS `users_in_room` (
  `user_id` int unsigned NOT NULL,
  `entered_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
)