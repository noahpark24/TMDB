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
    throw Error("this username dont exist");
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

exports.getAllUsers = async () => {
  try {
    let signedInUsers = await Users.findAll();
    return signedInUsers;
  } catch (error) {
    throw Error(error);
  }
};
