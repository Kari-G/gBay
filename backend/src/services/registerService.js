import bcrypt from 'bcrypt';
import { userModel } from '../models/userModel';

const saltRounds = 10;

export const registerService = {
  async createNewUser(reqBody) {
    const { username, email, password } = reqBody;
    this.isUsernameEmailPasswordProvided(username, email, password);

    await this.getUserByUsername(username);
    await this.getUserByEmail(email);

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    function generateString(length) {
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i += 1) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
    const verificationCode = generateString(50);
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    const insertNewUser = await userModel.insertNewUserSQL(username, email, encryptedPassword, verificationCode);
    const getUserByID = await userModel.getUserByIdSQL(insertNewUser.insertId);
    return getUserByID;
  },

  isUsernameEmailPasswordProvided(username, email, password) {
    if (!username && !email && !password) {
      throw { message: 'Name, email and password are required.', status: 400 };
    }
    if (!username) {
      throw { message: 'Username is required.', status: 400 };
    }
    if (!email) {
      throw { message: 'Email is required.', status: 400 };
    }
    if (!password) {
      throw { message: 'Password is required.', status: 400 };
    }
    if (password.length < 8) {
      throw { message: 'Password must be at least 8 characters.', status: 400 };
    }
  },

  async getUserByUsername(username) {
    const isUsernameOccupiedSQLresult = await userModel.getUserByUsernameSQL(username);
    if (isUsernameOccupiedSQLresult.length > 0) {
      throw { message: 'Username is already taken.', status: 400 };
    }
  },

  async getUserByEmail(email) {
    const isEmailOccupiedSQLresult = await userModel.getUserByEmailSQL(email);
    if (isEmailOccupiedSQLresult.length > 0) {
      throw { message: 'Email is already taken.', status: 400 };
    }
  },
};
