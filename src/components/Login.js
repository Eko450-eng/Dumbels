import { Button, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useInputState } from '@mantine/hooks'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import useStyles from './chatComponents/Styles'
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'

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

    const handleSubmit = (e) =>{
      signInWithEmailAndPassword(auth, e.email, e.password)
        .then((uc)=>{
          const user = uc.user
          setTimeout(()=>{
            navigate('/')
          },[1000])
        })
        showNotification({
          title: "Logged in successfully",
          message: `Welcome back `
        })
      navigate('/')
    }

  return <div className="Login">
           <NotificationsProvider>
            <form onSubmit={handleSubmit}>
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
