import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ColorSchemeProvider, MantineProvider, MantineThemeOverride } from '@mantine/core'
import { useState, useEffect, useCallback } from 'react'
import { Global, Button, ColorInput, Group, MenuLabel, NumberInput } from '@mantine/core'
import { query, collection, where, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import db from './components/firebase/firebaseConfig'
import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'
import Chatscreen from './components/Chatscreen'
import TikTakToe from './components/miniGames/TikTakToe'
import Settings from './components/Settings'
import useStyle from './components/Styles'

import './styles/main.css'

function App() {
    const auth = getAuth()
    const { classes } = useStyle()
    const [ background, setBackground ] = useState('')
    const [ theme, setTheme ] = useState("false")
    const [ docName, setDocName ] = useState()
    const [ limitCount, setLimitCount ] = useState(10)
    const [ buttonStyle, setButtonStyle ] = useState(1)
    const [ pc, setPC ] = useState('blue')
    const [ user, setUser ] = useState(false)
    const [ loaded, setLoaded ] = useState(false)

    const getUser = async(user)=>{
      const emailRef = query(collection(db, "users"), where('email', '==', (user)))
      const unsubscribe = onSnapshot(emailRef, (doc)=>{
        doc.forEach(doc=>{
            setDocName(doc.data().userName)
            if(doc.data().settings != undefined){
              if(doc.data().settings.background != undefined){
                setBackground(doc.data().settings.background)
              }else{
                setBackground("#14213d")
              }

              if(doc.data().settings.limitCount != undefined){
                setLimitCount(doc.data().limitCount)
              }else{
                setLimitCount(10)
              }

              if(doc.data().settings.buttonStyles != undefined){
                setButtonStyle(doc.data().settings.buttonStyles)
              }else{
                setButtonStyle(1)
              }

              if(doc.data().settings.theme != undefined){
                setTheme(doc.data().settings.theme)
              }else{
                setTheme(false)
              }

              if(doc.data().settings.pc != undefined){
                setPC(doc.data().settings.pc)
              }else{
                setPC("orange")
              }
            }
          })
        })
      setLoaded(true)
    }

  useEffect(()=>{
      if(auth.currentUser != null){
        getUser(auth.currentUser.email)
      }
    console.log(theme)
  },[])

  onAuthStateChanged(auth, (e)=>{
    getUser(e.email)
  })

  return (
    <div>
      <MantineProvider theme={{
          primaryColor:pc,
          colorScheme: theme,
      }}>
          <Global
            styles={(t)=>({
              body:{
                backgroundColor:background != "" ? background : '#14213d',
              }
            })}
          />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chatscreen />}/>
            <Route path="/settings" element={<Settings bg={background} th={theme} dn={docName} lc={limitCount} bs={buttonStyle} pC={pc} />}/>
            <Route path="/TikTakToe" element={<TikTakToe/>}/>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
}

export default App;
