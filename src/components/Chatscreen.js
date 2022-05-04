import { useEffect, useState } from 'react';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore'
import db from './firebase/firebaseConfig'
import Chatinput from './chatComponents/Chatinput';
import MessageBox from './chatComponents/MessageBox';
import { v4 as uuid } from 'uuid'
import { getAuth } from 'firebase/auth'

function Chatscreen(){
    const auth = getAuth()
    const [ messages, setMessages ] = useState([])

    const getMessages = async() =>{
        const q = query(collection(db, 'mainChat'), orderBy("timeStamp"))
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
            {
                messages.map(m=>{
                    return <MessageBox key={uuid()} sender={m.sender} message={m.message} day={m.day} month={m.month} year={m.year} hour={m.hour} minute={m.minute} avatar={m.avatar}/>
                })
            }
            <Chatinput />
        </div>

}
export default Chatscreen
