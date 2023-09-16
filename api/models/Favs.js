import S from 'sequelize';
import db from '../config/db/index.js';

class Favorites extends S.Model {}

Favorites.init(
  {
    movie_name: { type: S.STRING },
    movie_id: { type: S.INTEGER },
    poster_path: { type: S.STRING },
  },
  {
    sequelize: db,
    modelName: 'favorites',
  }
);
export default Favorites;
