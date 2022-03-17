import { useNavigate } from 'react-router-dom'

function Welcome(){
  const navigate = useNavigate()

  return <div className="Welcome">
		   <h1>Dumbels</h1>
           <button className="btn_invisible" onClick={()=>{
             navigate('/register')
           }}>Register</button>
           <button className="btn_invisible" onClick={()=>{
             navigate('/login')
           }}>Login</button>
		 </div>
}
export default Welcome
