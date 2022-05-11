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

function PrivateChat(){
    const [ chats, setChats ] = useState()
    const [ userName, setUserName ] = useState()

    const checkEmail = async() =>{
        const emailRef = query(collection(db, "users"), where('email', '==', auth.currentUser.email))
        const emailSnapshot = await getDocs(emailRef)
        emailSnapshot.forEach(doc=>{
            setUserName(doc.data().userName)
        })
    }

    // const getMessages = async() =>{
    //     const q = query(collection(db, 'privateChats'), orderBy("timeStamp", "desc"), limit(limitCount))
    //     const unsubscribe = onSnapshot(q, (qs) => {
    //         setMessages([])
    //         qs.forEach((doc)=>{
    //             setMessages(old=>[...old, doc.data()])
    //         })
    //     })
    // }

    useEffect(()=>{
        checkEmail()
    },[])

	return <div className="PrivateChat">

		   </div>
}
export default PrivateChat
