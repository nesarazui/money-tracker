const router = require('express').Router()
const {Spendlog} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('WAS THIS API/SPENDING ROUTE HIT')
    const spendlogs = await Spendlog.findAll({
      where: {userId: req.user.id}
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
