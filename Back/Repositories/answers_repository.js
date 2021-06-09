const { database } = require('../infrastructure/index');

async function findAnswerById(id) {
    const query = 'SELECT * FROM answers WHERE id_answer = ?';
    const [answer] = await database.pool.query(query, [id]);

    return answer;
}

async function addAnswer(body, id_user, id_question) {
    console.log('Params: ', body, id_user, id_question);
    const query2 = `UPDATE questions SET status_enum = ? WHERE id_question = ?`;
    await database.pool.query(query2, ['TIENE RESPUESTAS', id_question]);
    const query =
        'INSERT INTO answers (body, id_user, id_question) VALUES (?, ?, ?)';
    const [result] = await database.pool.query(query, [
        body,
        id_user,
        id_question,
    ]);
    console.log('result: ', result);
    const answer = await findAnswerById(result.insertId);
    return answer;
}

async function findUserByAnswerId(id_answer) {
    const [answer] = await findAnswerById(id_answer);
    return answer.id_user;
}

async function deleteAnswer(id_answer) {
    const query = 'DELETE FROM answers WHERE id_answer = ?';
    await database.pool.query(query, id_answer);
    return;
}

module.exports = {
    addAnswer,
    findAnswerById,
    findUserByAnswerId,
    deleteAnswer,
};
