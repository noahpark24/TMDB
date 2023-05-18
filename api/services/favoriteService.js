const Favorites = require("../models/Favs");

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

exports.showUserFavorites = async () => {
  try {
    let favorites = await Favorites.findAll();
    return favorites;
  } catch (error) {
    throw Error(error);
  }
};
