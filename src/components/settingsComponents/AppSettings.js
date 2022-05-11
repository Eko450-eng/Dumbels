import { ActionIcon, Button, ColorInput, ColorSchemeProvider, Global, Group, Menu, MenuLabel, NumberInput, Select, Text, TextInput, useMantineColorScheme } from '@mantine/core'
import { query, collection, where, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { X, Check, Sun, MoonStars, ChevronDown, Package, SquareCheck, Users, Calendar } from 'tabler-icons-react'
import HomeButton from '../Helpers/HomeButton'
import db from '../firebase/firebaseConfig'
import useStyles from '../Styles'
import { useForm, useInputState } from '@mantine/hooks'

function AppSettings({bg, th, dn, lc, bs, pC}){
    const auth = getAuth()
    const { classes } = useStyles()
    const [ background, setBackground ] = useState(bg)
    const [ theme, setTheme ] = useState(th)
    const [ docName, setDocName ] = useState(dn)
    const [ limitCount, setLimitCount ] = useState(10)
    const [ buttonStyle, setButtonStyle ] = useState(bs)
    const [ pc, setPC ] = useState(pC)

    const changeSettings = async(e)=>{
        await updateDoc(doc(db, "users", dn), {
            settings: {
                background: e.background,
                limitCount: e.limitCount,
                buttonStyle: e.buttonStyle,
                theme: e.theme,
                pc: e.pc
            }
        })
        showNotification({
            title:"Settings changed succesfully",
            icon: <Check/>,
            color:"Green"
        })
    }

    const form = useForm({
        initialValues:{
            background: background,
            buttonStyle: buttonStyle,
            limitCount: limitCount,
            pc: pc,
            theme: theme
        }
    })

	return <div className="AppSettings">
             <NotificationsProvider>
                <form onSubmit={form.onSubmit((values)=>changeSettings(values))}>
                        <Group className={classes.container}>
                        <NumberInput
                            label="Messages" min="2"
                            value={10}
                            type="number"
                            placeholder="Message Count"
                            {...form.getInputProps('limitCount')}
                        />
                        </Group>

                        <ColorInput
                            swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                            placeholder="Background color"
                            label="Your background color"
                            value={background}
                            onChange={setBackground}
                            {...form.getInputProps('background')}
                        />

                    {/* <TextInput */}
                    {/*         value={pc} */}
                    {/*         placeholder="Primary color" */}
                    {/*         label="Your primary color" */}
                    {/*         {...form.getInputProps('pc')} */}
                    {/* /> */}

                    <Select
                        label="Theme"
                        placeholder="Theme"
                        searchable
                        nothingFound="Please choose a valid option"
                        data={[
                            { value: 'dark', label: 'Dark' },
                            { value: 'light', label: 'Light' },
                        ]}
                        {...form.getInputProps('theme')}
                    />

                    <Select
                        label="Your Primary Color"
                        placeholder="Primary Color"
                        searchable
                        nothingFound="Please choose a valid option"
                        data={[
                            { value: 'green', label: 'Green' },
                            { value: 'red', label: 'Red' },
                            { value: 'blue', label: 'Blue' },
                            { value: 'violet', label: 'Purple' },
                            { value: 'orange', label: 'Orange' },
                        ]}
                        {...form.getInputProps('pc')}
                    />


                    <p>More to come</p>

                    <Button type="submit">Save</Button>
                    </form>
                <HomeButton/>
             </NotificationsProvider>
		   </div>
}
export default AppSettings
