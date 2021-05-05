const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { answersRepository, userRepository } = require('../Repositories/index')

async function createAnswer(req, res, next) {
    try {
        const { id } = req.auth;
        const { id_question } = req.params;
        const { body } = req.body;
        const schema = Joi.object({
            body: Joi.string().max(1000).required(),
        })
        await schema.validateAsync({body});

        const answer = await answersRepository.addAnswer(body, id, id_question);
        const user = await userRepository.findUserById(id);

        res.status(201);
        res.send({
            id_answer: answer[0].id_answer,
            body: answer[0].body,
            name_user: user.name_user,
            
        });

    } catch (err) {
        next(err);
    }
    
}
module.exports = {
    createAnswer,
}