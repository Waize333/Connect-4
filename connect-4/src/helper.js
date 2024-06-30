export const isWinner = (gameBoard, currentMove, currentPlayer) => {
    let board = [...gameBoard];
    board[currentMove] = currentPlayer;

    const winLines = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12]
    ];

    for (let i = 0; i < winLines.length; i++) {
        const [c1, c2, c3, c4] = winLines[i];
        if (board[c1] > 0 &&
            board[c1] === board[c2] &&
            board[c2] === board[c3] &&
            board[c3] === board[c4]) {
            return true;
        }
    }
    return false;
}

export const isDraw = (gameBoard) => {
    return gameBoard.every(cell => cell !== 0);
}

const getRandomComputerMove = (gameBoard) => {
    let validMoves = [];
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] === 0) {
            validMoves.push(i);
        }
    }
    if (validMoves.length === 0) return null;
    let rndMove = validMoves[Math.floor(Math.random() * validMoves.length)];
    return rndMove;
}

const getPosition = (gameBoard, moveChecks) => {
    for (let check = 0; check < moveChecks.length; check++) {
        for (let i = 0; i < moveChecks[check].max; i += moveChecks[check].step) {
            let series = gameBoard[i + moveChecks[check].indexes[0]].toString() +
                         gameBoard[i + moveChecks[check].indexes[1]].toString() +
                         gameBoard[i + moveChecks[check].indexes[2]].toString() +
                         gameBoard[i + moveChecks[check].indexes[3]].toString();

            switch(series) {
                case "1110":
                case "2220":
                    return i + moveChecks[check].indexes[3];
                case "1100":
                case "2200":
                    return i + moveChecks[check].indexes[2];
                case "1000":
                case "2000":
                    return i + moveChecks[check].indexes[1];
                case "0000":
                case "0000":
                    return i + moveChecks[check].indexes[0];
            }
        }
    }
    return -1;
}

export const getComputerMove = (gameBoard) => {
    let moveChecks = [
        // Vertical
        {
            indexes: [0, 4, 8, 12],
            max: 4,
            step: 1
        },
        // Horizontal
        {
            indexes: [0, 1, 2, 3],
            max: 16,
            step: 4
        },
        // Diagonal
        {
            indexes: [0, 5, 10, 15],
            max: 16,
            step: 16
        },
        {
            indexes: [3, 6, 9, 12],
            max: 16,
            step: 16
        }
    ];
    let position = getPosition(gameBoard, moveChecks);
    if (position > -1) return position;
    return getRandomComputerMove(gameBoard);
}
