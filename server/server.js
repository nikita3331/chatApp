const express = require('express')
// const server = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const todoRouter = require('./routes/todos')
const messageRouter = require('./routes/messages')
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger/documentation');  
const bodyParser = require('body-parser')
const crypto = require("crypto");
const { Server } = require('ws');


require('dotenv').config()
let db_uri=process.env.MONGODB_URI
mongoose.connect(db_uri, { useNewUrlParser: true,useUnifiedTopology: true }) 
mongoose.connection.on('error', (error) => console.error(error))
mongoose.connection.once('open', () => console.log('Connected to Database'))

const server = express()
  .use(cors())
  .use(bodyParser.json({
    limit: '50mb',
    extended: true
  }))
  .use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 500000,
    extended: true 
  }))
  .use('/users', userRouter)
  .use('/todos', todoRouter)
  .use('/messages', messageRouter)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs.doc))
  .get('/*',(req,res)=>{res.sendFile('/public/hello.html', { root: __dirname })})
  .listen(process.env.PORT || 3000, () => console.log(`Listening `));

const wss = new Server({ server });
const clients = {};

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