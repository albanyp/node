require('dotenv').config()

const { readInput, inquirerMenu, inquirerPause, listedPlaces } = require("./helpers/inquirer")
const Searches = require("./models/searches")

const main = async() => {
  // const text = await readInput('Ready?')
  const searches = new Searches()
  let opt = ''

  do {
    opt = await inquirerMenu()

    switch(opt) {
      case 1:
        const searchedPlace = await readInput('What place are you looking for?')
        const foundPlaces = await searches.findCity(searchedPlace)
        const id = await listedPlaces(foundPlaces)
        if(id === '0') continue;

        const selectedPlace = foundPlaces.find(p => p.id == id)
        searches.addItemToHistory(selectedPlace.name)

        const weather = await searches.weatherInPlace(selectedPlace.lat, selectedPlace.lng)

        console.log('\nPlace information\n'.green)
        console.log('City: ', selectedPlace.name.green)
        console.log('Lat: ', selectedPlace.lat)
        console.log('Lng: ', selectedPlace.lng)
        console.log('Temp: ', weather.temp)
        console.log('Min: ', weather.min)
        console.log('Max: ', weather.max)
        console.log('desc: ', weather.desc.green)
        break;

      case 2:
        // await inquirerPause()
        // searches.capitalizedHistory
        searches.capitalizedHistory.forEach((place, i) => {
          const idx = `${ i + 1}`.green
          console.log(`${ idx }. ${ place }`)
        })
        break; 
    }

    if(opt !== 0) await inquirerPause()
  } while(opt !== 0)

}

main()