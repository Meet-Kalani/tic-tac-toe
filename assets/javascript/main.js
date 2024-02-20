// make draw funciton and handle it properly
const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.reset-btn');
const gameBoard = document.querySelector('.game-board');
const winnerMsgContainer = document.querySelector('.winner-msg-container');

let playerOneTurn = false;

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

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (playerOneTurn) {
            cell.textContent = '0';
            playerOneTurn = !playerOneTurn;
        } else {
            cell.textContent = 'X';
            playerOneTurn = !playerOneTurn;
        }

        cell.disabled = true;

        if (isSomeoneWinning()) {
            gameBoard.style.pointerEvents = "none";
        } 
    })
})

function isSomeoneWinning() {
    for (let winningPattern of winningPatterns) {

        let firstPositionValue = cells[winningPattern[0]].textContent;
        let secondPositionValue = cells[winningPattern[1]].textContent;
        let thirdPositionValue = cells[winningPattern[2]].textContent;

        if (firstPositionValue !== '' && secondPositionValue !== '' && thirdPositionValue !== '') {
            if (firstPositionValue === secondPositionValue && secondPositionValue === thirdPositionValue) {
                winnerMsgContainer.style.display = 'flex';
                winnerMsgContainer.children[0].textContent = `Player ${firstPositionValue} Wins!`
                return true;
            }
        }
    }
    return false;
}

resetBtn.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
    })
    winnerMsgContainer.style.display = 'none';
    gameBoard.style.pointerEvents = "initial";
})



// gameBoard.addEventListener('click', (event) => {
//     const selectedCell = event.target;

//     if (playerOneTurn) {
//         selectedCell.textContent = '0';
//         playerOneTurn = !playerOneTurn;
//     } else {
//         selectedCell.textContent = 'X';
//         playerOneTurn = !playerOneTurn;
//     }

//     selectedCell.disabled = true;

//     if(isSomeoneWinning()){
//         gameBoard.style.pointerEvents = "none";
//     }
// })