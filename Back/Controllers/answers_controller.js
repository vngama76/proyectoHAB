const Joi = require('joi');

const { answersRepository, userRepository } = require('../Repositories/index');
const { findQuestionById } = require('../Repositories/questions_respository');

async function createAnswer(req, res, next) {
    try {
        const { id } = req.auth;
        const { id_question } = req.params;
        const { body } = req.body;
        console.log(id, id_question, body);
        const schema = Joi.object({
            body: Joi.string().max(1000).required(),
        });
        await schema.validateAsync({ body });

        const answer = await answersRepository.addAnswer(body, id, id_question);
        const user = await userRepository.findUserById(id);
        const question = await findQuestionById(id_question);

        res.status(201);
        res.send({
            id_answer: answer[0].id_answer,
            body: answer[0].body,
            question_status: question.status_enum,
            name_user: user.name_user,
        });
    } catch (err) {
        next(err);
    }
}

async function getAnswersByQuestionId(req, res, next) {
    try {
        const { id_question } = req.params;

        const answers = await answersRepository.findAnswersByQuestionId(
            id_question
        );
        console.log('Answers: ', answers);
        res.send({
            answers,
        });
    } catch (err) {
        next(err);
    }
}

async function removeAnswer(req, res, next) {
    try {
        const { rol, id } = req.auth;
        const { id_answer } = req.params;
        const userId = await answersRepository.findUserByAnswerId(id_answer);
        console.log(userId);
        if (userId !== id && rol !== 'admin') {
            const error = new Error('Acceso denegado');
            error.code = 401;
            throw error;
        }
        await answersRepository.deleteAnswer(id_answer);
        res.status(201);
        res.send(`La respuesta con id ${id_answer} ha sido eliminada.`);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createAnswer,
    getAnswersByQuestionId,
    removeAnswer,
};
