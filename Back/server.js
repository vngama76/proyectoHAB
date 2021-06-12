require('dotenv').config();
const fileUpload = require('express-fileupload');
const cors = require('cors');

const express = require('express');

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
app.use(cors());
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
    '/api/users/question/:id_question',
    validateAuthorization,
    usersController.getUserByQuestionId
);

app.get(
    '/api/users/tags/:tag_name',
    validateAuthorization,
    usersController.getUserByTag
);
app.get(
    '/api/users/name/:name_user',
    validateAuthorization,
    usersController.getUserByName
);
app.put('/api/users', validateAuthorization, usersController.updateUser);
app.delete(
    '/api/users/:id_user',
    validateAuthorization,
    usersController.deleteUser
);
app.get('/verify/:validateCode', usersController.validateUser);
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
    '/api/questions/tags/:words',
    validateAuthorization,
    questionsController.getQuestions
);
app.get(
    '/api/questions/user/:id_user',
    validateAuthorization,
    questionsController.getQuestionsByUserId
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
app.get(
    '/api/answers/:id_question',
    validateAuthorization,
    answersController.getAnswersByQuestionId
);

app.get(
    '/api/answers/user/:id_user',
    validateAuthorization,
    answersController.getAnswersByUserId
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
app.get(
    '/api/comments/:id_answer_father',
    validateAuthorization,
    commentsController.getCommentsByAnswerFatherId
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
