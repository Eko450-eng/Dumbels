const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express()
const { Server } = require('socket.io');
app.use(cors())
const server = http.createServer(app)
const socketServer = new Server(server, {
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

let userAmount = 0
let playerX = ''
let playerO = ''
let round = 0

socketServer.on('closing', (socket)=>{
  userAmount = 0
})

socketServer.on('connection', (socket)=>{
    //Setting player roles
  socket.on("joining", (wocket)=>{
    if(userAmount < 1){
      console.log("player 1")
      playerX = socket.id
      socket.emit("roleAssigned", "x")
    // }else if(userAmount == 1){
    }else{
      console.log("player 2")
      playerO = socket.id
      socket.emit("roleAssigned", "o")
    }
    userAmount++
    // Sending the clicked blocks
    socket.on("clickedOn", (arg)=>{
      let enemy = playerX == arg[1] ? playerO : playerX
      socketServer.to(enemy).emit('clickedOnThis', arg[0])
    })

    //Sending playerlist and playerID
    socketServer.emit("players", [playerX, playerO])
    socket.emit("myId", socket.id)

    // Checking whos turn it is
      if((socket.id === playerX && round%2 === 0) || (socket.id === playerO && round%2 !== 0)){
          socketServer.emit("currentPlayer", socket.id)
      }

    socket.on('nextTurn', (socket)=>{
      round++
      if(socket == playerX){
          socketServer.emit("currentPlayer", playerO)
      }else{
          socketServer.emit("currentPlayer", playerX)
      }
    })


      socket.on('disconnect', ()=>{
          userAmount=0
        console.log("Disconnected")
      })
  })

  })



socketServer.on('message', (msg)=>{
  console.log("Message", msg)
})

// Connecting the server
server.listen(3001)
