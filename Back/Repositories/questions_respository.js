const { database } = require('../infrastructure/index');

async function findQuestionById(id) {
    const query = 'SELECT * FROM questions WHERE id_question = ?';
    const [question] = await database.pool.query(query, [id]);

    return question;
}

async function addQuestion(title, body, id_user) {
    const query =
        'INSERT INTO questions (title, body, id_user) VALUES (?, ?, ?)';
    const [DanielSan] = await database.pool.query(query, [
        title,
        body,
        id_user,
    ]);

    return findQuestionById(DanielSan.insertId);
}

async function findQuestionByUserId(id) {
    const query = 'SELECT * FROM questions WHERE user_id = ?';
    const [question] = await database.pool.query(query, id);

    return question;
}

async function findUserByQuestionId(id) {
    const [question] = await findQuestionById(id);

    return question.id_user;
}

async function closeQuestion(id_question, id_answer) {
    const query = `UPDATE questions SET status_enum = ?, id_answer_acepted = ${id_answer} WHERE id_question = ${id_question}`;
    await database.pool.query(query, 'PREGUNTA CERRADA');
    return;
}

async function deleteQuestionById(id) {
    await database.pool.query(`DELETE FROM answers WHERE id_question = ${id}`);
    const query = 'DELETE FROM questions WHERE id_question = ?';
    await database.pool.query(query, id);

    return;
}

module.exports = {
    findQuestionById,
    addQuestion,
    findQuestionByUserId,
    findUserByQuestionId,
    closeQuestion,
    deleteQuestionById,
};
