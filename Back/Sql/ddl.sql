DROP DATABASE IF EXISTS gap;

CREATE DATABASE gap;

USE gap;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS scores;

CREATE TABLE users (
	id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_user VARCHAR(255) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    password_user VARCHAR(255) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    foto MEDIUMBLOB,
    show_mail BOOLEAN DEFAULT 0,
    isVerify BOOLEAN DEFAULT 0,
    verify_code VARCHAR(20),
    descritpion VARCHAR(1000),
    sum INT DEFAULT 0,
    rol VARCHAR(10) DEFAULT "user"
    );
   
   INSERT INTO users (name_user, email, password_user, isVerify, descritpion, rol) VALUES('Zé Tó', 'zeto@gmail.com', '$2a$10$3yN.glbrrQ5s9XXyyS/F0.GqxRTclPpADWTZ4VIePIQZkKJJP4ro.', 1, 'The Boss', 'admin');

   CREATE TABLE questions (
	id_question INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(250) NOT NULL,
    body VARCHAR(1000) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,    
    id_user INT NOT NULL,
    status_enum ENUM('NO TIENE RESPUESTAS', 'TIENE RESPUESTAS', 'PREGUNTA CERRADA') NOT NULL,    
    id_answer_acepted INT,
    CONSTRAINT fk_questions_users FOREIGN KEY (id_user) REFERENCES users(id_user)
    );

    INSERT INTO questions (title, body, id_user) VALUES ('blabla', 'gigi dàgostino', 1);
    
	CREATE TABLE answers (
	id_answer INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    body VARCHAR(1000) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,  
    id_question INT NOT NULL,
    id_user INT NOT NULL,
    id_answer_father INT,    
    CONSTRAINT fk_answers_questions FOREIGN KEY (id_question) REFERENCES questions(id_question),
    CONSTRAINT fk_answers_users FOREIGN KEY (id_user) REFERENCES users(id_user)
    );
    
    INSERT INTO answers (body, id_question, id_user) VALUES ('bla bla bla', 1, 1);

    CREATE TABLE tags (
	id_tag INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(20) NOT NULL
    );
    
	CREATE TABLE question_has_tags (
	id_question INT NOT NULL,
    id_tag INT NOT NULL,
    PRIMARY KEY (id_question, id_tag),
    CONSTRAINT fk_q_t_question FOREIGN KEY (id_question) REFERENCES questions(id_question),
    CONSTRAINT fk_p_p_tag FOREIGN KEY (id_tag) REFERENCES tags(id_tag)
	);
    
    CREATE TABLE scores (
        id_question INT,
        id_answer INT,
        score INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        FOREIGN KEY (id_question) REFERENCES questions(id_question),
        FOREIGN KEY (id_answer) REFERENCES answers(id_answer)
    );

    CREATE TABLE questions_points (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        id_question INT,
        id_user INT,
        FOREIGN KEY (id_question) REFERENCES questions(id_question),
        FOREIGN KEY (id_user) REFERENCES users(id_user)
        
    );
 show databases;
 show tables;
 
 select * from answers;
 INSERT INTO users (name_user, super_user, email, password_user, reg_date, show_mail, descritpion) VALUES('Zé Tó', 1, 'zeto@gmail.com', '123456789', '2021-04-23 10:16:23', '1', 'que guay');
 select * from users;
 