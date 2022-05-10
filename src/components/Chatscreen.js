import { useEffect, useState } from 'react';
import { query, collection, orderBy, onSnapshot, where, getDocs, limit } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import db from './firebase/firebaseConfig'
import Chatinput from './chatComponents/Chatinput';
import MessageBox from './chatComponents/MessageBox';
import { v4 as uuid } from 'uuid'
import { Home } from 'tabler-icons-react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Button, createStyles,NumberInput, Group } from '@mantine/core';

const useStyles = createStyles((theme)=>({
    container: {
        textAlign:"center",
        margin:"10px",
        width:"100%",
        justifyContent: "flex-start"
    },
    rightBound:{
        textAlign:"right"
    }
}))

function Chatscreen(){
    const auth = getAuth()
    const { classes } = useStyles()
    const [ messages, setMessages ] = useState([])
    const [ userName, setUserName ] = useState('')
    const [ limitCount, setLimitCount ] = useState(10)
    const navigate = useNavigate()

    const checkEmail = async() =>{
        const emailRef = query(collection(db, "users"), where('email', '==', auth.currentUser.email))
        const emailSnapshot = await getDocs(emailRef)
        emailSnapshot.forEach(doc=>{
            setUserName(doc.data().userName)
        })
    }

    onAuthStateChanged(auth, (user)=>{
        if(user){
            checkEmail()
        }
    })

    const changedLimit = (v) =>{
        setLimitCount(v)
        getMessages()
    }

    const getMessages = async() =>{
        const q = query(collection(db, 'mainChat'), orderBy("timeStamp", "desc"), limit(limitCount))
        const unsubscribe = onSnapshot(q, (qs) => {
        setMessages([])
            qs.forEach((doc)=>{
                setMessages(old=>[...old, doc.data()])
            })
        })
    }

    useEffect(()=>{
        getMessages()
    },[])

    return <div className="Chatscreen">
             <div className='reverseOrder'>
            {
                messages.map(m=>{
                    return <MessageBox
                             key={uuid()}
                             userName={userName}
                             sender={m.sender}
                             message={m.message}
                             day={m.day}
                             month={m.month}
                             year={m.year}
                             hour={m.hour}
                             minutes={m.minutes}
                           />
                })
            }
             </div>
            <Chatinput />
             <Group className={classes.container}>
               <NumberInput label="Messages" min="2" defaultValue={limitCount} onChange={(v)=>changedLimit(v)} type="number" placeholder="Message Count" />
               <Button onClick={()=>{
                   navigate('/')
               }} color="violet" radius="md" className={classes.rightBound} variant='subtle' compact uppercase><Home/>HOME</Button>
             </Group>
        </div>

}
export default Chatscreen
