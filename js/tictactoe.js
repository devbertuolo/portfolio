const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const turnIndicator = document.getElementById('turn-indicator');
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let circleTurn = false;
let isBotMode = false;

const pvpButton = document.getElementById('pvpButton');
const pvbButton = document.getElementById('pvbButton');

pvpButton.addEventListener('click', () => {
    isBotMode = false;
    startGame();
    turnIndicator.textContent = "Modo: Player vs Player";
});

pvbButton.addEventListener('click', () => {
    isBotMode = true;
    startGame();
    turnIndicator.textContent = "Modo: Player vs Bot";
});

startGame();

restartButton.addEventListener('click', startGame);

function updateTurnIndicator() {
    const turnIndicator = document.getElementById('turn-indicator');
    turnIndicator.textContent = `Vez de: ${circleTurn ? 'O' : 'X'}`;
}

function startGame() {
    circleTurn = !circleTurn;
    updateTurnIndicator();
    cells.forEach(cell => {
        cell.classList.remove('x', 'circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    board.classList.remove('show-line', 'show-line-active');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        drawWinningLine(currentClass);
        turnIndicator.textContent = `${currentClass === 'x' ? "X" : "O"} venceu!`;
    } else if (isDraw()) {
        turnIndicator.textContent = "Empate!";
    } else {
        swapTurns();
        updateTurnIndicator();

        if (isBotMode && circleTurn) {
            setTimeout(botMove, 500); 
        }
    }
}

function botMove() {
    const availableCells = [...cells].filter(cell => {
        return !cell.classList.contains('x') && !cell.classList.contains('circle');
    });

    if (availableCells.length > 0) {
        const randomCell = availableCells[Math.floor(Math.random() * availableCells.length)];
        placeMark(randomCell, 'circle');

        if (checkWin('circle')) {
            drawWinningLine('circle');
            turnIndicator.textContent = "O venceu!";
        } else if (isDraw()) {
            turnIndicator.textContent = "Empate!";
        } else {
            swapTurns();
            updateTurnIndicator();
        }
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass === 'x' ? 'x' : 'circle');
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function highlightWinningCells(combination) {
    combination.forEach(index => {
        cells[index].style.backgroundColor = 'rgba(255, 255, 0, 0.3)';
    });
}

function drawWinningLine(currentClass) {
    const winningCombination = WINNING_COMBINATIONS.find(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });

    if (winningCombination) {
        const [start, , end] = winningCombination;
        const startCell = cells[start];
        const endCell = cells[end];

        const startRect = startCell.getBoundingClientRect();
        const endRect = endCell.getBoundingClientRect();
        const boardRect = board.getBoundingClientRect();

        const x1 = startRect.left + startRect.width / 2 - boardRect.left;
        const y1 = startRect.top + startRect.height / 2 - boardRect.top;
        const x2 = endRect.left + endRect.width / 2 - boardRect.left;
        const y2 = endRect.top + endRect.height / 2 - boardRect.top;

        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        board.style.setProperty('--line-length', `${length}px`);
        board.style.setProperty('--line-angle', `${angle}deg`);
        board.style.setProperty('--line-x', `${x1}px`);
        board.style.setProperty('--line-y', `${y1}px`);

        board.classList.add('show-line', 'show-line-active');
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}
