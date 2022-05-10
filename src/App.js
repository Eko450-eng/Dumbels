import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import { useState, useEffect } from 'react'
import { Global, Button, ColorInput, Group, MenuLabel, NumberInput } from '@mantine/core'
import { query, collection, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import db from './components/firebase/firebaseConfig'
import Welcome from './components/Welcome'
import Register from './components/Register'
import Login from './components/Login'
import Chatscreen from './components/Chatscreen'
import Settings from './components/Settings'
import useStyle from './components/Styles'

import './styles/main.css'

function App() {
    const auth = getAuth()
    const { classes } = useStyle()
    const [ background, setBackground ] = useState('')
    const [ theme, setTheme ] = useState('light')
    const [ docName, setDocName ] = useState()
    const [ limitCount, setLimitCount ] = useState(10)
    const [ buttonStyle, setButtonStyle ] = useState(1)
    const [ loaded, setLoaded ] = useState(false)
    const [ pc, setPC ] = useState('blue')

    const getUser = async()=>{
        const emailRef = query(collection(db, "users"), where('email', '==', auth.currentUser.email))
        const emailSnapshot = await getDocs(emailRef)
        emailSnapshot.forEach(doc=>{
            setDocName(doc.data().userName)
            doc.data().settings.limitCount != undefined ? setLimitCount(doc.data().limitCount) : setLimitCount(10)
          doc.data().settings.backgroundColor != undefined ?
            localStorage.setItem("background", doc.data().settings.backgroundColor) :
            localStorage.setItem("background", '#14213d')
            doc.data().settings.buttonStyles != undefined ? setButtonStyle(doc.data().settings.buttonStyles) : setButtonStyle(1)
            doc.data().settings.theme != undefined ? setTheme(doc.data().settings.theme) : setTheme("dark")
            doc.data().settings.pc != undefined ? setPC(doc.data().settings.pc) : setTheme("orange")
        })

    }

    useEffect(()=>{
      getUser().then(setLoaded(true))
      setBackground(localStorage.getItem('background'))
    },[])


  return (
    <div>
      <MantineProvider theme={{
          primaryColor:"blue",
          colorScheme:"dark"
      }}>

        {loaded &&
          <Global
            styles={(t)=>({
              body:{
                backgroundColor:background,
                color: t.colorScheme === "dark" ? t.black : t.light,
              }
            })}
          />
        }
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<Chatscreen />}/>
            <Route path="/settings" element={<Settings />}/>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </div>
  );
}



export default App;
