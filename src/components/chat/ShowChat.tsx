import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import logic from './showChat'
import { collection, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import ChatBubble from './ChatBubble';

function ShowChat(){
    const [ messages, setMessages ] = useState([])
    const [ messagesExist, setMessagesExist ] = useState(false)
    const [ userName, setUserName ] = useState("")
    const auth: any = getAuth()

    const checkEmail = async() =>{
        const emailRef = query(collection(db, "users"), where('email', '==', auth.currentUser.email))
        const emailSnapshot = await getDocs(emailRef)
        emailSnapshot.forEach(doc => {
            setUserName(doc.data().userName)
        })
    }

    const getMessages = async() =>{
        const q = query(collection(db, 'mainChat'), orderBy("timeStamp", "desc"), limit(10))
        const unsubscribe = onSnapshot(q, (qs) => {
            setMessages([])
            qs.forEach((doc)=>{
                setMessages((old):any=>[...old, doc.data()])
            })
        })
    }

    useEffect(()=>{
        getMessages()
        checkEmail()

        setMessagesExist(true)
    },[])

	return <div className="ShowChat">
        <p>Load More</p>
        { messagesExist &&
            messages.map((message, i)=>{
                return <ChatBubble key={i}
                message={message["message"]}
                sender={message["sender"]}
                targetUser={userName}
                />
            })
        }
		</div>
}
export default ShowChat
