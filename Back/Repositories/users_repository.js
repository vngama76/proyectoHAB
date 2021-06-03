const { database } = require('../infrastructure/index');

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [users] = await database.pool.query(query, email);

    return users[0];
};

async function verifyUser(id_user) {
    await database.pool.query(
        `UPDATE users SET isVerify = 1 WHERE id_user = ${id_user}`
    );
    return;
}

async function createUser(data) {
    const query =
        'INSERT INTO users (name_user, email, password_user, verify_code) VALUES (?, ?, ?, ?)';
    await database.pool.query(query, [
        data.name_user,
        data.email,
        data.password_user,
        data.activationCode,
    ]);

    return findUserByEmail(data.email);
}

async function findUserByValidationCode(validateCode) {
    const query = 'SELECT * FROM users WHERE verify_code=?';
    const [user] = await database.pool.query(query, validateCode);
    return user[0];
}

async function findUserById(id) {
    const query = 'SELECT * FROM users WHERE id_user = ?';
    const [user] = await database.pool.query(query, id);
    return user[0];
}

async function findUserByTag(tag_name) {
    const query = `
   SELECT users.id_user
    FROM users 
    INNER JOIN questions ON questions.id_user = users.id_user
    INNER JOIN question_tags ON question_tags.id_question = questions.id_question 
    INNER JOIN tags ON question_tags.id_tag = tags.id_tag
    WHERE tags.tag_name = ?; 
  `;

    const [users] = await database.pool.query(query, [tag_name]);

    // mira aquí:
    // https://flaviocopes.com/javascript-async-await-array-map/
    // https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
    return Promise.all(
        users.map(async (user) => {
            return await findUserById(user.id_user);
        })
    );
}
async function findUserByName(name_user) {
    const query = 'SELECT * FROM users WHERE name_user LIKE ?';
    const [user] = await database.pool.query(query, `%${name_user}%`);
    return user[0];
}

async function changeUserData(id, name_user, show_mail) {
    const query = `UPDATE users SET name_user = ?, show_mail = ? WHERE id_user = ${id}`;
    await database.pool.query(query, [name_user, show_mail]);
    const user = await findUserById(id);
    return user;
}

async function changeAvatar(id, avatar) {
    const query = 'UPDATE users SET foto = ? WHERE id_user = ?';
    await database.pool.query(query, [avatar, id]);
    return await findUserById(id);
}

async function deleteUserByid(id) {
    return await database.pool.query(`DELETE FROM users WHERE id_user = ${id}`);
}

module.exports = {
    findUserByEmail,
    verifyUser,
    createUser,
    findUserById,
    findUserByTag,
    findUserByName,
    changeUserData,
    deleteUserByid,
    findUserByValidationCode,
    changeAvatar,
};
