const asyncHandler = require("express-async-handler");
const {
  searchUser,
  createUser,
  generateUserCookie,
  getAllUsers,
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
    let { user_name, password } = req.body;
    let user = await searchUser(user_name);

    let validatedPassword = await user.validatePassword(password);

    if (validatedPassword) {
      const payload = {
        email: user.email,
        user_name: user.user_name,
      };

      let userCookie = await generateUserCookie(payload);

      res.cookie("token", userCookie);

      res.status(200).send(payload);
    } else {
      res.send("wrong password or user_name");
    }
  } catch (error) {
    console.log(error);
  }
});

exports.logout_user = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

exports.get_all_users = asyncHandler(async (req, res) => {
  let signedInUsers = await getAllUsers();
  res.status(200).send(signedInUsers);
});
