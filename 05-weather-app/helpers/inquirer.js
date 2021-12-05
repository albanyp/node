const inquirer = require('inquirer')
require('colors')

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Search place`
      },
      {
        value: 2,
        name: `${'2.'.green} History`
      },
      {
        value: 0,
        name: `${'0.'.green} Leave`
      },
    ]
  }
]

const menuPause = [
  {
    type: 'input',
    name: 'closure',
    message: `Press ${'enter'.green} to continue`
  }
]

const inquirerMenu = async() => {
  // console.clear() 

  console.log('==========================='.green)
  console.log('     Select an option      '.white)
  console.log('===========================\n'.green)

  const { option } = await inquirer.prompt(menuOptions)
  // console.log(option)
  return option
}

const inquirerPause = async() => {
  const pause = await inquirer.prompt(menuPause)
  return pause
}

const readInput = async(message) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value) {
        if(value.length === 0) return 'Please insert a value'
        return true
      }
    }
  ]

        // question.name
  const { description } = await inquirer.prompt(question)
  return description
}

const listedPlaces = async(places =[]) => {
  const choices = places.map((place, i) => {
      const idx = `${i + 1}`
      return {
        value: place.id,
        name: `${idx}. ${place.name}`
      }

  })

  choices.unshift({
    value: '0',
    name: `${'0'.green}. Cancel`
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select place:',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions)
  return id

}

module.exports = {
  inquirerMenu,
  inquirerPause,
  readInput,
  listedPlaces
}
