import { addDoc, collection } from 'firebase/firestore'
import db from '../firebase/firebaseConfig';
function Chatinput(){

    // const sendMessage = (message, sender, receiver) =>{
    //     const docRef = addDoc(collection(db, 'messages'), {
    //         message: e.target[0].value,
    //         sender: e.target[1].value,
    //         receiver: e.target[2].value,
    //     })
    // }

	return <div className="Chatinput">
             <form>
               <input type="text"  />
             </form>
		   </div>
}

export default Chatinput
