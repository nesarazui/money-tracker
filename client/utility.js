const annualSpend = arr => {
  console.log('what is the arr', arr)
  let sum = arr.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue
  }, 0)
  console.log('utility function produces following sum,', sum)
  return sum
}

export default annualSpend
