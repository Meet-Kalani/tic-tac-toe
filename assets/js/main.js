const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector(".reset-btn");
const gameBoard = document.querySelector(".game-board");
const messageContainer = document.querySelector(".message-container");

let isPlayerOneTurn = true;
let movesCount = 0;

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

resetBtn.addEventListener("click", resetGame);

gameBoard.addEventListener("click", (event) => {
  let clickedCell = event.target;

  // If the clicked element is not a cell, return early
  if (clickedCell.classList.contains("game-board")) {
    return;
  }

  // Set the content of the cell based on the current player's turn
  const clickedCellValue = isPlayerOneTurn ? "X" : "O";
  isPlayerOneTurn = !isPlayerOneTurn;

  if (clickedCellValue === "X") {
    clickedCell.classList.add("cell-x");
  }

  clickedCell.textContent = clickedCellValue;

  // Disable further selection of this cell
  clickedCell.style.userSelect = "none";
  clickedCell.disabled = true;

  movesCount++;

  // Check for win or draw and display appropriate message
  // Checking win condition after 4 moves before that there is no possibilty of winnning
  if (movesCount > 4) {
    const result = checkWin(clickedCell);
    if (result || movesCount === 9) {
      displayResult(result ? `Player ${result} Wins!` : "Draw!");
    }
  }
});

function checkWin(clickedCell) {
  const clickedCellIndex = Array.from(gameBoard.children).indexOf(clickedCell);

  for (let winningPattern of winningPatterns) {
    if (winningPattern.includes(clickedCellIndex)) {
      let firstPositionValue = cells[winningPattern[0]].textContent;
      let secondPositionValue = cells[winningPattern[1]].textContent;
      let thirdPositionValue = cells[winningPattern[2]].textContent;

      // If all positions in the pattern have the same value and are not empty, the winning pattern is found
      if (
        firstPositionValue !== "" &&
        secondPositionValue !== "" &&
        thirdPositionValue !== ""
      ) {
        if (
          firstPositionValue === secondPositionValue &&
          secondPositionValue === thirdPositionValue
        ) {
          return firstPositionValue;
        }
      }
    }
  }
  return false;
}

function displayResult(result) {
  messageContainer.classList.remove("d-none");
  messageContainer.classList.add("d-flex");
  messageContainer.children[0].textContent = result;

  // Disable further selection of the game board
  gameBoard.style.pointerEvents = "none";
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("cell-x");
  });
  messageContainer.classList.remove("d-flex");
  messageContainer.classList.add("d-none");

  // Enable selection of the game board
  gameBoard.style.pointerEvents = "initial";

  movesCount = 0;
  isPlayerOneTurn = true;
}
