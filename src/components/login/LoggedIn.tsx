import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase/firebaseConfig"

function LoggedIn(){
	onAuthStateChanged(auth, (user)=> {
		if(user){
			console.log(user)
		}else{
			console.log("Failed")
		}
	})

	return <div className="LoggedIn">

		</div>
}
export default LoggedIn
