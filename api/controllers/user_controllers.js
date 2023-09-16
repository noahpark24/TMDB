import asyncHandler from 'express-async-handler';

//Services
import userServices from '../services/userService.js';
import { generateToken } from '../config/token.js';

export const create_new_user = asyncHandler(async (req, res, next) => {
  try {
    const { user_name } = req.body;
    let user = await userServices.searchUser(user_name);
    if (user) {
      res.status(400).send('user already exist');
    } else {
      let user_data = req.body;
      let newUser = await userServices.createUser(user_data);

      res.status(200).send(newUser);
    }
  } catch (error) {
    next(error);
  }
});

export const login_user = asyncHandler(async (req, res, next) => {
  try {
    let { user_name, password } = req.body;
    let user = await userServices.searchUser(user_name);

    let validatedPassword = await user.validatePassword(password);

    if (validatedPassword) {
      const payload = {
        email: user.email,
        user_name: user.user_name,
      };

      let userCookie = generateToken(payload);

      res.cookie('authToken', userCookie);

      res.status(200).send(payload);
    } else {
      res.send('wrong password or user_name');
    }
  } catch (error) {
    console.log(error);
  }
});

export const logout_user = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.send('User is not logged in');
  }

  return res.clearCookie('authToken', { path: '/', domain: 'localhost' });
});

export const get_all_users = asyncHandler(async (req, res) => {
  let signedInUsers = await userServices.getAllUsers();
  res.status(200).send(signedInUsers);
});
