require('dotenv').config();
const express = require('express');
const app = express();
const mongoose =  require('mongoose');
const bodyParser = require("body-parser");

//connecting to DB
mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));


//Middle ware
app.use(bodyParser.json())


//Listening Port
app.listen(3000);


app.get('/', (req, res) => {
    res.send('i am inside the home');
})

//Importing Routes
const postRoute = require('./routes/posts');
app.use('/api/post', postRoute)

