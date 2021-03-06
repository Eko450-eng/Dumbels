import { useNavigate } from 'react-router-dom'
import { Button, Group } from '@mantine/core'
import HomeButton from './Helpers/HomeButton'
import useStyles from './Styles'
import AppSettings from './settingsComponents/AppSettings'
import UserSettings from './settingsComponents/UserSettings'
import { useState } from 'react'

function Settings({bg, th, dn, lc, bs, pC}){
    const navigate = useNavigate()
    const { classes } = useStyles()
    const [ userSettings, setUserSettings ] = useState(true)
    const [ mv, setMV ] = useState(false)


	return <div className={classes.sidebarRow}>
            <Group className={classes.sideBar}>
                <Button onClick={()=>setUserSettings(true)}>Profile</Button>
                <Button onClick={()=>setUserSettings(false)}>Apperance</Button>
            </Group>
             <Group className={classes.column}>
    {userSettings ? <UserSettings/> : <AppSettings bg={bg} th={th} dn={dn} lc={lc} bs={bs} pC={pC}/>}
             </Group>
		   </div>
}
export default Settings
