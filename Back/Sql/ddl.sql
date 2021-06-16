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
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('The Dude', 'thedude@gmail.com', 'rgb(221,188,27)', '$2a$10$3yN.glbrrQ5s9XXyyS/F0.GqxRTclPpADWTZ4VIePIQZkKJJP4ro.', 1, 'El duderino', 'expert');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Lone Ranger', 'loneranger@gmail.com', 'rgb(222,88,227)', '$2a$10$3yN.glbrrQ5s9XXyyS/F0.GqxRTclPpADWTZ4VIePIQZkKJJP4ro.', 1, 'Hi ho Silver!', 'expert');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Han Acompañado', 'accompanied@gmail.com', 'rgb(22,188,227)', '$2a$10$3yN.glbrrQ5s9XXyyS/F0.GqxRTclPpADWTZ4VIePIQZkKJJP4ro.', 1, 'Nunca solo, siempre acompañado', 'user');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Beatrix Kiddo', 'beakiddo@gmail.com',  'rgb(32,18,157)','$2a$10$3yN.glbrrQ5s9XXyyS/F0.GqxRTclPpADWTZ4VIePIQZkKJJP4ro.', 1, 'It is mercy, compassion and forgiveness I lack. Not rationality.', 'expert');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Juno MacGuff', 'juno@gmail.com', 'rgb(222,25,57)', '$2a$10$3yN.glbrrQ5s9XXyyS/F0.GqxRTclPpADWTZ4VIePIQZkKJJP4ro.', 1, 'I do not know what kind of girl I am', 'user');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Mia Wallace', 'themia@gmail.com', 'rgb(122,48,27)', '$2a$10$3yN.glbrrQ5s9XXyyS/F0.GqxRTclPpADWTZ4VIePIQZkKJJP4ro.', 1, 'Why do we feel it is necessary to yak about bullshit in order to be comfortable?', 'expert');
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
 /*
 select tag_name, count(*) as incidencia,
(COUNT(*)/(select count('incidencia') from tags)) * 100
from tags
inner join question_tags on tags.id_tag = question_tags.id_tag
inner join questions on questions.id_question = question_tags.id_question
inner join users on users.id_user = questions.id_user
where users.id_user=1
group by tags.tag_name order by incidencia desc;
+----------+------------+---------------------------------------------------------+
| tag_name | incidencia | (COUNT(*)/(select count('incidencia') from tags)) * 100 |
+----------+------------+---------------------------------------------------------+
| css      |          2 |                                                 33.3333 |
| php      |          3 |                                                 50.0000 |
| sql      |          2 |                                                 33.3333 |
-----------------------------------------------------------------------------------
*/


----retorna porcentaje de tags por incidencia de un usuario----
select tag_name, count(*) as incidencia,
(COUNT(*)/(select count('incidencia') from tags inner join question_tags on tags.id_tag = question_tags.id_tag
inner join questions on questions.id_question = question_tags.id_question
inner join users on users.id_user = questions.id_user
where users.id_user=1)) * 100 as 'porcentaje'
from tags
inner join question_tags on tags.id_tag = question_tags.id_tag
inner join questions on questions.id_question = question_tags.id_question
inner join users on users.id_user = questions.id_user
where users.id_user=1
group by tags.tag_name order by incidencia desc;



---Devuelve los tags con su total de incidencias en orden descendente---
select tag_name, count(*) as incidencia from tags
 inner join question_tags on tags.id_tag = question_tags.id_tag
 group by tags.id_tag order by incidencia desc;