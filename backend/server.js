const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const fse = require('fs-extra')



const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'));
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(morgan("dev"))

app.get('/', (req, res) => {
    res.send("Hello World")
})


fse.readdirSync('./routes').map((r) => {
    console.log(r, "assssssssssssssssss")
    app.use("/api/v1", require("./routes/" + r))
})


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Example App Listening On Port ${port}`)
})
