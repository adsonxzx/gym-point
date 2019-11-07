import Sequelize, { Model } from 'sequelize';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        price: Sequelize.FLOAT,
        duration: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );
  }
}

export default Plan;
