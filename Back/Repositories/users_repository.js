const { database } = require('../infrastructure/index');

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [users] = await database.pool.query(query, email);

  return users[0];
};

async function verifyUser(id_user) {
    await database.pool.query(`UPDATE users SET isVerify = 1 WHERE id_user = ${id_user}`)
    return 
}

async function createUser(data) {
<<<<<<< HEAD
  const query =
    'INSERT INTO users (name_user, email, password_user) VALUES (?, ?, ?)';
  await database.pool.query(query, [
    data.name_user,
    data.email,
    data.password_user,
  ]);

  return findUserByEmail(data.email);
=======
    const query =
        'INSERT INTO users (name_user, email, password_user, verify_code) VALUES (?, ?, ?, ?)';
    await database.pool.query(query, [
        data.name_user,
        data.email,
        data.password_user,
        data.activationCode,
    ]);

    return findUserByEmail(data.email);
>>>>>>> ale
}

async function findUserById(id) {
  const query = 'SELECT * FROM users WHERE id_user = ?';
  const [user] = await database.pool.query(query, id);
  return user[0];
}

async function changeUserData(id, name_user, show_mail) {
  const query = `UPDATE users SET name_user = ?, show_mail = ? WHERE id_user = ${id}`;
  await database.pool.query(query, [name_user, show_mail]);
  const user = await findUserById(id);
  return user;
}

async function deleteUserByid(id) {
  return await database.pool.query(`DELETE FROM users WHERE id_user = ${id}`);
}

module.exports = {
<<<<<<< HEAD
  findUserByEmail,
  createUser,
  findUserById,
  changeUserData,
  deleteUserByid,
=======
    findUserByEmail,
    verifyUser,
    createUser,
    findUserById,
    changeUserData,
    deleteUserByid,
>>>>>>> ale
};
