const express = require('express');
const router = express.Router();
//Middlewares
const { validateUser } = require('../config/validateUser');
//Controllers
const {
  show_user_favorites,
  add_favorite,
  remove_from_favorite,
} = require('../controllers/favorites_controllers');

router.get('/:user_name', validateUser, show_user_favorites);

router.post('/add', validateUser, add_favorite);

router.delete('/remove/:movie_name', validateUser, remove_from_favorite);

module.exports = router;
