import { createStyles, Avatar, Text, Group } from '@mantine/core'
import { collection, doc, getDoc, query } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import db from '../firebase/firebaseConfig'
import { useState } from 'react'
import useStyles from '../Styles'

function MessageBox({userName, sender, message, day, month, year, hour, minutes}){
    const { classes } = useStyles()
    const [ profilePic, setProfilePic ] = useState('')

    const cyear = new Date().getFullYear().toString()
    const monthCalc = new Date().getMonth() + 1
    const cmonth = monthCalc.toString()
    const cday = new Date().getDate().toString()

    const getUser = async()=>{
        const q = doc(db, "users", sender)
        const snapShot = await getDoc(q)
        setProfilePic(snapShot.data().avatar)
    }

    getUser()

    return <div className="MessageBox">
                <div>
                  <Group className={sender == userName ? classes.user : classes.recipient}>
                      { sender != userName ? <Avatar src={profilePic} alt={'../styles/assets/avatarDef.png'} radius="xl" /> : null  }
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
