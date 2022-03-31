import Chatinput from './chatComponents/Chatinput';
import MessageBox from './chatComponents/MessageBox';

function Chatscreen(){
	return <div className="Chatscreen">
			 <MessageBox />
             <Chatinput />
		   </div>
}
export default Chatscreen
