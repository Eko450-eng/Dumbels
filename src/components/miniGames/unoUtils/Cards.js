function Cards(props){
    const colors = ['red', 'green', 'yellow', 'blue'] // 0-3
    const values = [0,1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,'skip','reverse','drawTwo','drawFour','wild'] // 0-24
    const checkForWilds = props.value == 13 || props.value == 14
    const finalValue = values[props.value]

    return(
        <div className={`cards ${!checkForWilds ? colors[props.color] : "black"}`}>
            {finalValue}
        </div>
    )
}
export default Cards
