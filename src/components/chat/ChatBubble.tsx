import { Avatar, Group, Menu, Text } from '@mantine/core'
import { addDoc, collection, doc, getDoc, query, where } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../../firebase/firebaseConfig'
import avatarDef from '../../styles/assets/avatarDef.png';

function ChatBubble({ targetUser, message, sender } :any){
	const [ profilePic, setProfilePic ] = useState("")
	const cyear = new Date().getFullYear().toString()
	const monthCalc = new Date().getMonth() + 1
	const cmonth = monthCalc.toString()
	const cday = new Date().getDate().toString()

    /* const getUser = async()=>{
        const q = query(collection(db, "users"), where("email", "==", auth.currentUser.email) )
*       const snapShot: any = await getDoc(q)
*       setProfilePic(snapShot.data().avatar)
*   }


* getUser() */

	return <div className="ChatBubble">
                <div>
                  <Group className={sender == targetUser ? "user" : "recipient"}>
                    { sender != targetUser ?
                      <Group>
                        <Avatar src={avatarDef} alt={'../../styles/assets/avatarDef.png'} radius="xl" />
                      </Group>
                      : null  }
                        <div>
                          <Text size="xs" color="indigo">{sender != "" ? sender : "Deleted user"}</Text>
                          <Group className="bubble">
                                <Text size="sm">{message}</Text>
                            </Group>
                        </div>
                      { sender == targetUser ? <Avatar src={avatarDef} alt={'../styles/assets/avatarDef.png'} radius="xl" /> : null  }
                    </Group>
				{/* <Text size="xs" className="timestamp" color="dimmed">{
                        year != cyear ? `${day}.${month}.${year}`: month != cmonth ? `${day}.${month}` : day != cday ? `${day}.${month}` : `${hour}:${minutes}`
                    }</Text> */}
                </div>
            </div>

}
export default ChatBubble
