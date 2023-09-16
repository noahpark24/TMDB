const S = require('sequelize');
const db = require('../config/db/index');
const bc = require('bcrypt');

class Users extends S.Model {
  //el salt es un string
  createHash(password, salt) {
    return bc.hash(password, salt);
  }

  validatePassword(password) {
    return this.createHash(password, this.salt).then(
      (newhash) => newhash === this.password
    );
  }
}

Users.init(
  {
    user_name: { type: S.STRING, require: true, unique: true },
    email: {
      type: S.STRING,
      require: true,
      validate: { isEmail: true },
      unique: true,
    },
    password: { type: S.STRING, require: true },
    salt: { type: S.STRING },
  },
  {
    sequelize: db,
    modelName: 'user',
  }
);

Users.addHook('beforeCreate', (user) => {
  const salt = bc.genSaltSync();
  user.salt = salt;
  return user
    .createHash(user.password, user.salt)
    .then((result) => (user.password = result))
    .catch((err) => console.log(err));
});

module.exports = Users;
