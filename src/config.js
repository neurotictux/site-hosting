require('@babel/register')

try {
  const dotenv = require('dotenv')
  dotenv.config()
} catch(ex) { console.log(ex) }

module.exports = {
  SECRET: process.env.SECRET,
  dbConfig: {
    DATABASE_URI: process.env.DATABASE_URL,
    dialectOptions: { ssl: true },
    dialect: 'postgres',
    logging: true,
    operatorsAliases: false
  }
}