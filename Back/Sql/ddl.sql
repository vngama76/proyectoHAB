DROP DATABASE IF EXISTS gap;

CREATE DATABASE gap;


USE gap;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS question_has_tags;



CREATE TABLE users (
	id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    super_user BOOLEAN NOT NULL,
    name_user VARCHAR(255) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    password_user VARCHAR(255) NOT NULL,
    reg_date TIMESTAMP NOT NULL,
    foto MEDIUMBLOB,
    show_mail CHAR BINARY,
    validate boolean NOT NULL DEFAULT 0,
    descritpion VARCHAR(1000),
    sum INT
    );
   
   CREATE TABLE questions (
	id_question INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(250) NOT NULL,
    body VARCHAR(1000) NOT NULL,
    creation_date TIMESTAMP NOT NULL,
    votes_nr INT,
    id_user INT NOT NULL,
    CONSTRAINT fk_questions_users FOREIGN KEY (id_user) REFERENCES users(id_user),
    state ENUM('NO TIENE RESPUESTAS', 'TIENE RESPUESTAS', 'PREGUNTA CERRADA') NOT NULL
    );
    
	CREATE TABLE answers (
	id_answer INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    text_answer VARCHAR(1000) NOT NULL,
    creation_date TIMESTAMP NOT NULL,
    votes_nr_answer INT,
    votes_nr_answer_with_father INT,
    id_question INT NOT NULL,
    id_user INT NOT NULL,
    CONSTRAINT fk_answers_questions FOREIGN KEY (id_question) REFERENCES questions(id_question),
    CONSTRAINT fk_answers_users FOREIGN KEY (id_user) REFERENCES users(id_user)
    );
    
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
    
 show databases;
 show tables;
 
 select * from answers;
 INSERT INTO users (name_user, super_user, email, password_user, reg_date, show_mail, descritpion) VALUES('Zé Tó', 1, 'zeto@gmail.com', '123456789', '2021-04-23 10:16:23', '1', 'que guay');
 select * from users;