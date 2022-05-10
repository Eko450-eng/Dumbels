import { useEffect, useState } from 'react';
import { query, collection, orderBy, onSnapshot, where, getDocs, limit } from 'firebase/firestore'
import db from './firebase/firebaseConfig'
import Chatinput from './chatComponents/Chatinput';
import MessageBox from './chatComponents/MessageBox';
import { v4 as uuid } from 'uuid'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Button, Group } from '@mantine/core';
import HomeButton from './Helpers/HomeButton'
import useStyles from './Styles'

function Chatscreen(){
    const auth = getAuth()
    const { classes } = useStyles()
    const [ messages, setMessages ] = useState([])
    const [ userName, setUserName ] = useState('')
    const [ limitCount, setLimitCount ] = useState(10)
    const [ docName, setDocName ] = useState('')

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

    const getUser=async()=>{
        const emailRef = query(collection(db, "users"), where('email', '==', auth.currentUser.email))
        const emailSnapshot = await getDocs(emailRef)
        emailSnapshot.forEach(doc=>{
            setDocName(doc.data().userName)
            doc.data().settings.limitCount != undefined ? setLimitCount(doc.data().settings.limitCount) : setLimitCount(10)
        })
    }

    const loadMore = ()=>{
        changedLimit(limitCount + 5)
    }

    window.scrollTo(0, document.body.scrollHeight)

    useEffect(()=>{
        getUser()
    },[])

    useEffect(()=>{
        getMessages()
    },[limitCount])

    return <div className="Chatscreen">
             <Group className={classes.container}>
               <Button onClick={()=>loadMore()} variant="subtle" radius="xl" size="xs">Load More</Button>
             </Group>
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
            <HomeButton/>
        </div>

}
export default Chatscreen
