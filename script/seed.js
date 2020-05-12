'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Spendlog} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      firstName: 'Cody',
      lastName: 'Jones',
      employed: 'True',
      income: 100
    }),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const spendlog = await Promise.all([
    Spendlog.create({
      item: 'whole foods',
      amount: 25,
      category: 'food',
      userId: 1
    }),
    Spendlog.create({item: 'coffee', amount: 5, category: 'drinks', userId: 1}),
    Spendlog.create({
      item: 'twilight',
      amount: 15,
      category: 'entertainment',
      userId: 1
    }),
    Spendlog.create({
      item: 'netflix',
      amount: 15,
      category: 'bills',
      userId: 1
    }),
    Spendlog.create({
      item: 'juniors cheesecake',
      amount: 50,
      category: 'food',
      userId: 1
    }),
    Spendlog.create({item: 'tea', amount: 5, category: 'drinks', userId: 1}),
    Spendlog.create({
      item: 'cats',
      amount: 100,
      category: 'entertainment',
      userId: 1
    }),
    Spendlog.create({
      item: 'car insurance',
      amount: 100,
      category: 'bills',
      userId: 1
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
