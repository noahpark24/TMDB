const Favorites = require('../models/Favs');
const userService = require('./userService');

class FavoritesService {
  async createNewFav(movieData) {
    try {
      let newFavorite = await Favorites.create(movieData);
      return newFavorite;
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteFav(favoriteToDelete) {
    try {
      await Favorites.destroy({
        where: {
          movie_name: favoriteToDelete,
        },
      });
    } catch (error) {
      throw Error(error);
    }
  }

  async showUserFavorites(user_name) {
    try {
      let foundedUser = await userService.searchUser(user_name);
      let favorites = await Favorites.findAll({
        where: { userId: foundedUser.id },
      });
      return favorites;
    } catch (error) {
      throw Error(error);
    }
  }

  async searchFavorite(movie_name) {
    try {
      let searchedFavorite = await Favorites.findAll({
        where: { movie_name: movie_name },
      });
      return searchedFavorite;
    } catch (error) {
      throw Error(error);
    }
  }
}

module.exports = new FavoritesService();
