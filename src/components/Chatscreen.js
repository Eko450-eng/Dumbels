import { useEffect, useState } from 'react';
import { query, collection, orderBy, onSnapshot, where, getDocs, limit, deleteDoc, doc } from 'firebase/firestore'
import db from './firebase/firebaseConfig'
import Chatinput from './chatComponents/Chatinput';
import MessageBox from './chatComponents/MessageBox';
import { v4 as uuid } from 'uuid'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Alert, Button, Group } from '@mantine/core';
import HomeButton from './Helpers/HomeButton'
import useStyles from './Styles'
import { useNavigate } from 'react-router-dom';
import { Hash } from 'tabler-icons-react';

function Chatscreen(){
    const auth = getAuth()
    const { classes } = useStyles()
    const [ messages, setMessages ] = useState([])
    const [ userName, setUserName ] = useState('')
    const [ limitCount, setLimitCount ] = useState(10)
    const [ docName, setDocName ] = useState('')
    const [ invite, setInvite ] = useState('')
    const [ inviter, setInviter ] = useState('')
    const [ noMessage, setNoMessage ] = useState(true)
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
    }

    const q = query(collection(db, 'invites'))
    const sub = onSnapshot(q, (qs) => {
        qs.forEach((doc)=>{
            if(doc.data().receiver == userName){
                setInvite(true)
                setInviter(doc.data().sender)
                const sender = doc.data().sender
            }
        })
    })

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
        setInvite(false)
        setInviter('')
        getUser()
    },[])

    useEffect(()=>{
        getMessages()
    },[limitCount])

    const acceptInvite = async() =>{
        await deleteDoc(doc(db, "invites", userName))
        navigate('/TikTakToe')
    }

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
            {invite &&
                <div onClick={()=>{
                    acceptInvite()
                }}>
                <Alert icon={<Hash size={16} />} title="Join!" color="green">
                    Join the game
                </Alert>
                </div>
            }
            <Chatinput />
            <HomeButton/>
        </div>

}
export default Chatscreen
