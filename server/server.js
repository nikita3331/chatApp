const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const todoRouter = require('./routes/todos')
const bodyParser = require('body-parser')
const { Server } = require('ws');
const crypto = require("crypto");

require('dotenv').config()
// let db_uri=process.env.MONGODB_URI
// mongoose.connect(db_uri, { useNewUrlParser: true,useUnifiedTopology: true }) 
// mongoose.connection.on('error', (error) => console.error(error))
// mongoose.connection.once('open', () => console.log('Connected to Database'))

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
const wss = new Server({ server:app });

wss.on('request', function(request) {
  var userID = crypto.randomBytes(40).toString('hex')
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients));
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      const dataFromClient = JSON.parse(message.utf8Data);
      console.log(dataFromClient)
      connection.sendUTF(JSON.stringify({halko:1}))
    }
  });
  // user disconnected
  connection.on('close', function(connection) {
    console.log((new Date()) + " Peer " + userID + " disconnected.");
    delete clients[userID];
    connection.sendUTF(JSON.stringify({halko:1}))
  });
});