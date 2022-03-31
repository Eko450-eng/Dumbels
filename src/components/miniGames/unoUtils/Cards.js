import React, { useEffect, useState } from 'react'
function Cards(props){
    const colors = ['red', 'green', 'yellow', 'blue'] // 0-3
    const values = ["zero","one","two","three","four","five","six","seven","eight","nine","zero","one","two","three","four","five","six","seven","eight","nine",'skip','reverse','drawTwo','drawFour','wild'] // 0-24
    const checkForWilds = props.value == 13 || props.value == 14
    const finalValue = values[props.value]


    return(
        <div  className={`cards ${colors[props.color]}`}>
          <div className={`cardValue ${ finalValue }`}></div>
        </div>
    )
}
export default Cards
