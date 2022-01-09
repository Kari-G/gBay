import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';
import { userModel } from '../models/userModel';

export const loginService = {
  async authenticateUser(reqBody) {
    const { email, password } = reqBody;
    this.checkInput(email, password);
    const userData = await this.verifyUser(email, password);
    const accessToken = this.createNewToken(userData);
    return { status: 200, data: { status: 'ok', token: accessToken } };
  },
  checkInput(email, password) {
    if (!email && !password) {
      throw { status: 400, message: 'All fields are required.' };
    }
    if (!email) {
      throw { status: 400, message: 'Email is required.' };
    }
    if (!password) {
      throw { status: 400, message: 'Password is required.' };
    }
  },
  async verifyUser(email, password) {
    const userData = await userModel.selectUserDataByEmail(email);
    let isPasswordCorrect;
    if (userData.results[0]) {
      isPasswordCorrect = await bcrypt.compare(password, userData.results[0].password);
    }
    if (!userData.results[0] || !isPasswordCorrect) {
      throw { status: 400, message: 'Email or password is incorrect.' };
    }
    return userData;
  },
  createNewToken(userData) {
    const tokenPayload = {
      userId: userData.results[0].id,
      isAdmin: !!userData.results[0].isAdmin,
    };
    const accessToken = jwt.sign(tokenPayload, config.jwt.accessTokenSecret);
    return accessToken;
  },
};
