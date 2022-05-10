import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useInputState } from '@mantine/hooks'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import useStyles from './chatComponents/Styles'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'
import { AlertCircle, Check } from 'tabler-icons-react'

function Login(){
    const [ password, setPassword ] = useInputState('')
    const auth = getAuth()
    const navigate = useNavigate()
    const { classes } = useStyles();

    const form = useForm({
        initialValues:{
            email: "",
            password: "",
        }
    })

    const handleSubmit = async(e) =>{
      console.log(password)
      signInWithEmailAndPassword(auth, e.email, password)
        .then((uc)=>{
          const user = uc.user
          console.log(user)
          showNotification({
            title: "Logged in successfully",
            message: `Welcome back `,
            icon: <Check/>,
            color: "green"
          })
          setTimeout(()=>{
            navigate('/')
          },[1000])
        })
        .catch(e=>{
          console.log(e.message)
          showNotification({
            title: `Please try again `,
            message: "EMail and Password combination not registered",
            icon: <AlertCircle/>,
            color: "red"
          })
        })
      form.reset()
    }

  return <div className="Login">
           <NotificationsProvider>
             <form onSubmit={form.onSubmit(values=>handleSubmit(values))}>
                  <TextInput
                    {...form.getInputProps('email')}
                    label="Email"
                    classNames={classes}
                    required
                    name="email"
                    type="text"
                    placeholder="E-Mail"
                    mt="md"
                  />

                  <PasswordInput
                    value={password}
                    {...form.getInputProps(password)}
                    onChange={setPassword}
                    placeholder="Your password"
                    classNames={classes}
                    className="full"
                    required
                  />

              <Button type="submit">Login</Button>
            </form>
           </NotificationsProvider>
		 </div>
}
export default Login
