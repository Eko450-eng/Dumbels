import { useNavigate } from 'react-router-dom'
import { query, collection, orderBy, onSnapshot, where, getDocs, limit, updateDoc, doc } from 'firebase/firestore'
import { Button, Notification, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { useForm, useInputState } from '@mantine/hooks';
import { Check } from 'tabler-icons-react';
import { getAuth, signOut, updateCurrentUser } from 'firebase/auth'
import useStyles from './chatComponents/Styles'
import db from './firebase/firebaseConfig'

function Welcome(){
    const {classes} = useStyles()
    const navigate = useNavigate()
    const auth = getAuth()
    const [ loggedIn, setLoggedIn ] = useState(true)
    const [ docName, setDocName ] = useState()

    const form = useForm({
        initialValues:{
            url:""
        }
    })

    const logOut = () =>{
        signOut(auth)
        window.location.reload()
    }

    auth.onAuthStateChanged(user=>{
        if(auth.currentUser != null){
            setLoggedIn(false)
        }
    })

    const getUser=async()=>{
        const emailRef = query(collection(db, "users"), where('email', '==', auth.currentUser.email))
        const emailSnapshot = await getDocs(emailRef)
        emailSnapshot.forEach(doc=>{
            setDocName(doc.data().userName)
        })
    }

    const pictureChange=async(v)=>{
        await updateDoc(doc(db, "users", docName), {
            avatar: v.url,
        })
        showNotification({
            title:"Image changed succesfully",
            icon: <Check/>,
            color:"Green"
        })
    }

    useEffect(()=>{
        getUser()
    },[])

    return <div className="Welcome">
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
                <div>
                    <button className="btn_invisible" onClick={()=>{
                        navigate('/chat')
                    }}>Chat</button>
                    <Button onClick={()=>logOut()}>Log out</Button>
                    <form onSubmit={form.onSubmit((values)=>pictureChange(values))}>
                        <TextInput {...form.getInputProps("url")} label="Profilepicture" classNames={classes} type="text" placeholder="URL" />
                        <Button type="submit">Set Image</Button>
                    </form>
                </div>
                }
             </NotificationsProvider>
            </div>
}

export default Welcome
