// Selecting necessary elements from the DOM
const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.reset-btn');
const gameBoard = document.querySelector('.game-board');
const messageContainer = document.querySelector('.message-container');

// Initializing game state variables
let playerOneTurn = true; // Indicates if it's player one's turn
let movesCount = 0; // Tracks the number of moves made

// Define winning patterns for the game
const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Event listener for the reset button
resetBtn.addEventListener('click', resetGame);

// Event listener for moves on the gameboard
gameBoard.addEventListener('click', (event) => {
    let cell = event.target;

    // If the clicked element is not a cell, return early
    if(cell.classList[0] === 'game-board'){
        return;
    }

    // Set the content of the cell based on the current player's turn
    cell.textContent = playerOneTurn ? 'X' : 'O';
    playerOneTurn = !playerOneTurn;

    if (cell.textContent === 'X') {
        cell.classList.add('cell-x');
    }

    // Disable further selection of this cell
    cell.style.userSelect = 'none';
    cell.disabled = true;

    movesCount++;

    // Check for win or draw and display appropriate message
    const result = checkWin();
    if (result || movesCount === 9) {
        displayResult(result ? `Player ${result} Wins!` : 'Draw!');
    }
})

function checkWin() {
    for (let winningPattern of winningPatterns) {
        // Defines each winning pattern
        let firstPositionValue = cells[winningPattern[0]].textContent;
        let secondPositionValue = cells[winningPattern[1]].textContent;
        let thirdPositionValue = cells[winningPattern[2]].textContent;

        // If all positions in the pattern have the same value and are not empty, the winning pattern is found
        if (firstPositionValue !== '' && secondPositionValue !== '' && thirdPositionValue !== '') {
            if (firstPositionValue === secondPositionValue && secondPositionValue === thirdPositionValue) {
                return firstPositionValue;
            }
        }
    }
    return false;
}

function displayResult(result) {
    // Display message
    messageContainer.style.display = 'flex';
    messageContainer.children[0].textContent = result;

    // Disable further selection of the game board
    gameBoard.style.pointerEvents = "none";
}

function resetGame() {
    // Reset each cell
    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('cell-x');
    })
    messageContainer.style.display = 'none';

    // Enable selection of the game board
    gameBoard.style.pointerEvents = "initial";

    movesCount = 0;
    playerOneTurn = true;
}