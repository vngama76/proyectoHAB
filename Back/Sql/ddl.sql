DROP DATABASE IF EXISTS gap;

CREATE DATABASE gap;

USE gap;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS question_tags;
DROP TABLE IF EXISTS questions_points;
DROP TABLE IF EXISTS answers_points;
DROP TABLE IF EXISTS comments_points;

CREATE TABLE users (
	id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_user VARCHAR(255) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    password_user VARCHAR(255) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    foto VARCHAR(100),
    color VARCHAR(20),
    show_mail BOOLEAN DEFAULT 0,
    isVerify BOOLEAN DEFAULT 0,
    verify_code VARCHAR(20),
    descritpion VARCHAR(1000),
    sum INT DEFAULT 0,
    rol VARCHAR(10) DEFAULT "user"
    );
   
   INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Zé Tó', 'zeto@gmail.com', 'rgb(22,88,27)', '$2a$10$3yN.glbrrQ5s9XXyyS/F0.GqxRTclPpADWTZ4VIePIQZkKJJP4ro.', 1, 'The Boss', 'admin');

   CREATE TABLE questions (
	id_question INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(250) NOT NULL,
    body VARCHAR(2500) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,    
    id_user INT NOT NULL,
    status_enum ENUM('NO TIENE RESPUESTAS', 'TIENE RESPUESTAS', 'PREGUNTA CERRADA') NOT NULL,    
    id_answer_acepted INT,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
    );

    INSERT INTO questions (title, body, id_user) VALUES ('blabla', 'gigi dàgostino', 1);
    
	CREATE TABLE answers (
	id_answer INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    body VARCHAR(1500) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,  
    id_question INT NOT NULL,
    id_user INT NOT NULL,
    id_answer_father INT,    
    FOREIGN KEY (id_question) REFERENCES questions(id_question),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
    );
    
    INSERT INTO answers (body, id_question, id_user) VALUES ('bla bla bla', 1, 1);

    CREATE TABLE tags (
	id_tag INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(20) UNIQUE NOT NULL
    );
    
	CREATE TABLE question_tags (
	id_question INT NOT NULL,
    id_tag INT NOT NULL,
    CONSTRAINT fk_q_t_question FOREIGN KEY (id_question) REFERENCES questions(id_question),
    CONSTRAINT fk_p_p_tag FOREIGN KEY (id_tag) REFERENCES tags(id_tag)
	);
   
    
    CREATE TABLE questions_points (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        id_question INT,
        id_user INT,
        id_question_user INT,
        FOREIGN KEY (id_question) REFERENCES questions(id_question),
        FOREIGN KEY (id_user) REFERENCES users(id_user),
        FOREIGN KEY (id_question_user) REFERENCES users(id_user)       
        
    );

    CREATE TABLE answers_points (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        id_answer INT,
        id_user INT,
        id_answer_user INT,
        FOREIGN KEY (id_answer) REFERENCES answers(id_answer),
        FOREIGN KEY (id_user) REFERENCES users(id_user),
        FOREIGN KEY (id_answer_user) REFERENCES users(id_user)
              
    );

    CREATE TABLE comments_points (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        id_comment INT,
        id_user INT,
        id_comment_user INT,
        FOREIGN KEY (id_comment) REFERENCES answers(id_answer),
        FOREIGN KEY (id_user) REFERENCES users(id_user),
        FOREIGN KEY (id_comment_user) REFERENCES users (id_user)      
    );



--  select * from answers;
--  INSERT INTO users (name_user, super_user, email, password_user, reg_date, show_mail, descritpion) VALUES('Zé Tó', 1, 'zeto@gmail.com', '123456789', '2021-04-23 10:16:23', '1', 'que guay');
--  select * from users;
 