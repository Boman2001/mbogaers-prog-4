const { Sequelize } = require('sequelize');

module.exports.database =  new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.DATABASEHOST,
  dialect: 'mariadb'
})
