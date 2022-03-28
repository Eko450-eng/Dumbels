import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'
import '../../styles/main.css';
const socket = io('http://127.0.0.1:3001')

function TicTacToe(){
    const [turn, setTurn] = useState('');
    const [cells, setCells] = useState(Array(9).fill(''));
    const [winner, setWinner] = useState();
    const [clicked , setClicked] = useState(false);
    const [players, setPlayers] = useState([])
    const [myId, setMyId] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState('');

    useEffect(() => {
        socket.on("players", (players)=>setPlayers(players))
        socket.on('myId', (id)=>setMyId(id))
    }, []);
    socket.on('currentPlayer', (player)=>{
        setCurrentPlayer(player)
    })

    useEffect(() => {
        console.log("Current",currentPlayer)
    }, [currentPlayer]);

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

    const handleClick = (num) => {
        if(myId === currentPlayer){
            socket.emit("nextTurn", myId)
            if (cells[num] !== '') {
                setClicked(true);
                setTimeout(() => {
                    setClicked(false)
                }, 2000);
                return;
            }
    
            let squares = [...cells];
    
            if (turn === 'x') {
                squares[num] = 'x';
                setTurn('o');
            } else {
                squares[num] = 'o';
                setTurn('x');
            }
    
            checkForWinner(squares);
            setCells(squares);
        }else{
            console.log("Not your turn")
        }
    };

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
                Turn: {turn}
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
                        <Cell num={8} />
                        <Cell num={6} />
                        <Cell num={7} />
                    </tr>
                </tbody>
            </table>
            {winner &&
            <p>{winner} is the winner!</p>
            }
            {
                clicked && <p>allReadyClicked</p>
            }
            <button onClick={() => handleRestart()}>Play Again</button>
          <p>PlayerX: {players[0]}</p>
          <p>PlayerO: {players[1]}</p>
          <p>MyID: {myId}</p>
          <p>Turn: {turn}</p>
        </div>
    )
}

export default TicTacToe;
