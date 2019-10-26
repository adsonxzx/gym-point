import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

export default new Sequelize(databaseConfig);
