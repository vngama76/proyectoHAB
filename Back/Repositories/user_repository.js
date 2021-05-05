const { database } = require('../infrastructure/index');

const findUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  const [users] = await database.pool.query(query, email);

  return users[0];
};

async function createUser(data) {
  const query =
    'INSERT INTO users (name_user, email, password_user) VALUES (?, ?, ?)';
  await database.pool.query(query, [
    data.name_user,
    data.email,
    data.password_user,
  ]);

  return findUserByEmail(data.email);
}

async function findUserById(id) {
  const query = 'SELECT * FROM users WHERE id_user = ?';
  const [user] = await database.pool.query(query, id);
  return user;
}

async function changeUserData(id, name_user, email, show_mail) {
  const query = `UPDATE users SET name_user = ?, email = ?, show_mail = ? WHERE id_user = ${id}`;
  await database.pool.query(query, [name_user, email, show_mail]);
  const [user] = await findUserById(id);
  return user;
}

async function changeUserData(id, name_user, show_mail) {
    const query = `UPDATE users SET name_user = ?, show_mail = ? WHERE id_user = ${id}`;
    await database.pool.query(query, [name_user, show_mail]);
    const [user] = await findUserById(id);
    return user;
}

module.exports = {
<<<<<<< HEAD
  findUserByEmail,
  createUser,
  findUserById,
  changeUserData,
=======
    findUserByEmail,
    createUser,
    findUserById,
    changeUserData,
>>>>>>> main
};
