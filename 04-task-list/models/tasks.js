const { Task } = require("./task")
const inquirer = require('inquirer')


class Tasks {
  list = {}
  formattedList = []

  get listArr() {
    const finalList = []
    
    Object.keys(this.list).forEach(key => {
      finalList.push(this.list[key])
    })
    return finalList
  }

  constructor() {
    this.list = {}
    this.formattedList = []
  }

  loadTasksFromArray(tasks = []){
    tasks.forEach( task => {
      this.list[task.id] = task
    })
  }

  createTask(description = ''){
    const task = new Task(description)
    this.list[task.id] = task
  }

  showFormattedList(taskList) {
    taskList.forEach( (li, index) => {
      const idx = `${index + 1}`.green
      const { description, completedOn } = li
      const state = completedOn ? 'Completed'.green : 'Pending'.red

      console.log(`${idx} ${description} :: ${state}`)
    })
  }

  showCompletedOrPendingTasks(completed = true) {
    this.listArr.forEach( (li) => {
      let i = 0;
      const { description, completedOn } = li
      let state = completedOn ? 'Completed'.green : 'Pending'.red

      if(completed) {
        if(completedOn) {
          i = i++
          console.log(`${i.toString().green}. ${description} :: ${completedOn}`)
        }
      } else {
        if(!completedOn) {
          i = i++
          console.log(`${i.toString().green}. ${description} :: ${state}`)
        }
      }
    })
  }

  deleteTask(id = '') {
    if(this.list[id]) {
      delete this.list[id]
    }
  }

  toggleTaskCompletion(ids = []) {
    console.log(ids)
    ids.forEach(id => {
      const task = this.list[id]
      if(!task.completedOn) {
        task.completedOn = new Date().toISOString()
      }
    })

    this.listArr.forEach(task => {
      if(!ids.includes(task.id)) {
        this.list[task.id].completedOn = null
      }
    })
  }

}

module.exports = { Tasks }