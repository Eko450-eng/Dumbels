import { createStyles, Avatar, Text, Group, Divider, Menu } from '@mantine/core'
import { addDoc, collection, doc, getDoc, query, setDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import db from '../firebase/firebaseConfig'
import { useState } from 'react'
import useStyles from '../Styles'
import { ArrowsLeftRight, Hash, MessageCircle, Trash } from 'tabler-icons-react'
import { useDisclosure } from '@mantine/hooks'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
const socket = io('http://127.0.0.1:3001')

function MessageBox({userName, sender, message, day, month, year, hour, minutes}){
    const navigate = useNavigate()
    const { classes } = useStyles()
    const [ profilePic, setProfilePic ] = useState('')
    const [ opened, handlers ] = useDisclosure(false)

    const cyear = new Date().getFullYear().toString()
    const monthCalc = new Date().getMonth() + 1
    const cmonth = monthCalc.toString()
    const cday = new Date().getDate().toString()

    const getUser = async()=>{
        const q = doc(db, "users", sender)
        const snapShot = await getDoc(q)
        setProfilePic(snapShot.data().avatar)
    }

    const sendInvite = async(user)=>{
        const userNameSnap = await setDoc(doc(db, "invites", sender), {
            receiver: sender,
            sender: user,
            message: " wants to play TikTakToe",
        })
    }

    const createNewChatRoom = async(person)=>{
        const docRef = addDoc(collection(db, 'privateRooms'), {
            participants: {
                one: person,
                two: userName
            }
        })
    }

    getUser()

    return <div className="MessageBox">
                <div>
                  <Group className={sender == userName ? classes.user : classes.recipient}>
                    { sender != userName ?
                      <Group>
                        <Menu control={<Avatar src={profilePic} alt={'../styles/assets/avatarDef.png'} radius="xl" />} opened={opened} onOpen={handlers.open} onClose={handlers.close}>
                          <Menu.Item
                            color="green"
                            icon={<MessageCircle size={14} />}
                            onClick={()=>createNewChatRoom(sender)}
                          >Start Private Chat</Menu.Item>
                          <Menu.Item
                            color="green"
                            icon={<Hash size={14} />}
                            onClick={()=>{
                                sendInvite(sender)
                                socket.emit("closing", "hi")
                                setTimeout(()=>{
                                    navigate('/TikTakToe')
                                },[250])
                            }}
                          >Invite to TikTakToe</Menu.Item>
                        </Menu>
                      </Group>
                      : null  }
                        <div>
                          <Text size="xs" color="indigo">{sender != "" ? sender : "Deleted user"}</Text>
                          <Group className={classes.bubble}>
                                <Text size="sm">{message}</Text>
                            </Group>
                        </div>
                      { sender == userName ? <Avatar src={profilePic} alt={'../styles/assets/avatarDef.png'} radius="xl" /> : null  }
                    </Group>
                  <Text size="xs" className={classes.timeStamp} color="dimmed">{
                        year != cyear ? `${day}.${month}.${year}`: month != cmonth ? `${day}.${month}` : day != cday ? `${day}.${month}` : `${hour}:${minutes}`
                    }</Text>
                </div>
            </div>
}
export default MessageBox
