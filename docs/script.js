document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("gameBoard");
  initializeBoard(gameBoard);
  addClickEvents();
});

let currentPlayer = "black";
const boardSize = 8; // ボードのサイズ（8x8）

function initializeBoard(board) {
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    board.appendChild(cell);
  }
  // 初期配置のピースを設定
  setInitialDiscs(board);
}

function setInitialDiscs(board) {
  const middle = boardSize / 2;
  placeDisc(board.children[(middle - 1) * boardSize + (middle - 1)], "black");
  placeDisc(board.children[(middle - 1) * boardSize + middle], "white");
  placeDisc(board.children[middle * boardSize + (middle - 1)], "white");
  placeDisc(board.children[middle * boardSize + middle], "black");
}

function addClickEvents() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
  });
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index);
  if (!cell.hasChildNodes() && canPlaceDisc(index)) {
    placeDisc(cell, currentPlayer);
    flipDiscs(index);
    switchPlayer();
    updateScores();
  }
  // 既にディスクがある場合や挟めない場合は何もしない
}

function updateScores() {
  const discs = document.querySelectorAll(".disc");
  let blackCount = 0;
  let whiteCount = 0;
  discs.forEach((disc) => {
    if (disc.classList.contains("black")) blackCount++;
    if (disc.classList.contains("white")) whiteCount++;
  });
  // スコアを表示する要素を更新（または作成）
  const scoreBoard =
    document.getElementById("scoreBoard") || createScoreBoard();
  scoreBoard.textContent = `黒: ${blackCount}, 白: ${whiteCount}`;
}

function createScoreBoard() {
  const scoreBoard = document.createElement("div");
  scoreBoard.id = "scoreBoard";
  document.body.insertBefore(scoreBoard, document.getElementById("gameBoard"));
  return scoreBoard;
}

function placeDisc(cell, color) {
  const disc = document.createElement("div");
  disc.classList.add("disc", color);
  cell.appendChild(disc);
}

function switchPlayer() {
  currentPlayer = currentPlayer === "black" ? "white" : "black";
}

function canPlaceDisc(index) {
  if (getCellAtIndex(index).hasChildNodes()) return false; // 既に石がある場合は置けない

  const opponent = currentPlayer === "black" ? "white" : "black";
  const directions = [
    -1,
    +1,
    -boardSize,
    +boardSize,
    -boardSize - 1,
    -boardSize + 1,
    +boardSize - 1,
    +boardSize + 1
  ];

  return directions.some((direction) => {
    let currentIndex = index + direction;
    let currentCell = getCellAtIndex(currentIndex);
    if (!currentCell || !currentCell.hasChildNodes()) return false;

    let currentDisc = currentCell.firstChild;
    if (currentDisc.classList.contains(opponent)) {
      currentIndex += direction;
      currentCell = getCellAtIndex(currentIndex);
      while (currentCell && currentCell.hasChildNodes()) {
        currentDisc = currentCell.firstChild;
        if (currentDisc.classList.contains(currentPlayer)) {
          return true;
        } else if (currentDisc.classList.contains(opponent)) {
          currentIndex += direction;
          currentCell = getCellAtIndex(currentIndex);
        } else {
          break;
        }
      }
    }
    return false;
  });
}

function flipDiscs(index) {
  const directions = [
    -1,
    +1,
    -boardSize,
    +boardSize,
    -boardSize - 1,
    -boardSize + 1,
    +boardSize - 1,
    +boardSize + 1
  ];
  directions.forEach((direction) => {
    if (checkAndFlipInDirection(index, direction)) {
      let currentIndex = index + direction;
      let currentCell = getCellAtIndex(currentIndex);
      while (currentCell && currentCell.hasChildNodes()) {
        const disc = currentCell.firstChild;
        if (disc.classList.contains(currentPlayer)) break;
        flipDiscAt(currentIndex);
        currentIndex += direction;
        currentCell = getCellAtIndex(currentIndex);
      }
    }
  });
}

function checkAndFlipInDirection(startIndex, direction) {
  let currentIndex = startIndex + direction;
  let currentCell = getCellAtIndex(currentIndex);
  let hasOpponentDiscsBetween = false;
  const opponent = currentPlayer === "black" ? "white" : "black";

  if (!currentCell || !currentCell.hasChildNodes()) return false;
  if (currentCell.firstChild.classList.contains(currentPlayer)) return false;

  while (currentCell && currentCell.hasChildNodes()) {
    const disc = currentCell.firstChild;
    if (disc.classList.contains(opponent)) {
      hasOpponentDiscsBetween = true;
      currentIndex += direction;
      currentCell = getCellAtIndex(currentIndex);
    } else if (
      disc.classList.contains(currentPlayer) &&
      hasOpponentDiscsBetween
    ) {
      return true;
    } else {
      break;
    }
  }
  return false;
}

function getCellAtIndex(index) {
  return document.querySelector(`.cell[data-index='${index}']`);
}

function flipDiscAt(index) {
  const cell = getCellAtIndex(index);
  const disc = cell.firstChild;
  disc.classList.toggle("black");
  disc.classList.toggle("white");
}
