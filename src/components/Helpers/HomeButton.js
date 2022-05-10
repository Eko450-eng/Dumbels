import { useNavigate } from 'react-router-dom'
import { Button, createStyles } from '@mantine/core'
import { Home } from 'tabler-icons-react';
import useStyles from '../Styles'

function HomeButton(){
    const navigate = useNavigate('/')
    const { classes } = useStyles()

	return <div className={classes.container}>
               <Button onClick={()=>{
                   navigate('/')
               }} color="violet" radius="md" className={classes.rightBound} variant='subtle' compact uppercase><Home/>HOME</Button>
		   </div>
}
export default HomeButton
