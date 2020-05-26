const router = require('express').Router()
const {Budget, Category} = require('../db/models')
module.exports = router

router.get('', async (req, res, next) => {
  try {
    const budgetForUser = await Budget.findAll({
      where: {
        userId: req.user.id
      },
      include: {model: Category}
    })
    if (budgetForUser) {
      res.send(budgetForUser)
    } else {
      res.status(404).send('Could Not Find Budget For User')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const budgetItemToUpdate = await Budget.findByPk(req.params.id)
    const {amount} = req.body
    if (budgetItemToUpdate) {
      await budgetItemToUpdate.update({amount})
      const budgetForUser = await Budget.findAll({
        where: {
          userId: req.user.id
        },
        include: {model: Category}
      })
      res.send(budgetForUser)
    } else {
      res.status(404).send('Could Not Find Item To Update')
    }
  } catch (error) {
    next(error)
  }
})
