require('dotenv').config();
const fileUpload = require('express-fileupload');
// const path = require('path');
// const fs = require('fs');

const express = require('express');

// const multer = require('multer');

const {
  usersController,
  questionsController,
  answersController,
  commentsController,
  scoresController,
} = require('./Controllers/index');

const { validateAuthorization } = require('./Middlewares/validate_auth');

const { PORT } = process.env;
const app = express();
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('static'));

//User
app.post('/api/users/register', usersController.register);
app.post('/api/users/login', usersController.login);
app.get(
  '/api/users/:id_user',
  validateAuthorization,
  usersController.getUserById
);
app.get(
  '/api/users/tags/:tag_name',
  validateAuthorization,
  usersController.getUserByTag
);
app.put('/api/users', validateAuthorization, usersController.updateUser);
app.delete(
  '/api/users/:id_user',
  validateAuthorization,
  usersController.deleteUser
);
app.get('/api/users/validate/:validateCode', usersController.validateUser);
// app.put('/api/users/cambiar_contraseña', );

app.post('/api/users/avatar', validateAuthorization, usersController.addAvatar);

//Questions
app.post(
  '/api/questions/',
  validateAuthorization,
  questionsController.createQuestion
);
app.get(
  '/api/questions/:id_question',
  validateAuthorization,
  questionsController.getQuestionById
);

app.get(
  '/api/questions/tags/:tag_name',
  validateAuthorization,
  questionsController.getQuestionsByTag
);

app.put(
  '/api/questions/:id_question',
  validateAuthorization,
  questionsController.acceptAnswer
);
app.delete(
  '/api/questions/:id_question',
  validateAuthorization,
  questionsController.removeQuestion
);

//Answers
app.post(
  '/api/answers/:id_question',
  validateAuthorization,
  answersController.createAnswer
);
app.delete(
  '/api/answers/:id_answer',
  validateAuthorization,
  answersController.removeAnswer
);

//Comments
app.post(
  '/api/comments/:id_answer_father',
  validateAuthorization,
  commentsController.createComment
);

app.delete(
  '/api/comments/:id_comment',
  validateAuthorization,
  commentsController.removeComment
);

// Score;
app.post(
  '/api/score/question/:id_question',
  validateAuthorization,
  scoresController.voteQuestion
);

app.post(
  '/api/score/answer/:id_answer',
  validateAuthorization,
  scoresController.voteAnswer
);

app.post(
  '/api/score/comment/:id_answer',
  validateAuthorization,
  scoresController.voteComment
);

app.use((err, req, res, next) => {
  +console.error(err);
  const status = err.isJoi ? 400 : err.httpCode || 500;
  res.status(status);
  res.send({ error: err.message });
});

app.use((req, res) => {
  res.status(404).send({
    error: 'Not found',
  });
});

app.listen(PORT, () => console.log(`Gapp-API listening at port ${PORT}`));
