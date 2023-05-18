const S = require("sequelize");

const db = new S("TMDB", null, null, {
  host: `localhost`,
  dialect: `postgres`,
  logging: false,
});

module.exports = db;
