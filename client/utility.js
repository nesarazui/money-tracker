import moment from 'moment'

const totalSpend = arr => {
  let sum = arr.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue.amount
  }, 0)
  console.log('SUM', arr, sum)
  return sum
}

const monthlySpend = arr => {
  let filteredArr = arr.filter(item => {
    if (moment(item.date).format('MM') === moment().format('MM')) {
      return true
    } else {
      return false
    }
  })
  return totalSpend(filteredArr)
}

const monthlyDifference = (monthActual, monthlyBudget) => {
  const difference = monthlyBudget - monthActual
  console.log('****', monthActual, monthlyBudget)
  return difference
}
export {totalSpend, monthlySpend, monthlyDifference}
