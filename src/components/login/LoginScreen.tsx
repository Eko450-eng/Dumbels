import { Button, Group, PasswordInput, TextInput, useInputProps } from "@mantine/core"
import { signInWithEmailAndPassword } from "firebase/auth"
import { NotificationsProvider, showNotification } from '@mantine/notifications'
import { auth } from "../../firebase/firebaseConfig"
import { useForm } from '@mantine/form'
import { AlertCircle, Check } from 'tabler-icons-react'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'


function LoginScreen(){

	const navigate = useNavigate()

	const authenticate = auth
	const [ user, setUser ]:any = useState()

	interface userLogin {
		email: string,
		password: string,
	}

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		}
	})


	const handleLogin = async(values: userLogin) => {
		signInWithEmailAndPassword(authenticate, values.email, values.password)
			.then((userCredentials)=>{
				setUser(userCredentials.user)
				showNotification({
					title: "Logged in successfully",
					message: `Welcome back `,
					icon: <Check/>,
					color: "green"
				})

				setTimeout(()=>{
					navigate('/')
				},1000)

				form.reset()
			})
			.catch((error)=>{
			console.log(error.message)
			showNotification({
				title: `Please try again `,
				message: "EMail and Password combination not registered",
				icon: <AlertCircle/>,
				color: "red"
			})

			})
	}

	useEffect(()=>{
		console.log(user)
	},[user])


	return <div className="LoginScreen">
			<NotificationsProvider>
			<form onSubmit={form.onSubmit(values => handleLogin(values))}>
				<TextInput
					{...form.getInputProps('email')}
					label="Email"
					required
					name="email"
					type="text"
					placeholder="E-Mail"
					mt="md"
				/>

				<PasswordInput
					{...form.getInputProps("password")}
					placeholder="Your password"
					className="full"
					required
				/>

				<Group>
					<Button type="submit">Login</Button>
				</Group>
			</form>

			</NotificationsProvider>
		</div>
}
export default LoginScreen
