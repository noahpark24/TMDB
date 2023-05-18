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
      // const payload = {
      //   email: user.email,
      //   user_name: user.user_name,
      // };
      return user;
    }
  } catch (error) {
    throw Error(error);
  }
};

exports.generateUserPayloadAndCookie = async (validatedUser) => {
  try {
    const payload = {
      email: validatedUser.email,
      user_name: validatedUser.user_name,
    };
    let cookie = generateToken(payload);
    return { payload, cookie };
  } catch (error) {
    throw Error(error);
  }
};
