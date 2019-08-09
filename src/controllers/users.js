/* eslint-disable no-restricted-syntax */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../models/users';
import Validate from '../helpers/validate';
dotenv.config();
const {
  secretOrKey,
} = process.env;
class User {
  static checkUserInputs(userId) {
    let checkUser = {};
    for (const key in users) {
      if (users[key].id === userId) {
        checkUser = {
          id: users[key].id,
          firstName: users[key].firstName,
          lastName: users[key].lastName,
          email: users[key].email,
          password: users[key].password,
          registered: new Date(users[key].registered).toDateString(),
          isAdmin: users[key].isAdmin,
        };
      }
    }
    return checkUser;
  }
  /* signup */
  static signup(req, res) {
    // Validate inputs
    const checkUserInputs = [];
    checkUserInputs.push((req.body.firstName, true));
    checkUserInputs.push((req.body.lastName, true));
    checkUserInputs.push((req.body.email, true));
    checkUserInputs.push((req.body.password, true));
    for (let i = 0; i < checkUserInputs.length; i += 1) {
      if (checkUserInputs[i].isValid === false) {
        return res.status(400).json({
          status: 400,
          error: checkUserInputs[i].error,
        });
      }
    }
    const newUser = {
      id: Math.ceil(Math.random() * 100),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      registered: Date.now(),
      isAdmin: req.body.isAdmin,
    };
    const checkUsers = users.find((user) => user.email === newUser.email);
    if (checkUsers) {
      return res.status(409).json({
        error: 'email already exist',
      });
    }
    users.push(newUser);
    const isCreated = User.checkUserInputs(newUser.id);
    if (Object.keys(isCreated).length > 0) {
  
      const token = jwt.sign(newUser, secretOrKey, {
        expiresIn: '2h',
      });
      return res.status(201).json({
        status: 201,
        message: 'The user was created successfully',
        data: {
          token,
        }
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'User not created!',
    });
  }
  /* login */
  static login(req, res) {
    // Validate inputs
    let checkInput = false;
    checkInput = req.body.email, true;
    if (checkInput.isValid === false) {
      return res.status(400).json({
        status: 400,
        error: checkInput.error,
      });
    }
    let isUser = {};
    users.forEach((user) => {
      if (user.email === req.body.email && user.password === req.body.password) {
        isUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          registered: user.registered,
          isAdmin: user.isAdmin,
        };
      }
    });
    if (Object.keys(isUser).length > 0) {
      const token = jwt.sign(isUser, secretOrKey, {
        expiresIn: '2h',
      });
      return res.status(200).json({
        status: 200,
        message: 'Successfully logged in',
        data: {
          token,
        }
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'User not found!',
    });
  }
}
export default User;