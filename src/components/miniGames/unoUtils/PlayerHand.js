import React, { useState, useEffect } from 'react'
import Cards from './Cards'
import { v4 as uuid } from 'uuid'

function PlayerHand(props){
  const [num, setNum] = useState(props.num);

  const randomGen = (num) =>{
    return Math.floor(Math.random() * num);
  }

  const playCard = (card) => {
    setNum(old=>setNum(...old, old.pop()))
  }

    return <div className="PlayerHand">
           {
             num.map(i=>{
                 const thisColor = randomGen(4)
                 const thisValue = randomGen(25)

                 return <Cards key={uuid()} color={thisColor} value={thisValue}/>
             })
           }
        </div>
}
export default PlayerHand
