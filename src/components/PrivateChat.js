
	return <div className="ChatScreen">
             <Group className={classes.container}>
               <Button onClick={()=>loadMore()} variant="subtle" radius="xl" size="xs">Load More</Button>
             </Group>
             <div className='reverseOrder'>
            {
                messages.map(m=>{
                    return <MessageBox
                             key={uuid()}
                             userName={userName}
                             sender={m.sender}
                             message={m.message}
                             day={m.day}
                             month={m.month}
                             year={m.year}
                             hour={m.hour}
                             minutes={m.minutes}
                           />
                })
            }
             </div>
            <Chatinput />
            <HomeButton/>
		   </div>
}
export default PrivateChat
