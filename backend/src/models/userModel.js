import { db } from '../data/connection_mysql';

export const userModel = {
  async getUserByUsernameSQL(username) {
    const getUserByUsernameSQL = 'SELECT * FROM users WHERE username = ?;';
    const getUserByUsernameSQLresult = await db.query(getUserByUsernameSQL, [username]);
    return getUserByUsernameSQLresult.results;
  },

  async getUserByEmailSQL(email) {
    const getUserByEmailSQL = 'SELECT * FROM users WHERE email = ?;';
    const getUserByEmailSQLresult = await db.query(getUserByEmailSQL, [email]);
    return getUserByEmailSQLresult.results;
  },

  async insertNewUserSQL(username, email, encryptedPassword, verificationCode) {
    const insertNewUserSQL = 'INSERT INTO users (username, email, password, verificationCode) VALUES (?, ?, ?, ?);';
    const insertNewUserSQLresult = await db.query(insertNewUserSQL, [username, email, encryptedPassword, verificationCode]);
    return insertNewUserSQLresult.results;
  },

  async getUserByIdSQL(id) {
    const getUserByIDSQL = 'SELECT id, email, isAdmin FROM users WHERE id = ?;';
    const getUserByIDSQLresult = await db.query(getUserByIDSQL, [id]);
    console.log(getUserByIDSQLresult.results);
    const result = getUserByIDSQLresult.results[0];
    if (result.isAdmin === '1') {
      result.isAdmin = true;
    } else if (result.isAdmin === '0') {
      result.isAdmin = false;
    }
    console.log(result)
    return result;
  }
};
