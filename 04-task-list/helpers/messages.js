require('colors')

const showMenu = () => {
  return new Promise((resolve, reject) => {
    console.clear()
    console.log('==========================='.green)
    console.log('     Select an option      '.green)
    console.log('===========================\n'.green)
  
    console.log(`${'1.'.green} Create task`)
    console.log(`${'2.'.green} Task list`)
    console.log(`${'3.'.green} Completed tasks list`)
    console.log(`${'4.'.green} To do tasks list`)
    console.log(`${'5.'.green} Complete task(s)`)
    console.log(`${'6.'.green} Delete task`)
    console.log(`${'0.'.green} Out`)
  
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
  
    readline.question('Select an option: ', (opt) => {
      readline.close()
      resolve(opt)
    })
    
  })

}

const pause = () => {
  return new Promise((resolve, reject) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    })
  
    readline.question(`\nPress ${'enter'.green} to continue\n`, (opt) => {
      readline.close()
      resolve()
    })
  })
}

module.exports = {
  showMenu,
  pause
}