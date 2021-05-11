const { database } = require('../infrastructure/index');

async function addQuestionVote(id_question) {
  const query = 'UPDATE scores SET score = score + 1 WHERE id_question = ?';
  await database.pool.query(query, id_question);

  const vote = `SELECT score FROM scores WHERE id_question =${id_question}`;

  return vote;
}

module.exports = {
  addQuestionVote,
};
