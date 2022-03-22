import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { collection, onSnapshot, query } from 'firebase/firestore'
import db from './firebase/firebaseConfig'

function Welcome(){
  const navigate = useNavigate()
  const [ users, setUsers ] = useState([])

  // Gets live list of users
  const getUsers = async() =>{
    const q = query(collection(db, 'users'))
    const unsubscribe = onSnapshot(q, (qs) => {
      setUsers([])
      qs.forEach((doc)=>{
        setUsers(old=>[...old, doc.data()])
      })
    })
  }

  useEffect(()=>{
    getUsers()
  },[])

  return <div className="Welcome">
		   <h1>Dumbels</h1>
           <button className="btn_invisible" onClick={()=>{
             navigate('/register')
           }}>Register</button>
           <button className="btn_invisible" onClick={()=>{
             navigate('/login')
           }}>Login</button>
           {
             users.map(u=>{
               return <p key={uuid()}>{u.userName}</p>
             })
           }
		 </div>
}
export default Welcome
