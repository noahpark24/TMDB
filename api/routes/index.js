const express = require('express');
const router = express.Router();
//Routers
const usersRouter = require('./users');
const favoritesRouter = require('./favorites');

router.use('/users', usersRouter);
router.use('/favorites', favoritesRouter);

module.exports = router;
