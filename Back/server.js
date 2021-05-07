require('dotenv').config();
// const path = require('path');
// const fs = require('fs');

const express = require('express');

// const multer = require('multer');

const { usersController, questionsController, answersController, commentsController } = require('./Controllers/index');

const { validateAuthorization } = require('./Middlewares/validate_auth');

const { PORT } = process.env;
const app = express();
app.use(express.json());

//User
app.post('/api/users/register', usersController.register);
app.post('/api/users/login', usersController.login);
app.get(
  '/api/users/:id_user',
  validateAuthorization,
  usersController.getUserById
);
app.put('/api/users', validateAuthorization, usersController.updateUser);
<<<<<<< HEAD
app.delete(
  '/api/users/:id_user',
  validateAuthorization,
  usersController.deleteUser
);
// app.post('/api/users/activar_cuenta', );
=======
app.delete('/api/users/:id_user', validateAuthorization, usersController.deleteUser);
app.get('/api/users/validate/:validateCode', usersController.validateUser);
>>>>>>> ale
// app.put('/api/users/cambiar_contraseña', );

//Questions
app.post(
  '/api/questions/',
  validateAuthorization,
  questionsController.createQuestion
);
// app.get(
//   '/api/questions/:id_question',
//   validateAuthorization,
//   questionsController.getQuestionById
// );
app.get(
  '/api/questions/:id_question',
  validateAuthorization,
  questionsController.getQuestionById
);
app.delete(
  '/api/questions/:id_question',
  validateAuthorization,
  questionsController.removeQuestion
);
<<<<<<< HEAD
=======
app.get(
    '/api/questions/:id_question',
    validateAuthorization,
    questionsController.getQuestionById
);
app.put('/api/questions/:id_question', validateAuthorization, questionsController.acceptAnswer);
app.delete(
    '/api/questions/:id_question', validateAuthorization, questionsController.removeQuestion);

//Answers
app.post('/api/answers/:id_question', validateAuthorization, answersController.createAnswer);
app.delete('/api/answers/:id_answer', validateAuthorization, answersController.removeAnswer);

//Comments
//todo app.post('/api/comments/', validateAuthorization, commentsController.createComment)

>>>>>>> ale

app.use(async (err, req, res, next) => {
  const status = err.isJoi ? 400 : err.code || 500;
  res.status(status);
  res.send({ error: err.message });
});


app.listen(PORT, () => console.log(`Gapp-API listening at port ${PORT}`));
