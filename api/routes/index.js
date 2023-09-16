import express from 'express';
const router = express.Router();
//Routers
import usersRouter from './users.js';
import favoritesRouter from './favorites.js';

router.use('/users', usersRouter);
router.use('/favorites', favoritesRouter);

export default router;
