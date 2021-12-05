const inquirer = require('inquirer')
require('colors')

const menuOptions = [
  {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      {
        value: `1`,
        name: `${'1.'.green} Create task`
      },
      {
        value: '2',
        name: `${'2.'.green} Task list`
      },
      {
        value: '3',
        name: `${'3.'.green} Completed tasks`
      },
      {
        value: '4',
        name: `${'4.'.green} To do tasks`
      },
      {
        value: '5',
        name: `${'5.'.green} Complete task`
      },
      {
        value: '6',
        name: `${'6.'.green} Delete task`
      },
      {
        value: '0',
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

const tasksToBeDeleted = async(tasks =[]) => {
  const choices = tasks.map((task, i) => {
      const idx = `${i + 1}`
      return {
        value: task.id,
        name: `${idx}. ${task.description}`
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
      message: 'What should we delete?',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions)
  return id

}

const tasksToBeCompleted = async(tasks) => {
  const choices = tasks.map((task, i) => {
    const idx = `${i + 1}`
    return {
      value: task.id,
      name: `${idx}. ${task.description}`,
      checked: (task.completedOn !== null ? true : false)
    }
  })

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Select',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(questions)
  return ids
}

const confirmationMessage = async(message) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question)
  return ok

}

module.exports = {
  inquirerMenu,
  inquirerPause,
  readInput,
  tasksToBeDeleted,
  confirmationMessage,
  tasksToBeCompleted
}
