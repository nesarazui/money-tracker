const Sequelize = require('sequelize')
const db = require('../db')

const Spendlog = db.define('spendlog', {
  item: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
})

module.exports = Spendlog
