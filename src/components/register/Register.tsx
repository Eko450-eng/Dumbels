import { useNavigate } from 'react-router-dom'
import { PasswordInput, Select, TextInput, Box, Text, Center, Button, NumberInput } from '@mantine/core'
import { useInputState } from '@mantine/hooks';
import { useForm } from '@mantine/form'
import { Check, X } from 'tabler-icons-react';
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { handleSignup, passwordStrengthRequirements as requirements } from './handleSignup'
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import user from '../../interfaces/users';
import userTemplate from '../../interfaces/userTemplate';
import { useState } from 'react';
import '../../styles/shake.css'

interface requirementsType{ meets:any, label:any }

function Register() {
    const navigate = useNavigate()
    const [ password, setPassword ] = useInputState('')
    const [pass, setPass ]= useInputState('')
    const [ shake, setShake ] = useState(false)

    const form = useForm({
        initialValues:{
            userName: "",
            firstName: "",
            lastName: "",
            age: 18,
            gender: "",
            email: '',
            pass: ""
        },
    })

    function PasswordRequirement(requirements: requirementsType) {
        return (
            <Text color={requirements.meets ? 'teal' : 'red'} mt={5} size="sm">
                <Center inline>
                    {requirements.meets ? <Check size={14} /> : <X size={14} />}
                    <Box ml={7}>{requirements.label}</Box>
                </Center>
            </Text>
        );
    }

    const handleSubmit = async(password: string, pass: string, e: object) => {
        try{
            await handleSignup(password, pass, e)
                .then((user: userTemplate)=>{
                    createUserWithEmailAndPassword(auth, user.email, password)
                        .then((userCredentials)=>{
                            const newUser: user = {
                                uid: userCredentials.user.uid,
                                userName: user.userName,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                age: user.age,
                                gender: user.gender,
                                email: user.email,
                                activated: false
                            }

                            console.log(user)

                            setDoc(doc(db, "users", user.userName), newUser)

                            showNotification({
                                title: "User created succesfully",
                                message: "Welcome on board",
                                icon: <Check/>,
                                color: 'green'
                            })

                            setTimeout(()=>{
                                navigate('/')
                            },2000)

                        }).catch((err)=>{
                            console.log(err)
                            showNotification({
                                title: "Email Already in use",
                                message: "Please use a different email adress",
                                icon: <X />,
                                color: 'red'
                            })
                        })
            })
        }catch(error: any){
            console.log(error.name)
            switch(error.name){
                case "userExists":
                    showNotification({
                        title: "Username is already taken",
                        message: "Wait? there's two of you?!",
                        icon: '😳',
                        color: 'red'
                    })
                    return
                case "noMatch":
                    console.log(requirements)
                    showNotification({
                        title: "Passwords dont match",
                        message: "Please confirm your password",
                        icon: <X />,
                        color: 'red'
                    })
                    return
                case "strength":
                    setShake(true)
                    setTimeout(()=>{
                        setShake(false)
                    },250)
                    return
                case "error":
                    showNotification({
                        title: "WOOPS",
                        message: "There was an unexpected error, please try again",
                        icon: <X />,
                        color: 'red'
                    })
                    return
                default:
                    return
            }
        }
    }

    function getStrength(password: string) {
        let multiplier = password.length > 5 ? 0 : 1;

        requirements.forEach((requirement) => {
            if (!requirement.re.test(password)) {
                multiplier += 1;
            }
        });

        return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
    }

    /* const strength = getStrength(password); */
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
    ));


    return <div className="Register">
             <NotificationsProvider>
             {/* Title */}
                <form onSubmit={form.onSubmit((values)=>handleSubmit(password, pass, values))} >
                    <TextInput {...form.getInputProps('userName')} label="Username"  required name="userName" type="text" placeholder="Username" />
                    <TextInput {...form.getInputProps('firstName')} label="First Name"  required name="firstName" type="text" placeholder="Firstname" />
                    <TextInput {...form.getInputProps('lastName')} label="Last Name"  required name="lastname" type="text" placeholder="Lastname" />
                    <NumberInput {...form.getInputProps('age')} label="Age" min="18"  required name="age" type="number" placeholder="Age" />
                    <Select {...form.getInputProps('gender')} label="Gender"  placeholder='Please choose a gender' data={['Male', 'Female', 'Other']} />
                    <TextInput {...form.getInputProps('email')} label="E-mail"  required name="E-Mail" type="email" placeholder="E-Mail" />

                    <PasswordInput
                    value={password}
                    {...form.getInputProps(password)}
                    onChange={setPassword}
                    placeholder="Your password"
                    className="full"
                    required
                    />

                    <PasswordInput
                    value={pass}
                    {...form.getInputProps(pass)}
                    onChange={setPass}
                    placeholder="Confirm your password"
                    className="full"
                    required
                    />
                    <div className={shake ? "shake" : "" } >
                        <PasswordRequirement label="Same password" meets={(password == pass)} />
                        {checks}
                    </div>

                    <Button type="submit">Register</Button>
                </form>
             </NotificationsProvider>
            </div>
}

export default Register
