const express = require('express')
const server = express()
const cors = require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const todoRouter = require('./routes/todos')
const bodyParser = require('body-parser')
const crypto = require("crypto");
const { Server } = require('ws');


require('dotenv').config()
// let db_uri=process.env.MONGODB_URI
// mongoose.connect(db_uri, { useNewUrlParser: true,useUnifiedTopology: true }) 
// mongoose.connection.on('error', (error) => console.error(error))
// mongoose.connection.once('open', () => console.log('Connected to Database'))

// app.use(express.json())
// app.use(cors())
// app.disable('etag');
// app.use(bodyParser.json({
//     limit: '50mb',
//     extended: true
//   }));
  
// app.use(bodyParser.urlencoded({
//   limit: '50mb',
//   parameterLimit: 500000,
//   extended: true 
// }));


// server.use('/users', userRouter)
// server.use('/todos', todoRouter)
server.listen(process.env.PORT||3000, () => console.log('Server Started'))
// app.get('/*', function(req, res) {
//   res.sendFile(__dirname+'/public/hello.html');
// });



const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);