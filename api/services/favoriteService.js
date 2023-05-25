const Favorites = require("../models/Favs");
const { searchUser } = require("./userService");

exports.createNewFav = async (movieData) => {
  try {
    let newFavorite = await Favorites.create(movieData);
    return newFavorite;
  } catch (error) {
    throw Error(error);
  }
};

exports.deleteFav = async (favoriteToDelete) => {
  try {
    Favorites.destroy({
      where: {
        movie_name: favoriteToDelete,
      },
    });
  } catch (error) {
    throw Error(error);
  }
};

exports.showUserFavorites = async (user_name) => {
  try {
    let foundedUser = await searchUser(user_name);
    let favorites = await Favorites.findAll({
      where: { userId: foundedUser.id },
    });
    return favorites;
  } catch (error) {
    throw Error(error);
  }
};

exports.searchFavorite = async (movie_name) => {
  try {
    let searchedFavorite = await Favorites.findAll({
      where: { movie_name: movie_name },
    });
    return searchedFavorite;
  } catch (error) {
    throw Error(error);
  }
};
