CREATE TABLE IF NOT EXISTS in_room_users (
  user_id int unsigned NOT NULL,
  entered_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;