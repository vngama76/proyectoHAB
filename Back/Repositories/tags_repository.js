const { database } = require("../infrastructure/index");

async function findTag(tag_name) {
  const [tag] = await database.pool.query(
    `SELECT * FROM tags WHERE tag_name=?`,
    [tag_name]
  );
  return tag[0];
}

async function createTag(tag_name) {
  const [result] = await database.pool.query(`INSERT INTO tags(tag_name) VALUES(?)`, [tag_name]);
  return result.insertId;
}

module.exports = {
  findTag,
  createTag,
};
