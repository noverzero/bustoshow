const model = require("../model/model.js")


const getOneLocation = (req, res, next) => {
 {
   let one = model.getOneLoc()
 res.status(200).json(one)
})
}

module.exports = {getOneLocation}
