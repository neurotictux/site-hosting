import Sequelize from 'sequelize'
import { dbConfig } from '../config'

export const sequelize = new Sequelize(dbConfig.DATABASE_URI, dbConfig)

export const User = sequelize.define('User', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  domain: Sequelize.STRING,
  dbName: Sequelize.STRING
}, {
  freezeTableName: 'User',
  undercored: false,
  updatedAt: false,
  createdAt: false
})

sequelize.sync()

export default sequelize