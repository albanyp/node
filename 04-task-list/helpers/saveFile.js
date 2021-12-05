const fs = require('fs')

const file = './database/data.json'

const saveInfo = (data) => {
  fs.writeFileSync(file, JSON.stringify(data))
}

const readDatabase = () => {
  if(!fs.existsSync(file)) {
    return null
  } 

  const info = fs.readFileSync(file, { encoding: 'utf-8' })
  const data = JSON.parse(info)
  return data
}

module.exports = {
  saveInfo,
  readDatabase
}