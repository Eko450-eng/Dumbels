import React, { useState } from 'react'
import PlayerHand from './unoUtils/PlayerHand'
import PlacedCard from './unoUtils/PlacedCard'
import DrawCard from './unoUtils/DrawCard'
import Cards from './unoUtils/Cards'
//Uno Button (Optional)

function Uno(){
  const randomGen = (num) =>{
    return Math.floor(Math.random() * num);
  }

  const [ placedCard, setPlacedCard ] = useState([randomGen(4),randomGen(25)])
  const [ playerHand, setPlayerHand ] = useState([0,0,0,0,0,0,0])
  const [ enemyHand, setEnemyHand ] = useState([0,0,0,0,0,0,0])

  return <div className="Uno">
           <PlayerHand num={enemyHand} />
           {/* <DrawCard /> */}
           <Cards color={placedCard[0]} value={placedCard[1]}/>
           <PlayerHand num={playerHand} />
		 </div>
}
export default Uno
