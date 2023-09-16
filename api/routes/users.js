import express from 'express';
const router = express.Router();
//Middlewares
import validateUser from '../config/validateUser.js';
//Controllers
import {
  create_new_user,
  login_user,
  logout_user,
  get_all_users,
} from '../controllers/user_controllers.js';

router.post('/signup', create_new_user);

router.post('/login', login_user);

router.get('/me', validateUser, (req, res) => {
  res.send(req.user);
});

router.get('/get-all', get_all_users);

router.post('/logout', logout_user);

export default router;
