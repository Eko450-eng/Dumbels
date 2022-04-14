import { Button, TextInput } from "@mantine/core"
import { useForm } from '@mantine/hooks'
import db from '../firebase/firebaseConfig'
import { query, addDoc, collection, Timestamp, where, getDocs } from 'firebase/firestore'
import { useState } from "react"
import { getAuth } from 'firebase/auth'

function Chatinput(){
    const auth = getAuth()
    const [ user, setUser ] = useState('')
    const [ receiver, setReceiver ] = useState('')


    const checkUser = async(u) => {
        const q = query(collection(db, "users"), where('uid', '==', u.uid))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc=>{
            setUser(doc.data().userName)
        })
    }

    auth.onAuthStateChanged(async (u)=>{
        checkUser(u)
    })

    const form = useForm({
        initialValues: {
            user:user,
            mes: "",
        }
    })

    const sendMessage = (v)=>{
        const month = new Date().getMonth() + 1
        if(v.mes.startsWith("@")){
            setReceiver(v.mes.replace('@','').split(' ')[0])
            console.log(receiver)
        }
        const docRef = addDoc(collection(db, 'mainChat'), {
            sender: user,
            message: v.mes,
            timeStamp: Timestamp.now(),
            day: new Date().getDate().toString(),
            month: month.toString(),
            year: new Date().getFullYear().toString(),
            hour: new Date().getHours().toString(),
            minutes: new Date().getMinutes().toString()
        })
        form.reset()
    }

	return <form onSubmit={form.onSubmit((values)=>sendMessage(values))} className="Chatinput">
             <TextInput {...form.getInputProps('mes')} className="messageBox" type="text" name="message" autoFocus={true} required={true} placeholder="Message..." maxLength={100} />
            <Button type="submit">Send</Button>
		   </form>
}
export default Chatinput
