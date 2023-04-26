const cells = document.querySelectorAll(".cell");
const restart = document.getElementById("restart");
const player = 1;
const bot = 2;
const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let gameOver = false; // Flag to indicate if the game is over

// Game Logic for Bot
const makeBotMove = (board) => {
    if (gameOver) {
        return; // Return early if the game is already over
    }

    let availableMoves = [];

    
    for (let i = 0; i < board.length; i++) {
        if (board[i] === 0) {
            availableMoves.push(i);
        }
    }
    if (availableMoves.length === 0) {
        checkForWin(bot, player, board);
    }
    if (!board.includes(0)) {
        return false
    }
    let move =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[move] = 2;
    cells[move].classList.add("o");
};

//Check if either player matches a winning combo
const checkForWin = (bot, player, board) => {
    if (gameOver) {
        return; // Return early if the game is already over
    }
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Horizontal
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Vertical
        [0, 4, 8],
        [2, 4, 6], // Diagonal
    ];
    for (let i = 0; i < winningCombos.length; i++) {
        let combo = winningCombos[i];
        if (
            board[combo[0]] === player &&
            board[combo[1]] === player &&
            board[combo[2]] === player
        ) {
            return setTimeout(() => {
                alert("Player 1 wins!");
                restartGame();
            }, 500);
        }
        if (
            board[combo[0]] === bot &&
            board[combo[1]] === bot &&
            board[combo[2]] === bot
        ) {
            return setTimeout(() => {
                alert("Bot wins!");
                restartGame();
            }, 500);
        }
    }
    if (!board.includes(0)) {
        gameOver = true; // Update the flag to indicate game over
        setTimeout(() => {
            alert("Cats Game!");
            restartGame();
        }, 500);
    }
};
// Game Logic for Players
cells.forEach((cell) => {
    cell.addEventListener("click", function () {
        if(board[cell.id] === player) {
            return false
        }
        board[cell.id] = player
        cell.classList.add("x");
        //Cats game logic
        makeBotMove(board);
        checkForWin(bot, player, board);
    });
});

// Restart Game Logic
const restartGame = () => {
    gameOver = false; // Reset the flag
    board.forEach((cell, i) => {
        board[i] = 0;
    });
    cells.forEach((cell) => {
        cell.classList.remove("x");
        cell.classList.remove("o");
    });
};

// Restart Button
restart.addEventListener("click", function () {
    restartGame();
});
