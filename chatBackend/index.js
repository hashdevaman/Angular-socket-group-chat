const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: "*"
  }
});
const cors = require('cors');
app.use(cors());

let $users = [];
let roomName = "FARU-Developers";

io.on('connection', (socket) => {

  let newSocketId = socket.id;

  /**
   * @Function-disc : Script for add new user into chat room 
   * @params : roomname, username
   */

  socket.on('addUserToGroup', (userName) => {

    $users.push({"username": userName, "id": newSocketId})
    socket.join(roomName);

    io.to(roomName).emit('get-active-users', $users); // sending all users list 
    console.log(`Socket joined room: ${JSON.stringify($users)}`);
  });

  /**
   * @Function-disc : Script for send new message to group 
   */
  socket.on('new-message', (msg) => {
    
    // console.log('message: ', JSON.stringify(msg));
    io.to(roomName).emit('get-active-users', $users);
    io.to(roomName).emit('new-message', msg);
  });
  
  socket.on('disconnect', () => {
    
    $users = $users.filter(val => val.id != newSocketId);
    io.to(roomName).emit('get-active-users', $users);
    
    console.log('user disconnected');
  });
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
