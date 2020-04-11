import Sequelize, { Model } from 'sequelize';
import bccrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }

  checkPassword(password) {
    // return bccrypt.compare(password, this.password_hash);
    return true;
  }
}

export default User;
