import { createStyles, Avatar, Text, Group } from '@mantine/core'
import { getAuth } from 'firebase/auth'
//Mantine section
const useStyles = createStyles((theme)=>({
    timeStamp: {
        fontSize:8,
        textAlign:"right"
    },
    user: {
        justifyContent: "right",
        textAlign:"right"
    },
    recipient: {
        justifyContent: "left",
        textAlign:"left"
    }
}))

function MessageBox({sender, message, day, month, year, hour, minute, avatar}){
    const { classes } = useStyles()
    const auth = getAuth()
    const cyear = new Date().getFullYear().toString()
    const monthCalc = new Date().getMonth() + 1
    const cmonth = monthCalc.toString()
    const cday = new Date().getDate().toString()

    console.log(auth.currentUser.displayName)

    return <div className="MessageBox">
                <div>
                  <Group className={sender == auth.currentUser.displayName ? classes.user : classes.recipient}>
                      { sender == auth.currentUser.displayName ? <Avatar src={avatar} alt={'../styles/assets/avatarDef.png'} radius="xl" /> : null  }
                        <div>
                          <Text size="xs" color="indigo">{sender != "" ? sender : "UserDeleted"}</Text>
                            <Text size="sm">{message}</Text>
                        </div>
                      { sender != auth.currentUser.displayName ? <Avatar src={avatar} alt={'../styles/assets/avatarDef.png'} radius="xl" /> : null  }
                    </Group>
                  <Text size="xs" className={classes.timeStamp} color="dimmed">{
                        year != cyear ? `${day}.${month}.${year}`: month != cmonth ? `${day}.${month}` : day != cday ? `${day}.${month}` : `${hour}:${minute}`
                    }</Text>
                </div>
            </div>
}
export default MessageBox
