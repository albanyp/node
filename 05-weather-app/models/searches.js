const fs = require('fs')

const axios = require('axios')

class Searches {
  history = []
  dbPath = './db/database.json'

  constructor() {
    // read if db exists
    this.readDB()
  }

  get paramsMapbox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }

  get paramsWeatherApp() {
    return {
      'appId': process.env.OPENWEATHER_KEY,
      'units': 'metric',
      'language': 'en'
    }
  }

  get capitalizedHistory() {
    return this.history.map(historyItem => {
      const items = historyItem.split(', ')

      const capHistory = items.map(item => {
        const newName = item.charAt(0).toUpperCase().concat('', item.slice(1))
        return newName.concat(' ')
      })
      return capHistory
    })
  }

  async findCity(place) {
    
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?`,
        params: this.paramsMapbox
      })

      const response = await instance.get()
      return response.data.features.map(resPlace => ({
        id: resPlace.id,
        name: resPlace.place_name,
        lng: resPlace.center[0],
        lat: resPlace.center[1]
      }))
    } catch(error) {
      return []
    }
  }

  async weatherInPlace(lat, lon) {
    try {
      const weatherInstance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
        params: {...this.paramsWeatherApp, lat, lon}
      })

      const res = await weatherInstance.get()
      
      const { weather, main } = res.data

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp
      }

    } catch(err) {
      console.error(err)
    }
  }

  addItemToHistory(place) {
    // prevent duplicates
    if(!this.history.includes(place)) {
      this.history.unshift(place.toLowerCase())
    }

    this.history = this.history.splice(0,5)
    this.saveDB()
  }

  saveDB() {
    const payload = {
      history: this.history
    }

    fs.writeFileSync(this.dbPath, JSON.stringify(payload))
  }

  readDB() {
    if(!fs.existsSync(this.dbPath)) return null

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
    const data = JSON.parse(info)
    this.history = data.history
  }
}

module.exports = Searches