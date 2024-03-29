import S from 'sequelize';
import db from '../config/db/index.js';
import bc from 'bcrypt';

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

//Encripting password
Users.addHook('beforeCreate', async (user) => {
  try {
    const salt = bc.genSaltSync();
    user.salt = salt;
    const hashedPassword = await user.createHash(user.password, user.salt);
    user.password = hashedPassword;
    return user;
  } catch (err) {
    console.log(err);
  }
});

export default Users;
