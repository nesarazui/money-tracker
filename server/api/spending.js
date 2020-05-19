const router = require('express').Router()
const {Spendlog, Category} = require('../db/models')
const moment = require('moment')
module.exports = router

const Sequelize = require('sequelize')
const {Op} = require('sequelize')

router.get('/year', async (req, res, next) => {
  try {
    console.log('WAS THIS API/SPENDING ROUTE HIT')
    const currentYear = moment().format('YYYY')
    const spendlogs = await Spendlog.findAll({
      where: {
        userId: req.user.id,
        andOp: Sequelize.where(
          Sequelize.fn('date_part', 'year', Sequelize.col('date')),
          currentYear
        )
      },
      include: {model: Category}
    })
    console.log('What does the returned spendlogs data look like: ', spendlogs)
    if (spendlogs) {
      res.json(spendlogs)
    } else {
      res.status(404).send('Could not find requested spend log')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {item, amount, categoryId, date} = req.body
    const userId = req.user.id
    const newObj = await Spendlog.create({
      item,
      amount,
      categoryId,
      userId,
      date
    })
    console.log('REQ BODY IS: ', req.body)
    if (newObj) {
      res.status(201).send(newObj)
    } else {
      res.status(401).send('Could not save new spend item')
    }
    console.log('???', newObj)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const spendLogToDelete = await Spendlog.findByPk(id)
    if (spendLogToDelete) {
      await spendLogToDelete.destroy()
      const currentYear = moment().format('YYYY')
      const updatedSpendLogs = await Spendlog.findAll({
        where: {
          userId: req.user.id,
          andOp: Sequelize.where(
            Sequelize.fn('date_part', 'year', Sequelize.col('date')),
            currentYear
          )
        },
        include: {model: Category}
      })
      res.send(updatedSpendLogs)
    } else {
      res.status(404).send('Could Not Delete Spendlog')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const {item, amount, date, userId, categoryId} = req.body
    const itemToUpdate = await Spendlog.findByPk(id)
    if (itemToUpdate) {
      await itemToUpdate.update({item, amount, date, userId, categoryId})

      const currentYear = moment().format('YYYY')
      const updatedSpendLogs = await Spendlog.findAll({
        where: {
          userId: req.user.id,
          andOp: Sequelize.where(
            Sequelize.fn('date_part', 'year', Sequelize.col('date')),
            currentYear
          )
        },
        include: {model: Category}
      })
      res.send(updatedSpendLogs)
    } else {
      res.status(404).send('Could Not Update SpendLog')
    }
  } catch (error) {
    next(error)
  }
})
