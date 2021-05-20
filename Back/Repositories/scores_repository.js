const { database } = require('../infrastructure/index');

async function addQuestionVote(id_question, id_user, id_question_user) {
  const query =
    'INSERT INTO questions_points (id_question, id_user, id_question_user) VALUES (?, ?, ?)';
  await database.pool.query(query, [id_question, id_user, id_question_user]);

  return;
}

async function countVotesByQuestionId(id_question) {
  const query =
    'SELECT COUNT(*) AS votos FROM questions_points WHERE id_question=?';
  const [votes] = await database.pool.query(query, id_question);

  return votes[0];
}

async function addAnswerVote(id_answer, id_user, id_answer_user) {
  const query =
    'INSERT INTO answers_points (id_answer, id_user, id_answer_user) VALUES (?, ?, ?)';
  await database.pool.query(query, [id_answer, id_user, id_answer_user]);

  return;
}

async function countVotesByAnswerId(id_answer) {
  const query =
    'SELECT COUNT(*) AS votos FROM answers_points WHERE id_answer=?';
  const [votes] = await database.pool.query(query, id_answer);

  return votes[0];
}

async function addCommentVote(id_comment, id_user, id_comment_user) {
  const query =
    'INSERT INTO comments_points (id_comment, id_user, id_comment_user) VALUES (?, ?, ?)';
  await database.pool.query(query, [id_comment, id_user, id_comment_user]);

  return;
}

async function countVotesByCommentId(id_comment) {
  const query =
    'SELECT COUNT(*) AS votos FROM comments_points WHERE id_comment=?';
  const [votes] = await database.pool.query(query, id_comment);

  return votes[0];
}

async function countQuestionVotesByUserId(id_user, id_question) {
  const query =
    'SELECT COUNT(*) AS votos FROM questions_points WHERE id_user=? AND id_question = ?';
  const [votes] = await database.pool.query(query, [id_user, id_question]);

  return votes[0];
}

async function countAnswerVotesByUserId(id_user, id_answer) {
  const query =
    'SELECT COUNT(*) AS votos FROM answers_points WHERE id_user=? AND id_answer= ?';
  const [votes] = await database.pool.query(query, [id_user, id_answer]);

  return votes[0];
}

async function countCommentVotesByUserId(id_user, id_comment) {
  const query =
    'SELECT COUNT(*) AS votos FROM comments_points WHERE id_user=? AND id_comment= ?';
  const [votes] = await database.pool.query(query, [id_user, id_comment]);

  return votes[0];
}

module.exports = {
  addQuestionVote,
  addAnswerVote,
  countVotesByQuestionId,
  countVotesByAnswerId,
  addCommentVote,
  countVotesByCommentId,
  countQuestionVotesByUserId,
  countAnswerVotesByUserId,
  countCommentVotesByUserId,
};
