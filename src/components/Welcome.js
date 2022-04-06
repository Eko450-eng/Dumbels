import { useNavigate } from 'react-router-dom'
import { Button } from '@mantine/core'
import { useEffect, useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'
import ChatScreen from './Chatscreen'

function Welcome(){
    const navigate = useNavigate()
    const auth = getAuth()
    const [ loggedIn, setLoggedIn ] = useState(true)

    auth.onAuthStateChanged(user=>{
        if(auth.currentUser != null){
            setLoggedIn(false)
        }
    })

    return <div className="Welcome">
            <h1>Dumbels</h1>
            {!loggedIn && <p>Welcome back {auth.currentUser.displayName}</p>}
             {loggedIn ?
              <div>
                <button className="btn_invisible" onClick={()=>{
                    navigate('/register')
                }}>Register</button>
                <button className="btn_invisible" onClick={()=>{
                    navigate('/login')
                }}>Login</button>
              </div> :
              <div>
                <button className="btn_invisible" onClick={()=>{
                    navigate('/chat')
                }}>Chat</button>
                <Button onClick={()=>signOut(auth)}>Log out</Button>
              </div>
            }
            </div>
}
export default Welcome
