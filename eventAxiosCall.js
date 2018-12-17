const axios = require("axios")
require("dotenv").config()

const PLEASE = () =>{
  return axios.all([axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TM}&venueId=KovZpZAaeIvA`),axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TM}&venueId=KovZpZAa1JnA`)]).then(axios.spread((redRocks,firstBank)=>{
    let firstBankEventArray = firstBank.data._embedded.events,
    venueF = firstBankEventArray[0]._embedded.venues[0].name,
    redRocksEventArray = redRocks.data._embedded.events,
    venueR = redRocksEventArray[0]._embedded.venues[0].name,
    seedArray = firstBankEventArray.reduce((a,e)=>{
      let holder = {
        venue:venueF,
        headliner:e.name,
        date:e.dates.start.localDate,
        startTime:e.dates.start.localTime
      }
      a.push(holder)
      return a
    },[])
    let headlinerArray = redRocksEventArray.reduce((a,e)=>{
      a.push(e.name)
      return a
    },[])
    let dateArray = redRocksEventArray.reduce((aa,e)=>{
      aa.push(e.dates.start.localDate)
      return aa
    },[])
    let timeArray = redRocksEventArray.reduce((a,e)=>{
      a.push(e.dates.start.localTime)
      return a
    },[])
    for(let i = 0; i<headlinerArray.length; i++){
      if(timeArray[i]===undefined){
        headlinerArray.slice(i,1)
        dateArray.slice(i,1)
        timeArray.slice(i,1)
      }else{
        seedArray.push({venue:venueR, headliner:headlinerArray[i], date:dateArray[i], startTime:timeArray[i]})
      }
    }
    return seedArray
  }))
}

module.exports = {PLEASE}
