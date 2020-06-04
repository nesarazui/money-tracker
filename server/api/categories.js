const router = require('express').Router()
const {Category, Budget} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categoriesById = await Category.findAll({
      where: {
        [Op.or]: [{userId: null}, {userId: req.user.id}]
      }
    })
    if (categoriesById) {
      res.send(categoriesById)
    } else {
      res.status(404).send('Could Not Fetch Categories')
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {newCategory, amount} = req.body
    const newCat = await Category.create({
      categoryType: newCategory,
      userId: req.user.id
    })
    let categoryId = newCat.id

    //adds budget for user's new category in Budget table
    await Budget.create({
      amount,
      userId: req.user.id,
      categoryId
    })
    if (newCat) {
      const updatedCategories = await Category.findAll()
      res.send(updatedCategories)
    } else {
      res.status(404).send('Could Not Add New Category')
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const catToDelete = await Category.findByPk(id)
    if (catToDelete) {
      const budgetLineItemToDelete = await Budget.findAll({
        where: {userId: req.user.id, categoryId: id}
      })

      await catToDelete.destroy()
      const updatedCategories = await Category.findAll()
      res.send(updatedCategories)
    } else {
      res.status(404).send('Could Not Delete Category')
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {name} = req.body
    const categoryToUpdate = await Category.findByPk(req.params.id)
    if (categoryToUpdate) {
      await categoryToUpdate.update({categoryType: name})
      const updatedCategories = await Category.findAll()
      res.send(updatedCategories)
    } else {
      res.status(404).send('Could Not Update Category')
    }
  } catch (error) {
    next(error)
  }
})
