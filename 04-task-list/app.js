require('colors')
// const { showMenu, pause } = require('./helpers/messages')

const { 
  inquirerMenu, 
  inquirerPause,
  readInput,
  tasksToBeDeleted,
  confirmationMessage,
  tasksToBeCompleted
} = require('./helpers/inquirer')
const {
  saveInfo,
  readDatabase
} = require('./helpers/saveFile')

const { Task } = require('./models/task')
const { Tasks } = require('./models/tasks')
// console.clear()

const main = async() => {
  let opt = ''
  const tasks = new Tasks()
  const readDataBase = readDatabase()


  if(readDatabase) {
    tasks.loadTasksFromArray(readDataBase)
  }

  do {
    opt = await inquirerMenu()

    switch(opt) {
      case '1':
        const description = await readInput('Description: ')
        tasks.createTask(description)
        break;
      case '2':
        tasks.showFormattedList(tasks.listArr)
        break;
      case '3':
        tasks.showCompletedOrPendingTasks(true)
        break;
      case '4':
        tasks.showCompletedOrPendingTasks(false)
        break;
      case '5':
        const ids = await tasksToBeCompleted(tasks.listArr)
        tasks.toggleTaskCompletion(ids)
        break;
      case '6':
        const id = await tasksToBeDeleted(tasks.listArr)
        if(id !== '0') {
          const ok = await confirmationMessage('Are you sure?')
          if(ok) {
            tasks.deleteTask(id)
            console.log('Task deleted')
          }
        } 
        break;
    }

    saveInfo(tasks.listArr)
    await inquirerPause()
  } while(opt !== '0')
}

main()