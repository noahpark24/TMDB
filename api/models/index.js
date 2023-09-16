import Users from './User.js';
import Favorites from './Favs.js';

Users.hasMany(Favorites, { as: 'favorite' });
Favorites.belongsTo(Users, { as: 'user' });

export { Users, Favorites };
