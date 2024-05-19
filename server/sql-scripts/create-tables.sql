CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS normal_users (
  normal_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS admin_users (
  admin_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS super_admin_users (
  super_admin_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS messages (
  message_id SERIAL PRIMARY KEY,
  from_user_id INT NOT NULL,
  to_user_id INT NOT NULL,
  message VARCHAR(255) NOT NULL,
  CONSTRAINT fk_from_user_id FOREIGN KEY (from_user_id) REFERENCES users(user_id),
  CONSTRAINT fk_to_user_id FOREIGN KEY (to_user_id) REFERENCES users(user_id)
);
