const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const dbConfig = require("./db.config")
const mongoose = require('mongoose')
const app = express()

//Permit to use variable environment
const dotenv = require('dotenv');
dotenv.config();


//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())

///////////////////////////////////////////////// MongoDB /////////////////////////////////////////////////////////////////

const uri = "mongodb+srv://" + dbConfig.MONGO_USER + ":" + dbConfig.MONGO_PASSWORD + "@" + dbConfig.MONGO_HOST + "/" + dbConfig.MONGO_DB + "?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection;
db.once('open', function() {
    console.log("Connection to mongo bdd is OK")
})

////////Redirection of the URLs to the corresponding data access file////////
app.use('/users', require('./routes/user'))

app.use('/events', require('./routes/event'))

app.use('/news', require('./routes/new'))


const port = process.env.PORT || process.env.API_PORT || 3007;

// start of application
const server = app.listen(port, () => console.log(`Server started on http://localhost:${port}`))

module.exports = server

