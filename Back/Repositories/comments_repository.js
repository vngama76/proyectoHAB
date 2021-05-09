const { database } = require('../infrastructure/index');

async function findAnswerById(id) {
  const query = 'SELECT * FROM answers WHERE id_answer = ?';
  const [answer] = await database.pool.query(query, [id]);

  return answer;
}

async function findQuestionByAnswerId(id) {
  const [answer] = await findAnswerById(id);
  return answer.id_question;
}

async function addComment(body, id_question, id_user, id_answer_father) {
  const query =
    'INSERT INTO answers (body, id_question, id_user, id_answer_father) VALUES (?, ?, ?, ?)';
  const [result] = await database.pool.query(query, [
    body,
    id_question,
    id_user,
    id_answer_father,
  ]);
  const comment = await findAnswerById(result.insertId);
  return comment;
}

async function deleteComment(id_comment) {
  return await database.pool.query(
    `DELETE FROM answers WHERE id_answer = ${id_comment}`
  );
}

module.exports = {
  addComment,
  findQuestionByAnswerId,
  deleteComment,
};
