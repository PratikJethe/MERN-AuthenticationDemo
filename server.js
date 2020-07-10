const express = require('express');
const app = express()
const mongoose = require('mongoose')
const config = require('config')
const db = config.get('MONGO_URI')
const cors = require('cors');
const cookieParser = require('cookie-parser');


try {
    
    mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
} catch (error) {
    process.exit(1)
}



app.listen(5000)
app.use(express.json())
app.use(cors());
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.send('RUNNING')
})

app.use('/api',require('./api/hello'));
app.use('/api/auth',require('./api/auth'));
