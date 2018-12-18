const axios = require("axios")
require("dotenv").config()

const axiosEventData = () =>{
  return axios.all([axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TM}&venueId=KovZpZAaeIvA`),axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TM}&venueId=KovZpZAa1JnA`)])
  .then(axios.spread((redRocks,firstBank)=>{
    let firstBankEventArray = firstBank.data._embedded.events,
    venueF = firstBankEventArray[0]._embedded.venues[0].name,
    redRocksEventArray = redRocks.data._embedded.events,
    venueR = redRocksEventArray[0]._embedded.venues[0].name,
    seedArray = firstBankEventArray.reduce((eventAccumulator,elem)=>{
      let holder = {
        venue:venueF,
        headliner:elem.name,
        date:elem.dates.start.localDate,
        startTime:elem.dates.start.localTime
      }
      eventAccumulator.push(holder)
      return eventAccumulator
    },[])
    let headlinerArray = redRocksEventArray.reduce((headlinerAccumulator,elem)=>{
      headlinerAccumulator.push(elem.name)
      return headlinerAccumulator
    },[])
    let dateArray = redRocksEventArray.reduce((dateAccumlator,elem)=>{
      dateAccumlator.push(elem.dates.start.localDate)
      return dateAccumlator
    },[])
    let timeArray = redRocksEventArray.reduce((timeAccumulator,elem)=>{
      timeAccumulator.push(elem.dates.start.localTime)
      return timeAccumulator
    },[])
    for(let i = 0; i<headlinerArray.length; i++){
      if(timeArray[i]===undefined){
        headlinerArray.slice(i,1)
        dateArray.slice(i,1)
        timeArray.slice(i,1)
      }else{
        seedArray.push({venue:venueR, 
          headliner:headlinerArray[i], 
          date:dateArray[i], 
          startTime:timeArray[i]})
      }
    }
    return seedArray
  }))
}

module.exports = {axiosEventData}
