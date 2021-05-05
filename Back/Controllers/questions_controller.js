const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { questionsRepository } = require('../Repositories/index');

async function createQuestion(req, res, next) {
    try {
        const { id } = req.auth;
        let { title, body } = req.body;

        const schema = Joi.object({
            title: Joi.string().max(50).required(),
            body: Joi.string().max(1000).required(),
        })

        await schema.validateAsync({ title, body });

        const question = await questionsRepository.addQuestion(title, body, id);

        res.status(201);
        res.send(question[0]);

    } catch (err) {
        next(err);
    }
}

module.exports = {
    createQuestion,
};
