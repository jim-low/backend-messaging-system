INSERT INTO users(username, email, password) VALUES ('Jim', 'jim@gmail.com', 'password1');
INSERT INTO users(username, email, password) VALUES ('Ben Dover', 'ben@gmail.com', 'password2');
INSERT INTO users(username, email, password) VALUES ('Mike Oxmaul', 'mike@gmail.com', 'password3');
INSERT INTO users(username, email, password) VALUES ('Joe Mudder', 'joe@gmail.com', 'password4');
INSERT INTO users(username, email, password) VALUES ('Saw Con', 'saw@gmail.com', 'password5');

INSERT INTO super_admin_users(user_id) VALUES ((SELECT user_id FROM users WHERE username = 'Jim')); -- Jim

INSERT INTO admin_users(user_id) VALUES ((SELECT user_id FROM users WHERE username = 'Ben Dover')); -- Ben Dover
INSERT INTO admin_users(user_id) VALUES ((SELECT user_id FROM users WHERE username = 'Mike Oxmaul')); -- Mike Oxmaul

INSERT INTO normal_users(user_id) VALUES ((SELECT user_id FROM users WHERE username = 'Joe Mudder')); -- Joe Mudder
INSERT INTO normal_users(user_id) VALUES ((SELECT user_id FROM users WHERE username = 'Saw Con')); -- Saw Con

-- messages data
INSERT INTO messages(from_user_id, to_user_id, message) VALUES (1, 2, 'Hello Ben Dover');
INSERT INTO messages(from_user_id, to_user_id, message) VALUES (1, 3, 'Hello Mike Oxmaul');
INSERT INTO messages(from_user_id, to_user_id, message) VALUES (1, 4, 'Hello Joe Mudder');
INSERT INTO messages(from_user_id, to_user_id, message) VALUES (1, 5, 'How was saw con?');
INSERT INTO messages(from_user_id, to_user_id, message) VALUES (2, 3, 'Ur what small?');
INSERT INTO messages(from_user_id, to_user_id, message) VALUES (3, 5, 'what is saw con?');
INSERT INTO messages(from_user_id, to_user_id, message) VALUES (3, 2, 'what u say u wanna do?');
INSERT INTO messages(from_user_id, to_user_id, message) VALUES (4, 1, 'We go Gym');
INSERT INTO messages(from_user_id, to_user_id, message) VALUES (5, 2, 'My First name: Saw Con');
INSERT INTO messages(from_user_id, to_user_id, message) VALUES (5, 3, 'My Last name: Deez Nuts');
