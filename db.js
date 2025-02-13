const mongoose = require('mongoose')
require ('dotenv').config()

//define mongo db connection

//const mongoURL = 'mongodb://localhost:27017/hotel'; //replce my databas to your data base

const mongoURL =process.env.DB_URL

//set up mongo db connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true   //paramterers to estabilsh connections without getting any erros
})

const db=mongoose.connection //bride b/w node and mongodb

//define event listener for database connectioin
db.on('connected', ()=>{
    console.log("connected to mongo db server");
    
})

db.on('error', (err)=>{
    console.log("error to mongo db server",err);
    
})
db.on('disconnected', ()=>{
    console.log("disconnected to mongo db server");   
})

//export database connection

module.exports=db