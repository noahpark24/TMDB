const express = require("express");
const router = express.Router();
const { validateUser } = require("../config/validateUser");
const {
  create_new_user,
  login_user,
  logout_user,
  get_all_users,
} = require("../controllers/user_controllers");

router.post("/signup", create_new_user);

router.post("/login", login_user);

router.get("/me", validateUser, (req, res) => {
  res.send(req.user);
});

router.get("/get-all", get_all_users);

router.post("/logout", logout_user);

module.exports = router;
