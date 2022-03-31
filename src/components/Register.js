import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { Progress, Group, createStyles, Notification, PasswordInput, Select, TextInput, Box, Text, Center, Button, NumberInput } from '@mantine/core'
import { useForm, useInputState } from '@mantine/hooks';
import { Check, X } from 'tabler-icons-react';
import db from './firebase/firebaseConfig'
import bcrypt from 'bcryptjs'
import { useState } from 'react'

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        margin:'.5rem',
    },

    input: {
        height: 'auto',
        paddingTop: 18,
    },

    label: {
        position: 'absolute',
        pointerEvents: 'none',
        fontSize: theme.fontSizes.xs,
        paddingLeft: theme.spacing.sm,
        paddingTop: theme.spacing.sm / 2,
        zIndex: 1,
    },
}));


function Register(){
    const navigate = useNavigate()
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

    const [ success, setSuccess ] = useState(false)
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

    const { classes } = useStyles();

    const number = (v) => v.match(/[0-9]/)
    const letter = (v) => v.match(/[a-z]/)
    const upperCaseLetter = (v) => v.match(/[A-Z]/)
    const specialCharacter = (v) => v.match(/[$&+,:;=?@#|'<>.^*()%!-]/)
    const length = (v) => v.length > 7

    const handleSubmit = async(e) =>{
        if((password === pass) && number(password) && letter(password) && upperCaseLetter(password) && specialCharacter(password) && length(password)){

        const pw = await bcrypt.hash(password, 10)
            const docRef = addDoc(collection(db, 'users'), {
                userName: e.userName,
                firstName: e.firstName,
                lastName: e.lastName,
                age: e.age,
                gender: e.gender,
                email: e.email,
                password: pw,
            })
            console.log(docRef)
            setSuccess(true)
            setTimeout(()=>{
                setSuccess(false)
            },[2000])
        // navigate('/')
        }else{
            console.log("Not the same password")
        }
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


    return <div className="Register">
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

               <Notification className={`popup ${success ? 'popup_shown' : 'popup_hidden'}`} disallowClose icon={<Check size={20} />} color="green" title="Registration successfull">
                    Your account has been registered
                </Notification>

            </form>
            </div>
}
export default Register
