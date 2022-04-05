import { Button, TextInput } from "@mantine/core"
import { useForm } from '@mantine/hooks'
import db from '../firebase/firebaseConfig'
import { addDoc, collection, Timestamp } from 'firebase/firestore'

function Chatinput(){

    const form = useForm({
        initialValues: {
            user:"",
            mes: "",
        }
    })

    const sendMessage = (v)=>{
        const time = new Timestamp()
        const docRef = addDoc(collection(db, 'mainChat'), {
            sender: v.user,
            message: v.mes,
            timeStamp: Timestamp.now()
        })
    }

	return <form onSubmit={form.onSubmit((values)=>sendMessage(values))} className="Chatinput">
             <TextInput {...form.getInputProps('mes')} className="messageBox" type="text" name="message" autoFocus={true} required={true} placeholder="Message..." maxLength={100} />
            <Button type="submit">Send</Button>
		   </form>
}
export default Chatinput
