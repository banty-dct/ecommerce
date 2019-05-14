const express = require("express")

const { mongoose } = require("./config/database")
const { routes } = require("./config/routes")

const app = express()
const port = 3005

app.use(express.json())
app.use("/api",routes)

//direct folder access
app.use("/uploads",express.static("uploads"))

app.listen(port,function(){
    console.log("Listening on port " + port)
})