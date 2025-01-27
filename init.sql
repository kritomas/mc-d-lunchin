CREATE SCHEMA `Food_review` DEFAULT CHARACTER SET utf8 ;
use Food_review;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20)
);

CREATE TABLE credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    credentials_id INT NOT NULL unique,
    
	CONSTRAINT fk_user_credentials
			FOREIGN KEY (credentials_id) REFERENCES credentials(id)
			ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE food (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('polévká','hlavní jídlo','dezert','jiný') NOT NULL DEFAULT 'jiný',
    is_vegetarian BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE food_category (
	id int primary key auto_increment,
    food_id INT NOT NULL,
    category_id INT NOT NULL,

    CONSTRAINT fk_foodcategory_food
        FOREIGN KEY (food_id) REFERENCES food(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_foodcategory_category
        FOREIGN KEY (category_id) REFERENCES category(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE review (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    food_id INT NOT NULL,
    rating int UNSIGNED CHECK (rating <= 100 and rating >= 0),
    comment VARCHAR(256),
    portion_size ENUM('hladový','akorát','přejedený') DEFAULT 'akorát',
    temperature ENUM('ledový','studené ','akorát','horký','vařící') DEFAULT 'akorát',
    appearance int CHECK (appearance <= 5 and appearance >= 0) default 0,
    extra_pay int DEFAULT 0,
    cook_recommendation ENUM('vařit','nevařit') DEFAULT 'vařit',
    original_created_date   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_update_date   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_review_user
        FOREIGN KEY (user_id) REFERENCES user(id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    CONSTRAINT fk_review_food
        FOREIGN KEY (food_id) REFERENCES food(id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- allergens will be added lated if needed