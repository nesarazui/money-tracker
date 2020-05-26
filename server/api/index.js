const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/spending', require('./spending'))
router.use('/categories', require('./categories'))
router.use('/budget', require('./budget'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
