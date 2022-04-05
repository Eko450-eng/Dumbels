import { useEffect, useState } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore'
import db from './firebase/firebaseConfig'
import Chatinput from './chatComponents/Chatinput';
import { v4 as uuid } from 'uuid'

function Chatscreen(){

    const [ messages, setMessages ] = useState([])

    const getMessages = async() =>{
        const q = query(collection(db, 'mainChat'))
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
                    console.log(m)
                    return <p key={uuid()}>{m.message}</p>
                })
            }
            <Chatinput />
        </div>
}
export default Chatscreen
