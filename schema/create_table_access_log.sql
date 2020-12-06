CREATE TABLE `access_log`(
  `member_id` NOT NULL,
  `entered_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `exited_at` datetime DEFAULT NULL,
  PRIMARY KEY (`member_id`, `entered_at`)
)