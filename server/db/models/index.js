const User = require('./user')
const Spendlog = require('./spendlog')
const Category = require('./category')
const Budget = require('./budget')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Spendlog.belongsTo(User)
Spendlog.belongsTo(Category)
Budget.belongsTo(User)
Budget.belongsTo(Category)
// Category.hasMany(Budget)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Spendlog,
  Category,
  Budget
}
