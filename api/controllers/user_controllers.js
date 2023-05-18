const asyncHandler = require("express-async-handler");
const {
  searchUser,
  createUser,
  validateUserPassword,
  generateUserPayloadAndCookie,
} = require("../services/userService");

exports.create_new_user = asyncHandler(async (req, res, next) => {
  try {
    const { user_name } = req.body;
    let user = await searchUser(user_name);
    if (user) {
      res.status(400).send("user already exist");
    } else {
      let user_data = req.body;
      let newUser = await createUser(user_data);
      res.status(200).send(newUser);
    }
  } catch (error) {
    next(error);
  }
});

exports.login_user = asyncHandler(async (req, res, next) => {
  try {
    let { user_name } = req.body;
    let user = await searchUser(user_name);

    let validatedUser = await validateUserPassword(user);

    let userCookie = await generateUserPayloadAndCookie(validatedUser);

    res.cookie("token", userCookie.cookie);

    res.status(200).send(userCookie.payload);
  } catch (error) {
    next(error);
  }
});

exports.logout_user = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});
