import { useNavigate } from 'react-router-dom'
import { Button } from '@mantine/core'
import { useState } from 'react'
import { NotificationsProvider } from '@mantine/notifications'
import { getAuth, signOut } from 'firebase/auth'
import useStyles from './Styles'

function Welcome(){
    const navigate = useNavigate()
    const auth = getAuth()
    const { classes } = useStyles()
    const [ loggedIn, setLoggedIn ] = useState(true)

    const logOut = () =>{
        signOut(auth)
        window.location.reload()
    }

    auth.onAuthStateChanged(user=>{
        if(auth.currentUser != null){
            setLoggedIn(false)
        }
    })


    return <div className={classes.column}>
             <NotificationsProvider>
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
                 <div className={classes.column}>
                    <button className="btn_invisible" onClick={()=>{
                        navigate('/chat')
                    }}>Chat</button>
                    <Button onClick={()=>navigate('/Settings')}>Settings</Button>
                    <Button onClick={()=>logOut()}>Log out</Button>
                </div>
                }
             </NotificationsProvider>
            </div>
}

export default Welcome
