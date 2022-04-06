import { Button, TextInput } from "@mantine/core"
import { useForm } from '@mantine/hooks'
import db from '../firebase/firebaseConfig'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { useState } from "react"
import { getAuth } from 'firebase/auth'

function Chatinput(){
    const auth = getAuth()
    const [ user, setUser ] = useState('')

    auth.onAuthStateChanged(u=>{
        setUser(u.displayName)
    })

    const form = useForm({
        initialValues: {
            user:user,
            mes: "",
        }
    })

    const sendMessage = (v)=>{
        const month = new Date().getMonth() + 1
        const docRef = addDoc(collection(db, 'mainChat'), {
            sender: v.user,
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
