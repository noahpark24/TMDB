const asyncHandler = require("express-async-handler");
const Favs = require("../models/Favs");
const { searchUser } = require("../services/userService");
const {
  createNewFav,
  deleteFav,
  showUserFavorites,
} = require("../services/favoriteService");

exports.show_all_favorites = asyncHandler(async (req, res, next) => {
  try {
    let userFavorites = await showUserFavorites();
    res.status(200).send(userFavorites);
  } catch (error) {
    throw Error(error);
  }
});

exports.add_favorite = asyncHandler(async (req, res, next) => {
  try {
    const movieData = req.body;
    const user = await searchUser(req.body.user_name);
    const addedMovie = await createNewFav(movieData, user);
    addedMovie.setUser(user);
    res.status(200).send(addedMovie);
  } catch (error) {
    throw Error(error);
  }
});

exports.remove_from_favorite = asyncHandler(async (req, res, next) => {
  try {
    const { movie_name } = req.params;
    await deleteFav(movie_name);
    res.sendStatus(202);
  } catch (error) {
    throw Error(error);
  }
});