const axios = require("axios")
require("dotenv").config()

const PLEASE = () =>{
  return axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${process.env.TM}&venueId=KovZpZAaeIvA`).then((data)=>{
    let redRocksEventArray = data.data._embedded.events,
    venueR = redRocksEventArray[0]._embedded.venues[0].name
    let headlinerArray = redRocksEventArray.reduce((a,e)=>{
      a.push(e.name)
      return a
    },[])
    let dateArray = redRocksEventArray.reduce((aa,e)=>{
      aa.push(e.dates.start.localDate)
      return aa
    },[])
    let timeArray = redRocksEventArray.reduce((aaaaaaaaaaaaaaaaaaaa,e)=>{
      aaaaaaaaaaaaaaaaaaaa.push(e.dates.start.localTime)
      return aaaaaaaaaaaaaaaaaaaa
    },[])
    let seedArray = []
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
  })
}

module.exports = {PLEASE}
