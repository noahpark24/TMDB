const asyncHandler = require('express-async-handler');
//Services
const favoriteService = require('../services/favoriteService');
const userService = require('../services/userService');

exports.show_user_favorites = asyncHandler(async (req, res, next) => {
  try {
    const { user_name } = req.params;
    let userFavorites = await favoriteService.showUserFavorites(user_name);
    res.status(200).send(userFavorites);
  } catch (error) {
    throw Error(error);
  }
});

exports.add_favorite = asyncHandler(async (req, res, next) => {
  try {
    const movieData = req.body;
    const user = await userService.searchUser(req.body.user_name);
    let foundedFavorite = await favoriteService.searchFavorite(
      movieData.movie_name
    );
    if (foundedFavorite.length > 0) {
      res.status(400).send('movie is already on Favs');
    } else {
      const addedMovie = await favoriteService.createNewFav(movieData, user);
      addedMovie.setUser(user);
      res.status(200).send(addedMovie);
    }
  } catch (error) {
    throw Error(error);
  }
});

exports.remove_from_favorite = asyncHandler(async (req, res, next) => {
  try {
    const { movie_name } = req.params;
    await favoriteService.deleteFav(movie_name);
    res.sendStatus(202);
  } catch (error) {
    throw Error(error);
  }
});
