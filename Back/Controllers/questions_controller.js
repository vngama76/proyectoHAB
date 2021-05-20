const Joi = require("joi");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const {
  questionsRepository,
  userRepository,
  tagsRepository,
} = require("../Repositories/index");

const { findUserById } = require("../Repositories/users_repository");

async function createQuestion(req, res, next) {
  try {
    const { id } = req.auth;
    let { title, body, tags } = req.body;

    const schema = Joi.object({
      title: Joi.string().max(50).required(),
      body: Joi.string().max(1000).required(),
      tags: Joi.array(),
    });

    await schema.validateAsync({ title, body, tags });

    const [question] = await questionsRepository.addQuestion(title, body, id);

    // Recorremos el array de tags si existe
    // Si el tag existe en la tabla tags metemos la asociación en la tabla question_tags
    // Si el tag no existe en la tabla tags lo creamos y metemos la asociación

    if (tags) {
      for (const tag of tags) {
        let id_tag;
        //Miramos si ya existe el tag en la tabla
        let dbTag = await tagsRepository.getTag(tag);

        if (!dbTag) {
          // Si no existe lo creamos
          id_tag = await tagsRepository.createTag(tag);
        } else {
          // Si existe cogemos su id
          id_tag = dbTag.id_tag;
        }

        // Añadimos la asociación en la tabla question_tags
        await questionsRepository.addTagToQuestion(
          question.id_question,
          id_tag
        );
      }
    }

    res.status(201);
    res.send(question);
  } catch (err) {
    next(err);
  }
}
async function getQuestionById(req, res, next) {
  try {
    const { id_question } = req.params;
    const question = await questionsRepository.findQuestionById(id_question);

    console.log(question);

    if (!question) {
      const error = new Error("Pregunta no existe");
      error.code = 404;
      throw error;
    }

    const user = await userRepository.findUserById(question.id_user);

    res.send({
      title: question.title,
      body: question.body,
      date: question.creation_date,
      tags: question.tags,
      user: user.name_user,
    });
  } catch (err) {
    next(err);
  }
}

async function getQuestionsByTag(req, res, next) {
  try {
    const { tag } = req.params;

    const questions = await questionsRepository.findQuestionsByTag(tag);

    res.send({
      questions,
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
    if (userId.id_user !== id && rol !== "admin") {
      const error = new Error("Acceso denegado");
      error.code = 401;
      throw error;
    }
    await questionsRepository.closeQuestion(id_question, id_answer);

    res.status(201);
    res.send("Pregunta cerrada");
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
      const error = new Error("Acceso denegado");
      error.code = 401;
      throw error;
    }

    await questionsRepository.deleteQuestionById(id_question);

    res.status(201);
    res.send("pregunta borrada");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createQuestion,
  getQuestionById,
  acceptAnswer,
  removeQuestion,
  getQuestionsByTag,
};
