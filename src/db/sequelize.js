import Sequelize from 'sequelize'
let config = {}
try {
  const dotenv = require('dotenv').load().parsed
  config.database = dotenv.database
  config.user = dotenv.user
  config.password = dotenv.password
  config.host = dotenv.host
} catch (ex) { console.log(ex) }

export const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
  logging: true,
  operatorsAliases: false
})

export const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  token: Sequelize.STRING,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  userAccess: Sequelize.STRING,
  database: Sequelize.STRING,
  domain: Sequelize.STRING
})

// sequelize.sync()

export default sequelize