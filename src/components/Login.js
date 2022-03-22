import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { useEffect } from 'react'
import bcrypt from 'bcryptjs'
import db from './firebase/firebaseConfig'

function Login(){

  const loginVerify = async(name, pass) => {
    const usersRef = collection(db, "users")
    const q = query(usersRef, where('userName',"==",name))
    const qs =  await getDocs(q)
    if(qs.size > 0){
        qs.forEach((doc)=>{
          let u = doc.data()
          bcrypt.compare(pass, u.password, function(err, res){
            if(res){
              return res
            }
            console.log("Error", err)
          })
        })
    }else{
      console.log("User not found")
    }
  }

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const verify = await loginVerify(e.target[0].value, e.target[1].value)
    // if(loginVerify(e.target[0].value, e.target[1].value)){
    //   console.log("Logged in")
    // }else {
    //   console.log("Failed")
    // }
  }

  return <div className="Login">
		   <form onSubmit={handleSubmit}>
             <label htmlFor="userName">Username</label>
             <input required className="inputField" name="userName" type="text"/>
             <label htmlFor="password">Password</label>
             <input required className="inputField" name="password" type="password"/>
             <input className="btn" type="submit" value="Login"/>
           </form>
		 </div>
}
export default Login
