const Joi = require('joi');

const {
  answersRepository,
  userRepository,
  questionsRepository,
  scoresRepository,
} = require('../Repositories/index');

async function voteQuestion(req, res, next) {
  try {
    const { id } = req.auth;
    const { id_question } = req.params;
    if (!id && rol !== 'admin') {
      const error = new Error('Solo usuarios logueados pueden votar');
      error.code = 401;
      throw error;
    }

    const votes = await scoresRepository.addQuestionVote(id_question);

    // res.status(201);
    res.send(votes);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  voteQuestion,
};
