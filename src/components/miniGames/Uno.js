import React, { useState, useEffect } from 'react'
import PlayerHand from './unoUtils/PlayerHand'
import DrawCard from './unoUtils/DrawCard'
import Cards from './unoUtils/Cards'
import { socket as io } from '../../App'
//Uno Button (Optional)

function Uno(props){
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true);
    const randomGen = (num) =>{
        return Math.floor(Math.random() * num);
    }

    useEffect(()=>{
        io.on("joinMsg",(v)=>setMessage(v))
        io.on("fullyConnected",(d)=>setLoading(!d))
    },[])

    const [ placedCard, setPlacedCard ] = useState([randomGen(4),randomGen(25)])
    const [ playerHand, setPlayerHand ] = useState([0,0,0,0,0,0,0])
    const [ enemyHand, setEnemyHand ] = useState([0,0,0,0,0,0,0])


    return <div className="Uno">
                <p>{message}</p>
             {
                 !loading && <div>
                    <PlayerHand num={enemyHand} />
                    {/* <DrawCard /> */}
                    <Cards color={placedCard[0]} value={placedCard[1]}/>
                    <PlayerHand num={playerHand}  />
                </div>
             }
            </div>
}

export default Uno
