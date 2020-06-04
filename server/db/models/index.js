const User = require('./user')
const Spendlog = require('./spendlog')
const Category = require('./category')
const Budget = require('./budget')

Spendlog.belongsTo(User)
Spendlog.belongsTo(Category)
Budget.belongsTo(User)
Budget.belongsTo(Category)

module.exports = {
  User,
  Spendlog,
  Category,
  Budget
}
