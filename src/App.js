import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'
import Chatscreen from './components/Chatscreen'
import Chatinput from './components/chatComponents/Chatinput'
import MessageBox from './components/chatComponents/MessageBox'
import TicTacToe from './components/miniGames/TicTacToe';
// import SocketIOServer from './components/miniGames/SocketIOServer.js'

import './styles/main.css'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/chat" element={<Chatscreen />}/> */}
          {/* <Route path="/chatInput" element={<Chatinput />}/> */}
          <Route path="/mes" element={<MessageBox />} />
          <Route path='/tic' element={<TicTacToe />} />
          {/* <Route path='/server' element={<SocketIOServer />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
