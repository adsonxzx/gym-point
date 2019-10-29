import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        idade: Sequelize.INTEGER,
        peso: Sequelize.BOOLEAN,
        altura: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default Student;
