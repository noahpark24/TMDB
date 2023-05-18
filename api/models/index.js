const Users = require("./User");
const Favorites = require("./Favs");

Favorites.belongsTo(Users, { as: "user" });

module.exports = { Users, Favorites };
