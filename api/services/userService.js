const { generateToken } = require("../config/token");
const { Users } = require("../models");

exports.searchUser = async (user_name) => {
  try {
    let user = await Users.findOne({ where: { user_name: user_name } });
    return user;
  } catch (error) {
    throw Error(error);
  }
};

exports.createUser = async (userData) => {
  try {
    let newUser = await Users.create(userData);
    return newUser;
  } catch (error) {
    throw Error(error);
  }
};

exports.validateUserPassword = async (user) => {
  try {
    let validatedUser = user.validatePassword(user.password);
    if (validatedUser) {
      return user;
    }
  } catch (error) {
    throw Error(error);
  }
};

exports.generateUserCookie = async (payload) => {
  try {
    let cookie = generateToken(payload);
    return cookie;
  } catch (error) {
    throw Error(error);
  }
};
