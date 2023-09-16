const Users = require('./User');
const Favorites = require('./Favs');

Users.hasMany(Favorites, { as: 'favorite' });
Favorites.belongsTo(Users, { as: 'user' });

module.exports = { Users, Favorites };
