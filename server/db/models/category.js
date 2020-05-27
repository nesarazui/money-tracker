const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  categoryType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

module.exports = Category
