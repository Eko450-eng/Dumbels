import { Button, TextInput } from "@mantine/core"
function Chatinput(){
	return <form className="Chatinput">
            <TextInput className="messageBox" type="text" name="message" autoFocus="true" required="true" placeholder="Message..." maxLength={100} />
            <Button>Send</Button>
		   </form>
}
export default Chatinput
