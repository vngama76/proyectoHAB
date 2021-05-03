const { database } = require('../infrastructure/index');

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [users] = await database.pool.query(query, email);

    return users[0];
};

async function createUser(data) {
    const query = 'INSERT INTO users (name_user, email, password_user) VALUES (?, ?, ?)';
    await database.pool.query(query, [
        data.name_user,
        data.email,
        data.password_user,
    ]);

    return findUserByEmail(data.email);
}


module.exports = {
    findUserByEmail,
    createUser,
};
