import React, { useState, useEffect } from 'react'
import Cards from './Cards'
import { v4 as uuid } from 'uuid'

function PlayerHand(props){
  const [num, setNum] = useState(props.num);
  const [loaded, setLoaded] = useState(false);


  console.log(num)

  const randomGen = (num) =>{
    return Math.floor(Math.random() * num);
  }

  const playCard = (card) => {
    setNum(old=>setNum(...old, old.pop()))
  }

  return <div className="PlayerHand">
           {
             num.map(i=>{
               return <Cards key={uuid()} color={randomGen(4)} value={randomGen(25)}/>
             })
           }
		 </div>
}
export default PlayerHand
