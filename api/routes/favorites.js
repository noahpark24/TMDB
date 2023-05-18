const express = require("express");
const router = express.Router();
const {
  show_all_favorites,
  add_favorite,
  remove_from_favorite,
} = require("../controllers/favorites_controllers");

router.get("/", show_all_favorites);

router.post("/add", add_favorite);

router.delete("/remove/:movie_name", remove_from_favorite);

module.exports = router;
