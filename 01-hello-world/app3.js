console.log('program starts') // 1

setTimeout(() => {
  console.log('first timeout') // 5
}, 3000)

setTimeout(() => {
  console.log('second timeout!') // 3
}, 0)

setTimeout(() => {
  console.log('third timeout') // 4
}, 0)

console.log('program ends') // 2