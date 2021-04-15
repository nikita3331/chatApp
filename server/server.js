const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const todoRouter = require('./routes/todos')
const admin = require('firebase-admin');
const bodyParser = require('body-parser')
require('dotenv').config()
let db_uri=process.env.MONGODB_URI
mongoose.connect(db_uri, { useNewUrlParser: true,useUnifiedTopology: true }) 
let jsonGoogleKey=require('./src/googlekey')
admin.initializeApp({credential: admin.credential.cert(jsonGoogleKey)});



mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.once('open', () => console.log('Connected to Database'))

// app.use(express.json())
app.use(cors())
app.disable('etag');
app.use(bodyParser.json({
    limit: '50mb',
    extended: true
  }));
  
app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 500000,
  extended: true 
}));


app.use('/users', userRouter)
app.use('/todos', todoRouter)
app.listen(process.env.PORT||3000, () => console.log('Server Started'))
app.get('/*', function(req, res) {
  res.sendFile(__dirname+'/public/hello.html');
});
