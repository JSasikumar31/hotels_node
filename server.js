const express = require('express')
const app = express()
const db= require('./db')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
require ('dotenv').config()


app.get('/', function (req, res) {
  res.send('welcome to hotel')
})


const PORT=process.env || 3000





//import the router files

const personRoutes= require('./routes/person_routes')
app.use('/person', personRoutes)


const menuRoutes= require('./routes/menu_routes')
app.use('/Menu', menuRoutes)


app.listen(PORT, ()=>{
    console.log("server is running")
})