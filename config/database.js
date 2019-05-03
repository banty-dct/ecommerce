const mongoose = require("mongoose")
mongoose.Promise = global.Promise
//mongodb+srv://banty:qwe123@db-eyigw.mongodb.net/test?retryWrites=true
mongoose.connect("mongodb://localhost:27017/ecommerce",{
            useNewUrlParser: true,
            useCreateIndex: true
        })
        .then(function(){
            console.log("DB is connected")
        })
        .catch(function(){
            console.log("DB is not connected")
        })
        
module.exports = {
    mongoose
}