const crypto = require("crypto");
const webSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer();
server.listen(8010);
const wsServer = new webSocketServer({
  httpServer: server
});
const clients = {};


wsServer.on('request', function(request) {
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