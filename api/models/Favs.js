const S = require("sequelize");
const db = require("../config/db/index");

class Favorites extends S.Model {}

Favorites.init(
  {
    movie_name: { type: S.STRING },
    movie_id: { type: S.INTEGER },
    poster_path: { type: S.STRING },
  },
  {
    sequelize: db,
    modelName: "favorites",
  }
);
module.exports = Favorites;
