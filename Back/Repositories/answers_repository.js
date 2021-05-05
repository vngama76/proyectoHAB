const { database } = require('../infrastructure/index');

async function findAnswerById(id) {
    const query = 'SELECT * FROM answers WHERE id_answer = ?';
    const [answer] = await database.pool.query(query, [id]);

    return answer;
}

async function addAnswer(body, id_user, id_question) {
    const query = 'INSERT INTO answers (body, id_user, id_question) VALUES (?, ?, ?)';
    const [answer] = await database.pool.query(query, [
        body,
        id_user,
        id_question,
    ]);
    return await findAnswerById(answer.insertId);
}

module.exports = {
    addAnswer,
    findAnswerById,
};
