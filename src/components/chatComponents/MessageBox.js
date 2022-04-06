import { createStyles, Avatar, Text, Group } from '@mantine/core'
import { AlignLeft } from 'tabler-icons-react'
//Mantine section
const useStyles = createStyles((thene)=>({
    body: {
        fontSize:8,
        textAlign:"right"
    }
}))

function MessageBox({sender, message, day, month, year, hour, minute, avatar}){
    const { classes } = useStyles()

    const cyear = new Date().getFullYear().toString()
    const monthCalc = new Date().getMonth() + 1
    const cmonth = monthCalc.toString()
    const cday = new Date().getDate().toString()

    return <div className="MessageBox">
                <div>
                    <Group>
                      <Avatar src={avatar} alt={'../styles/assets/avatarDef.png'} radius="xl" />
                        <div>
                            <Text size="xs" color="indigo">{sender}</Text>
                            <Text size="sm">{message}</Text>
                        </div>
                    </Group>
                  <Text size="xs" className={classes.body} color="dimmed">{
                        year != cyear ? `${day}.${month}.${year}`: month != cmonth ? `${day}.${month}` : day != cday ? `${day}.${month}` : `${hour}:${minute}`
                    }</Text>
                </div>
            </div>
}
export default MessageBox
