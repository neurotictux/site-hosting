import Sequelize from 'sequelize'

const sequelize = new Sequelize('nas-server', null, null, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './nas-server.db'
})

export const User = sequelize.define('user', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: Sequelize.INTEGER
  },
  name: Sequelize.STRING,
  password: Sequelize.STRING
})

sequelize.sync()

export default sequelize