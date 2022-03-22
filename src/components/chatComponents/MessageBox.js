function MessageBox(){

  const message = {
    Eko: "Test",
    Eko: "Test",
    Eko: "Test",
    Eko: "Test",
    Eko: "Test",
    Eko: "Test",
  }

  return <div className="MessageBox">
           <h1>Messages</h1>
           {
             Object.keys(message).forEach((key)=>{
               return <p>{key}</p>
             })
           }
		 </div>
}
export default MessageBox
