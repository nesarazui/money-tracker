const router = require('express').Router()
const {Category, Spendlog} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categoriesById = await Category.findAll()
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
    const newCat = await Category.create(req.body)
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
