const Sequelize = require('sequelize')
const db = require('../db')
const moment = require('moment')

const Spendlog = db.define('spendlog', {
  item: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.INTEGER
  },
  // category: {
  //   type: Sequelize.ENUM,
  //   values: ['food', 'drinks', 'entertainment', 'bills']
  // },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
})

module.exports = Spendlog
