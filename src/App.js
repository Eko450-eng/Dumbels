import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'
import Chatscreen from './components/Chatscreen'
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
          <Route path="/chat" element={<Chatscreen />}/>
          <Route path='/tic' element={<TicTacToe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
