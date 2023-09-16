import express from 'express';
const router = express.Router();
//Middlewares
import validateUser from '../config/validateUser.js';
//Controllers
import {
  show_user_favorites,
  add_favorite,
  remove_from_favorite,
} from '../controllers/favorites_controllers.js';

router.get('/:user_name', show_user_favorites);

router.post('/add', add_favorite);

router.delete('/remove/:movie_name', remove_from_favorite);

export default router;
