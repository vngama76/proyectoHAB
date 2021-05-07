const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
    questionsRepository,
    userRepository,
} = require('../Repositories/index');
const { findUserById } = require('../Repositories/users_repository');

async function createQuestion(req, res, next) {
  try {
    const { id } = req.auth;
    const { title, body } = req.body;

        const schema = Joi.object({
            title: Joi.string().max(50).required(),
            body: Joi.string().max(1000).required(),
        });

    await schema.validateAsync({ title, body });

    const question = await questionsRepository.addQuestion(title, body, id);

        res.status(201);
        res.send(question[0]);
    } catch (err) {
        next(err);
    }
}
async function getQuestionById(req, res, next) {
    try {
        const { id_question } = req.params;
        const question = await questionsRepository.findQuestionById(
            id_question
        );
        if (!question) {
            const error = new Error('Pregunta no existe');
            error.code = 404;
            throw error;
        }

        const user = await userRepository.findUserById(question[0].id_user);

        res.send({
            title: question[0].title,
            body: question[0].body,
            date: question[0].creation_date,
            user: user.name_user,
        });
    } catch (err) {
        next(err);
    }
}

async function acceptAnswer(req, res, next) {
    try {
        const { rol, id } = req.auth;
        const { id_question } = req.params;
        const { id_answer } = req.body;
        const userId = await findUserById(id);
        if (userId.id_user !== id && rol !== 'admin') {
            const error = new Error('Acceso denegado');
            error.code = 401;
            throw error;
        }
        await questionsRepository.closeQuestion(id_question, id_answer);

        res.status(201);
        res.send('Pregunta cerrada');
    } catch (err) {
        next(err);
    }
}

async function removeQuestion(req, res, next) {
    try {
        const { id_question } = req.params;
        const { rol, id } = req.auth;
        const userId = await questionsRepository.findUserByQuestionId(
            id_question
        );
        if (userId !== id && rol !== 'admin') {
            const error = new Error('Acceso denegado');
            error.code = 401;
            throw error;
        }

        await questionsRepository.deleteQuestionById(id_question);

        res.status(201);
        res.send('pregunta borrada');
   
    await questionsRepository.deleteQuestionById(id_question);
    res.status(201);
    res.send('pregunta borrada');
  } catch (err) {
    next(err);
  }
}

module.exports = {
    createQuestion,
    getQuestionById,
    acceptAnswer,
    removeQuestion,
};
