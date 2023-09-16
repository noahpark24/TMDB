import { generateToken } from '../config/token.js';
import { Users, Favorites } from '../models/index.js';

class UserServices {
  async searchUser(user_name) {
    try {
      let user = await Users.findOne({ where: { user_name: user_name } });
      return user;
    } catch (error) {
      throw Error(error);
    }
  }

  async createUser(userData) {
    try {
      let newUser = await Users.create(userData);
      return newUser;
    } catch (error) {
      throw Error("This username doesn't exist");
    }
  }

  async generateUserCookie(payload) {
    try {
      let cookie = generateToken(payload);
      return cookie;
    } catch (error) {
      throw Error(error);
    }
  }

  async getAllUsers() {
    try {
      let signedInUsers = await Users.findAll();
      return signedInUsers;
    } catch (error) {
      throw Error(error);
    }
  }

  async showUserFavorites(user_name) {
    try {
      let foundedUser = await this.searchUser(user_name);
      let favorites = await Favorites.findAll({
        where: { userId: foundedUser.id },
      });
      return favorites;
    } catch (error) {
      throw Error(error);
    }
  }
}

export default new UserServices();
