import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, updateCurrentUser } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Progress, Group, PasswordInput, Select, TextInput, Box, Text, Center, Button, NumberInput } from '@mantine/core'
import { useForm, useInputState } from '@mantine/hooks';
import { Check, X } from 'tabler-icons-react';
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import db from './firebase/firebaseConfig'
import useStyles from './chatComponents/Styles'

function Register(){
    const navigate = useNavigate()
    const { classes } = useStyles()
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

    const [ password, setPassword ] = useInputState('')
    const [ pass, setPass ] = useInputState('')

    // Check if user already exists
    // Autologin
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


    const number = (v) => v.match(/[0-9]/)
    const letter = (v) => v.match(/[a-z]/)
    const upperCaseLetter = (v) => v.match(/[A-Z]/)
    const specialCharacter = (v) => v.match(/[$&+,:;=?@#|'<>.^*()%!-]/)
    const length = (v) => v.length > 7
    const auth = getAuth()



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

    const strength = getStrength(password);
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(password)} />
    ));
    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
        <Progress
            styles={{ bar: { transitionDuration: '0ms' } }}
            value={
            password.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
            }
            color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
            key={index}
            size={4}
        />
        ));

    const handleSubmit = async(e) =>{
        let passCheck = (password === pass) && number(password) && letter(password) && upperCaseLetter(password) && specialCharacter(password) && length(password)

        const docRef = doc(db, 'users', e.userName)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            console.log("Exists")
            showNotification({
                title: "Username is already taken",
                message: "Wait? there's two of you?!",
                icon: '😳',
                color: 'red'
            })
            return
        }else{
            if(passCheck){
                createUserWithEmailAndPassword(auth, e.email, password)
                    .then((userCredentials)=>{
                        const user = userCredentials.user
                        setDoc(doc(db, "users", e.userName), {
                            uid: user.uid,
                            userName: e.userName,
                            firstName: e.firstName,
                            lastName: e.lastName,
                            age: e.age,
                            gender: e.gender,
                            email: e.email
                        }).then(
                            updateCurrentUser({
                            displayName: e.userName
                        }))
                    }).catch(error=>{
                        switch(error.code){
                        case 'auth/email-already-in-use' :
                            showNotification({
                                title: "Email Already in use",
                                message: "Please use a different email adress",
                                icon: <X/>,
                                color: 'red'
                            })
                        }
                        return
                    })
                    form.reset()
                    showNotification({
                        title: "User created succesfully",
                        message: "Welcome on board",
                        icon: <Check/>,
                        color: 'green'
                    })
                console.log(auth.currentUser)
                    setTimeout(()=>{
                        navigate('/')
                    },[2500])

            }else if(password != pass){
                showNotification({
                    title: "Passwords dont match",
                    message: "Please confirm your password",
                    icon: <X/>,
                    color: 'red'
                })
            }
        }

    }

    return <div className="Register">
             <NotificationsProvider>
             {/* Title */}
                <form onSubmit={form.onSubmit((values)=>handleSubmit(values))}>
                    <TextInput {...form.getInputProps('userName')} label="Username" classNames={classes} required name="userName" type="text" placeholder="Username" />
                    <TextInput {...form.getInputProps('firstName')} label="First Name" classNames={classes} required name="firstName" type="text" placeholder="Firstname" />
                    <TextInput {...form.getInputProps('lastName')} label="Last Name" classNames={classes} required name="lastname" type="text" placeholder="Lastname" />
                    <NumberInput {...form.getInputProps('age')} label="Age" min="18" classNames={classes} required name="age" type="number" placeholder="Age" />
                    <Select {...form.getInputProps('gender')} label="Gender" classNames={classes} placeholder='Please choose a gender' data={['Male', 'Female', 'Other']} />
                    <TextInput {...form.getInputProps('email')} label="E-mail" classNames={classes} required name="E-Mail" type="email" placeholder="E-Mail" />
                    <Group spacing={5} grow mt="xs" mb="md">
                        {bars}
                    </Group>

                    <PasswordInput
                    value={password}
                    {...form.getInputProps(password)}
                    onChange={setPassword}
                    placeholder="Your password"
                    classNames={classes}
                    className="full"
                    required
                    />

                    <PasswordInput
                    value={pass}
                    {...form.getInputProps(pass)}
                    onChange={setPass}
                    placeholder="Confirm your password"
                    classNames={classes}
                    className="full"
                    required
                    />
                    <PasswordRequirement label="Same password" meets={(password == pass)} />
                    {checks}

                    <Button type="submit">Register</Button>
                </form>
             </NotificationsProvider>
            </div>
}

export default Register
