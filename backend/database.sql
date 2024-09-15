DROP DATABASE IF EXISTS project127;

CREATE OR REPLACE USER 'sirperics'@'localhost' IDENTIFIED BY 'ilove127';
CREATE DATABASE project127;
GRANT ALL ON project127.* TO 'sirperics'@'localhost';

USE project127;

CREATE TABLE user(
user_id NUMERIC(4) not null,
user_name VARCHAR(14),
full_name VARCHAR(20),
user_password VARCHAR(10),
constraint user_user_id_pk primary key(user_id)
);

CREATE TABLE food_establishment(
estab_id NUMERIC(4) not null,
estab_name VARCHAR(20),
contact_no VARCHAR(11),
estab_address VARCHAR(40),
constraint food_establishment_estab_id_pk primary key(estab_id)
);

CREATE TABLE food_item(
item_id NUMERIC(4) not null,
food_name VARCHAR(15),
price DECIMAL(6,2),
food_desc VARCHAR(50),
estab_id NUMERIC(4),
constraint food_item_item_id_pk primary key(item_id),
constraint food_item_estab_id_fk foreign key(estab_id) references food_establishment(estab_id)
);

CREATE TABLE food_type(
item_id NUMERIC(4) not null,
food_type VARCHAR(20) not null,
constraint food_type_item_id_pk primary key(item_id, food_type),
constraint food_type_item_id_fk foreign key(item_id) references food_item(item_id)
);

CREATE TABLE food_review(
review_id NUMERIC(4) not null,
rating NUMERIC(1),
content VARCHAR(70),
is_anonymous BOOLEAN default 1,
review_date DATETIME default NOW(), 
user_id NUMERIC(4),
estab_id NUMERIC(4),
item_id NUMERIC(4),
constraint food_review_review_id_pk primary key(review_id),
constraint food_review_rating_ck CHECK(rating between 1 and 5),
constraint food_review_user_id_fk foreign key(user_id) references user(user_id),
constraint food_review_estab_id_fk foreign key(estab_id) references food_establishment(estab_id),
constraint food_review_item_id_fk foreign key(item_id) references food_item(item_id)
);

INSERT INTO `user` (`user_id`, `user_name`, `full_name`, `user_password`) VALUES
  ('0001', 'JM', 'Jan Melad', 'ilove128'),
  ('0002', 'ALN', 'Algie Valles', 'ilove127'),
  ('0003', 'MN', 'Neil Autriz', 'ilovejan'),
  ('0004', 'JC', 'Julius Namata', 'ilove23');

INSERT INTO `food_establishment` (`estab_id`, `estab_name`, `contact_no`, `estab_address`) VALUES
  ('0001', 'Sweet Keish', '09455302912', 'ES Plaza, LB Grove'),
  ('0002', 'YMCA', '09123456789', 'Lower Campus, UPLB'),
  ('0003', 'Jollibee', '09321322139', 'LB Grove'),
  ('0004', "Max's Restaurant", '09987654321', 'Olivarez Plaza Mall, Batong Malake');

INSERT INTO `food_item` (`item_id`, `food_name`, `price`, `food_desc`, `estab_id`) VALUES
  ('0001', 'Lomi', '900.00', 'Masarap po', '0002'),
  ('0002', 'Pancit Canton', '20.00', 'K lang', '0003'),
  ('0003', 'Chicken', '100.00', 'Yummers!', '0002'),
  ('0004', "Jumbo Hotdog", '50.00', 'Yummmmm', '0001');

INSERT INTO `food_review` (`review_id`, `rating`, `content`, `is_anonymous`, `user_id`, `estab_id`, `item_id`) VALUES 
    ("0001", 5, 'This is very delicious', 1, '0001', '0001', '0004'),
    ("0004", 5, 'Delisyoso! Muy vien! Bon appetit!', 1, '0001', '0001', '0004'),
    ("0002", 5, 'Worth trying, will come back again! ', 0, '0002', '0002', '0001'),
    ("0003", 5, 'The food is remarkable! ', 1, '0003', '0003', '0002'),
    ("0005", 5, 'Very good food and great ambiance ', 0, '0004', '0002', '0003');

INSERT INTO `food_type` (`item_id`, `food_type`) VALUES
    ("0001", "Meat"),
    ("0002", "Vegetables"),
    ("0002", "Asian Cuisine"),
    ("0003", "Meat"),
    ("0004", "Processed Food")
