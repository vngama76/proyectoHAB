const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {
  questionsRepository,
  userRepository,
} = require('../Repositories/index');

async function createQuestion(req, res, next) {
  try {
    const { id } = req.auth;
    let { title, body } = req.body;

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
    const question = await questionsRepository.findQuestionById(id_question);
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

    // res.send('ok');
  } catch (err) {
    next(err);
  }
}

async function removeQuestion(req, res, next) {
  try {
    const { id_question } = req.params;
    const { rol, id } = req.auth;
    const userId = await questionsRepository.findUserByQuestionId(id_question);
    if (userId !== id && rol !== "admin") {
      const error = new Error('Acceso denegado');
      error.code = 401;
      throw error;
    }
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
  removeQuestion,
};
