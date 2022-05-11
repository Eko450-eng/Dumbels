import { query, collection, where, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { getAuth, updatePassword } from 'firebase/auth'
import { Avatar, Button, Center, Text, PasswordInput, TextInput, Box } from '@mantine/core'
import { useEffect, useState } from 'react'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { useForm, useInputState } from '@mantine/hooks';
import { Home, Check, X } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';
import useStyles from '../Styles'
import db from '../firebase/firebaseConfig'

function UserSettings(){
    const auth = getAuth()
    const user = auth.currentUser
    const navigate = useNavigate()
    const {classes} = useStyles()
    const [ docName, setDocName ] = useState()
    const [ profilePic, setProfilePic ] = useState('')
    const [ newPassword, setNewPassword ] = useInputState('')
    const [ newPasswordConfirmation, setNewPasswordConfirmation ] = useInputState('')


    const form = useForm({
        initialValues:{
            url:"",
            oldPassword: "",
            newPassword: "",
            newPasswordConfirmation: "",
        }
    })

    const getUser = async(user)=>{
        if(user != undefined){
            const emailRef = query(collection(db, "users"), where('email', '==', (user)))
            const unsubscribe = onSnapshot(emailRef, (doc)=>{
                doc.forEach(doc=>{
                    setDocName(doc.data().userName)
                    setProfilePic(doc.data().avatar)
                })
            })
        }
    }

    useEffect(() => {
        if(auth.currentUser != null){
            getUser(auth.currentUser.email)
        }
    }, []);

    //Change Password
    const passwordChange = (e)=>{
        let passCheck = (newPassword === newPasswordConfirmation) && number(newPassword) && letter(newPassword) && upperCaseLetter(newPassword) && specialCharacter(newPassword) && length(newPassword)
        if(passCheck){
            updatePassword(user, newPassword).then(()=>{
                console.log("Changed password")
                console.log(user)
                showNotification({
                    title: "PasswordChanged",
                    icon: <Check/>,
                    color: "green"
                })
                setTimeout(()=>{
                    navigate('/')
                },[250])
            }).catch((e)=>{
                showNotification({
                    title: "There was an unexpected error",
                    message: "Dobby mad bubu master...",
                    icon: <X/>,
                    color: "red",
                })
            })
        }else{
            showNotification({
                title: "Error",
                message: "The passwords do not meet the requirements",
                icon: <X/>,
                color: "red",
            })
        }
    }

    //Change ProfilePicture
    const pictureChange=async(v)=>{
        await updateDoc(doc(db, "users", docName), {
            avatar: v.url,
        })
        showNotification({
            title:"Image changed succesfully",
            icon: <Check/>,
            color:"Green"
        })
    }

    useEffect(()=>{
        getUser()
    },[])

    const number = (v) => v.match(/[0-9]/)
    const letter = (v) => v.match(/[a-z]/)
    const upperCaseLetter = (v) => v.match(/[A-Z]/)
    const specialCharacter = (v) => v.match(/[$&+,:;=?@#|'<>.^*()%!-]/)
    const length = (v) => v.length > 7

    function PasswordRequirement({ meets, label }) {
        return (
            <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
                <Center inline>
                    {meets ? <Check size={14} /> : <X size={14} />}
                    <Box ml={7}>{label}</Box>
                </Center>
            </Text>
        );
    }

    const requirements = [
        { re: /[0-9]/, label: 'Includes number' },
        { re: /[a-z]/, label: 'Includes lowercase letter' },
        { re: /[A-Z]/, label: 'Includes uppercase letter' },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
    ];

    function getStrength(password) {
        let multiplier = password.length > 5 ? 0 : 1;

        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
            multiplier += 1;
            }
        });

        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
    }

    const strength = getStrength(newPassword);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(newPassword)} />
    ));

	return <div className={classes.userSettings}>
             <NotificationsProvider>
               <Avatar size={240} src={profilePic} alt={'../styles/assets/avatarDef.png'} radius="xl" />
               {/* Change Profilepicture */}
               <form className={classes.userSettings} onSubmit={form.onSubmit((values)=>pictureChange(values))}>
                    <TextInput {...form.getInputProps("url")} label="Profilepicture" classNames={classes} type="text" placeholder="URL" />
                    <Button type="submit">Set Image</Button>
                </form>

               {/* Change Password */}
               <form className={classes.userSettings} onSubmit={form.onSubmit((values)=>passwordChange(values))}>
                    <PasswordInput
                    value={newPassword}
                    {...form.getInputProps(newPassword)}
                    onChange={setNewPassword}
                    placeholder="Your new password"
                    classNames={classes}
                    className="full"
                    required
                    />

                    <PasswordInput
                    value={newPasswordConfirmation}
                    {...form.getInputProps(newPasswordConfirmation)}
                    onChange={setNewPasswordConfirmation}
                    placeholder="Confirm your new password"
                    classNames={classes}
                    className="full"
                    required
                    />

                    <PasswordRequirement label="Same password" meets={(newPassword == newPasswordConfirmation)} />
                    {checks}

                    <Button type="submit">set new Password</Button>
               </form>
               <Button onClick={()=>{
                   navigate('/')
               }} color="violet" radius="md" className={classes.rightBound} variant='subtle' compact uppercase><Home/>HOME</Button>
             </NotificationsProvider>
		   </div>
}
export default UserSettings
