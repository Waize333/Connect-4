import React,{useState} from "react";
import GameCircle from "./gameCircle";
import '../Game.css';

const NO_PLAYER = 0;
const PLAYER_1 = 1;
const PLAYER_2 =2;

const GameBoard = () => {
    const [gameBoard,setGameBoard] = useState(Array(16).fill(NO_PLAYER))
    const [currentPlayer,setCurrentPlayer] = useState(PLAYER_1)
    const circleClicked=(id)=>{
        console.log('circle clicked'+id);
        const board=[...gameBoard];
        board[id] = currentPlayer;
        setGameBoard(board);

        setCurrentPlayer(currentPlayer == PLAYER_1?PLAYER_2:PLAYER_1)
    }
    const renderCircle=id=>{
        return   <GameCircle id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}></GameCircle>
    }
    return (
        <div className="gameBoard">
           {renderCircle(0)}
           {renderCircle(1)}
           {renderCircle(2)}
           {renderCircle(3)}
           {renderCircle(4)}
           {renderCircle(5)}
           {renderCircle(6)}
           {renderCircle(7)}
        </div>
    );
}

export default GameBoard;
