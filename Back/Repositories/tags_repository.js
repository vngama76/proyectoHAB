const { database } = require('../infrastructure/index');

async function findTag(tag_name) {
    const [
        tag,
    ] = await database.pool.query(`SELECT * FROM tags WHERE tag_name=?`, [
        tag_name,
    ]);
    return tag[0];
}

async function createTag(tag_name) {
    const [
        result,
    ] = await database.pool.query(`INSERT INTO tags(tag_name) VALUES(?)`, [
        tag_name,
    ]);
    return result.insertId;
}
async function findTagsByUserId(id) {
    const query = `
    SELECT tags.tag_name
    FROM tags
    INNER JOIN question_tags ON tags.id_tag = question_tags.id_tag
    INNER JOIN questions ON questions.id_question = question_tags.id_question
    WHERE questions.id_user=?
    `;
    const [tags] = await database.pool.query(query, [id]);
    const tagsArray = tags.map((t) => t.tag_name);
    return tagsArray;
}

module.exports = {
    findTag,
    createTag,
    findTagsByUserId,
};
