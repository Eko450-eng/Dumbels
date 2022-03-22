import { addDoc, collection } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import db from './firebase/firebaseConfig'
import bcrypt from 'bcryptjs'

function Register(){
  const navigate = useNavigate()
  // Check if user already exists
  // Autologin

  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(e.target[6].value === e.target[7].value){

      const pw = await bcrypt.hash(e.target[6].value, 10)
        const docRef = addDoc(collection(db, 'users'), {
            userName: e.target[0].value,
            firstName: e.target[1].value,
            lastName: e.target[2].value,
            age: e.target[3].value,
            gender: e.target[4].value,
            email: e.target[5].value,
            password: pw,
        })
      navigate('/')
    }else{
      console.log("Idiot type the same shit")
    }
  }

  return <div className="Register">
		   <form onSubmit={handleSubmit}>
             <label htmlFor="userName">Username</label>
             <input className="inputField" required name="userName" type="text" placeholder="Username" />

             <label htmlFor="firstName">Firstname</label>
             <input className="inputField" required name="firstName" type="text" placeholder="Firstname" />

             <label htmlFor="lastname">Last name</label>
             <input className="inputField" required name="lastname" type="text" placeholder="Lastname" />

             <label htmlFor="age">Age</label>
             <input min="18" className="inputField" required name="age" type="number" placeholder="Age" />

             <label htmlFor="gender">Gender</label>
             <select name="gender">
               <option value="male">Male</option>
               <option value="female">Female</option>
               <option value="other">Other</option>
             </select>

             <label htmlFor="E-Mail">E-Mail</label>
             <input className="inputField" required name="E-Mail" type="email" placeholder="E-Mail" />

             <label htmlFor="password">Password</label>
             <input pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" className="inputField" required name="password" type="password" placeholder="Password" />
             <ul className="passWordInfoBox">
               Must contain
               <li>A lowercase letter</li>
               <li>A capital letter</li>
               <li>A number</li>
               <li>At least 8 characters</li>
             </ul>

             <label htmlFor="cpassword">Confirm Password</label>
             <input className="inputField" required name="cpassword" type="password" placeholder="Confirm Password" />

             <input className="btn" type="submit" value="Register"/>
           </form>
		 </div>
}
export default Register
