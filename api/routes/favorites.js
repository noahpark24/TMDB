const express = require("express");
const router = express.Router();
const {
  show_user_favorites,
  add_favorite,
  remove_from_favorite,
} = require("../controllers/favorites_controllers");

router.get("/:user_name", show_user_favorites);

router.post("/add", add_favorite);

router.delete("/remove/:movie_name", remove_from_favorite);

module.exports = router;
