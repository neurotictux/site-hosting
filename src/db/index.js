import Sequelize from 'sequelize'
import { dbConfig } from '../config'

export const sequelize = new Sequelize(dbConfig.DATABASE_URI, dbConfig)

export const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  domain: Sequelize.STRING,
  dbName: Sequelize.STRING
})

sequelize.sync()

export default sequelize