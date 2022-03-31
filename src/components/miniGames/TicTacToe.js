import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client'
import '../../styles/main.css';

function TicTacToe(){
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();
    const [warning , setWarning] = useState(false);
    const [warningMessage , setWarningMessage] = useState('');
    const [players, setPlayers] = useState([])
    const [myId, setMyId] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState('');
    const [myRole, setMyRole] = useState('');

    // useEffect(() => {
    //     socket.on("players", (players)=>setPlayers(players))
    //     socket.on('myId', (id)=>setMyId(id))
    // }, []);
    // socket.on('currentPlayer', (player)=>{
    //     setCurrentPlayer(player)
    // })
    // socket.on('roleAssigned', (role)=>setMyRole(role))

    const checkForWinner = (squares) => {
        let combos = {
            across: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            down: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagnol: [
                [0, 4, 8],
                [2, 4, 6],
            ],
        };

        for (let combo in combos) {
            combos[combo].forEach((pattern) => {
                if (
                    (squares[pattern[0]] === '') ||
                    (squares[pattern[1]] === '') ||
                    (squares[pattern[2]] === '')
                ){
                    // do nothing
                } else if (
                    (squares[pattern[0]] === squares[pattern[1]]) &&
                    (squares[pattern[1]] === squares[pattern[2]])
                ){
                    setWinner(squares[pattern[0]]);
                }
            });
        }
    };

    const handleBoxes = (num, player) =>{
        if (cells[num] !== '') {
            setWarning(true);
            setWarningMessage("Already clicked");
            setTimeout(() => {
                setWarning(false)
                setWarningMessage("");
            }, 2000);
            return;
        }

        let squares = [...cells];
        squares[num] = player;
        checkForWinner(squares);
        setCells(squares);
    }

    const handleClick = (num) => {
        if(myId === currentPlayer){
            // socket.emit("nextTurn", myId)
            // socket.emit("clickedOn", [num, myId])

            handleBoxes(num, myRole)
        }else{
            setWarning(true);
            setWarningMessage("It's not your turn");
            setTimeout(() => {
                setWarning(false)
                setWarningMessage("");
            }, 2000);
        }
    };

    // socket.on("clickedOnThis",(num)=>{
    //     let enemyRole = myRole == "x" ? "o" : "x"
    //     handleBoxes(num, enemyRole)
    // })

    const handleRestart = () => {
        setWinner(null);
        setCells(Array(9).fill(''));
    };
   
    const Cell = ({ num }) => {
        return <td onClick={() => handleClick(num)}>{cells[num]}</td>;
    };

    return (
        <div className='container'>
            <table>
                <tbody>
                    <tr>
                        <Cell num={0} />
                        <Cell num={1} />
                        <Cell num={2} />
                    </tr>
                    <tr>
                        <Cell num={3} />
                        <Cell num={4} />
                        <Cell num={5} />
                    </tr>
                    <tr>
                        <Cell num={6} />
                        <Cell num={7} />
                        <Cell num={8} />
                    </tr>
                </tbody>
            </table>
            {winner &&
            <p>{winner} is the winner!</p>
            }
            {
                warning && <p>{warningMessage}</p>
            }
            <button onClick={() => handleRestart()}>Play Again</button>
          <p>PlayerX: {players[0]}</p>
          <p>PlayerO: {players[1]}</p>
          <p>MyID: {myId}</p>
          <p>MyRole: {myRole}</p>
        </div>
    )
}

export default TicTacToe;
