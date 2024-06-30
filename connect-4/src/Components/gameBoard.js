import React, { useEffect, useState } from "react";
import GameCircle from "./gameCircle";
import '../Game.css';
import Header from "./header";
import Footer from "./footer";
import { getComputerMove, isWinner } from "../helper";

// Define constants
const NO_PLAYER = 0;
const PLAYER_1 = 1;
const PLAYER_2 = 2;
const NO_CIRCLES = 16;
const GAME_STATE_IDLE = 0;
const GAME_STATE_PLAYING = 1;
const GAME_STATE_WIN = 2;
const GAME_STATE_DRAW = 3;

const GameBoard = () => {
    // Initialize state
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING);
    const [winPlayer, setWinPlayer] = useState();

    // Initialize game on component mount
    useEffect(() => {
        initGame();
    }, []);

    // Initialize the game
    const initGame = () => {
        setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER));
        setCurrentPlayer(PLAYER_1);
        setGameState(GAME_STATE_PLAYING);
        setWinPlayer(null);
    };

    const suggestMove = () => {
        const move = getComputerMove(gameBoard);
        if (move !== null) {
            circleClicked(move);
        }
    };

    // Handle circle click
    const circleClicked = (id) => {
        if (gameBoard[id] !== NO_PLAYER || gameState !== GAME_STATE_PLAYING) return;

        // Update the game board
        setGameBoard(prev => {
            const newBoard = prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            });

            if (isWinner(newBoard, id, currentPlayer)) {
                setGameState(GAME_STATE_WIN);
                setWinPlayer(currentPlayer);
            } else if (isDraw(newBoard)) {
                setGameState(GAME_STATE_DRAW);
                setWinPlayer(NO_PLAYER);
            } else {
                setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
            }

            return newBoard;
        });
    };

    // Check for a draw
    const isDraw = (board) => {
        return board.every(cell => cell !== NO_PLAYER);
    };

    // Render the game board
    const initBoard = () => {
        const circles = [];
        for (let i = 0; i < NO_CIRCLES; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    };

    // Render a single circle
    const renderCircle = (id) => {
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={() => circleClicked(id)} />;
    };

    return (
        <>
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />
            <div className="gameBoard">
                {initBoard()}
            </div>
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove}  gameState={gameState} />
        </>
    );
}

export default GameBoard;
