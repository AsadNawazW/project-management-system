const mongoose = require('mongoose')


mongoose.connect(`mongodb://${process.env.MONGODB_HOST}/${process.env.MONGODB_DATABASE}`,() => {
    console.log("Connected with mongodb")
})