import { Button, ColorInput, Global, Group, MenuLabel, NumberInput } from '@mantine/core'
import { query, collection, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { X, Check } from 'tabler-icons-react'
import HomeButton from '../Helpers/HomeButton'
import db from '../firebase/firebaseConfig'
import useStyles from '../Styles'
import { useForm, useInputState } from '@mantine/hooks'

function AppSettings(){
    const auth = getAuth()
    const { classes } = useStyles()
    const [ background, setBackground ] = useInputState('')
    const [ theme, setTheme ] = useState('light')
    const [ docName, setDocName ] = useState()
    const [ limitCount, setLimitCount ] = useState(10)
    const [ buttonStyle, setButtonStyle ] = useState(1)
    const [ loaded, setLoaded ] = useState(false)
    const [ pc, setPC ] = useState('blue')
    const [ set, setSet ] = useState(0)

    const getUser=async()=>{
        const emailRef = query(collection(db, "users"), where('email', '==', auth.currentUser.email))
        const emailSnapshot = await getDocs(emailRef)
        emailSnapshot.forEach(doc=>{
            setDocName(doc.data().userName)
            doc.data().settings.limitCount != undefined ? setLimitCount(doc.data().limitCount) : setLimitCount(10)
            doc.data().settings.backgroundColor != undefined ? setBackground(doc.data().settings.backgroundColor) : setBackground('#14213d')
            doc.data().settings.buttonStyles != undefined ? setButtonStyle(doc.data().settings.buttonStyles) : setButtonStyle(1)
            doc.data().settings.theme != undefined ? setTheme(doc.data().settings.theme) : setTheme("light")
            doc.data().settings.pc != undefined ? setPC(doc.data().settings.pc) : setTheme("blue")
        })
    }

    useEffect(()=>{
        getUser()
        setTimeout(()=>{
            setLoaded(true)
        },[250])
    },[])

    const changeBackgroundInUI = () =>{

    }

    const changeSettings = async(e)=>{
        setBackground(e.backgroundColor)
        console.log(e.backgroundColor)
        await updateDoc(doc(db, "users", docName), {
            settings: {
                backgroundColor: e.backgroundColor,
                buttonStyle: e.buttonStyle,
                limitCount: e.limitCount
            }
        })
        showNotification({
            title:"Settings changed succesfully",
            icon: <Check/>,
            color:"Green"
        })
    }

    useEffect(() => {
        localStorage.setItem('background', background);
    }, [background]);

    const form = useForm({
        initialValues:{
            backgroundColor: background,
            buttonStyle: buttonStyle,
            limitCount: limitCount,
        }
    })

	return <div className="AppSettings">
            <Global
                styles={(t)=>({
                body:{
                    backgroundColor:background,
                    color: t.colorScheme === "dark" ? t.black : t.light,
                }
                })}
            />
             {loaded &&
              <form onSubmit={form.onSubmit((values)=>changeSettings(values))}>
                    <Group className={classes.container}>
                    <NumberInput
                        label="Messages" min="2"
                        defaultValue={limitCount}
                        type="number"
                        placeholder="Message Count"
                        {...form.getInputProps('limitCount')}
                      onChange={(v)=>console.log(v)}
                    />
                    </Group>

                    <ColorInput
                        swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                        value={background}
                        onChange={setBackground}
                        placeholder="Background color"
                        label="Your favorite color"
                        {...form.getInputProps('backgroundColor')}
                    />
                  <Button type="submit">Save</Button>
                </form>
             }
            <HomeButton/>
		   </div>
}
export default AppSettings
