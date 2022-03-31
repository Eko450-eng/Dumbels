const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express()
const { Server } = require('socket.io');
const { unstable_HistoryRouter } = require('react-router-dom');
app.use(cors())
const server = http.createServer(app)
const io = new Server(server, {
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

let userAmount = 0
let playerX = ''
let playerO = ''
let round = 0

let unoRoom = [];
// let cardsP1 = {
//   amount:7,
//   cards: [
//     [color, value],
//     [color, value],
//     [color, value],
//     [color, value],
//     [color, value],
//   ]
// }

// let cardsP2 = {
//   amount:7,
//   cards: [
//     [color, value],
//     [color, value],
//     [color, value],
//     [color, value],
//     [color, value],
//   ]
// }
// let placedCard = [color, value]

// Socketio interaction
io.on('connection',socket=>{
  console.log("Connected")
  // UNO
  if(unoRoom.length < 1 ){
    socket.join("uno")
    unoRoom.push(socket.id)
    io.to(socket.id).emit("joinMsg", "You are player 1")
    console.log("Player 1 joined")
  }else if(unoRoom.length == 1){
    socket.join("uno")
    unoRoom.push(socket.id)
    io.to(socket.id).emit("joinMsg", "You are player 2")
    console.log("Player 2 joined")
  }else{
    socket.emit("joinMsg", "Room is full")
    console.log("Player 3 was ejected like a mofo")
  }
  if(unoRoom.length == 2){
    console.log(unoRoom)
    io.to("uno").emit("fullyConnected", true)
  }
})























    // //Tic tac toe
    // //Setting player roles
    // if(userAmount < 1){
    //   playerX = socket.id
    //   socket.emit("roleAssigned", "x")
    // }else{
    //   playerO = socket.id
    //   socket.emit("roleAssigned", "o")
    // }
    // userAmount++

    // // Sending the clicked blocks
    // socket.on("clickedOn", (arg)=>{
    //   let enemy = playerX == arg[1] ? playerO : playerX
    //   io.to(enemy).emit('clickedOnThis', arg[0])
    // })

    // //Sending playerlist and playerID
    // io.emit("players", [playerX, playerO])
    // socket.emit("myId", socket.id)

    // // Checking whos turn it is
    // if((socket.id === playerX && round%2 === 0) || (socket.id === playerO && round%2 !== 0)){
    //     io.emit("currentPlayer", socket.id)
    // }

    // socket.on('nextTurn', (socket)=>{
    //   round++
    //   if(socket == playerX){
    //       io.emit("currentPlayer", playerO)
    //   }else{
    //       io.emit("currentPlayer", playerX)
    //   }
    // })

    // socket.on('disconnect', ()=>{
    //     userAmount=userAmount-1
    // })


// io.on('message', (msg)=>{
//   console.log("Message", msg)
// })

// Connecting the server
server.listen(3001, ()=>{
  console.log("Running")
})
