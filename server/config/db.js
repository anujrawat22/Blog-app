const mongoose = require("mongoose")
require('dotenv').config()
const Connection = mongoose.connect(process.env.MONGOURL)

module.exports = { Connection }