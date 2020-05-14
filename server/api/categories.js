const router = require('express').Router()
const {Category} = require('../db/models')
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