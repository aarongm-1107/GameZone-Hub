const board = document.getElementById('board');
let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Create game board
function createCell(index) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.addEventListener('click', () => handleCellClick(index));
    board.appendChild(cell);
}

// Handle cell click
function handleCellClick(index) {
    if (gameState[index] !== '' || !gameActive) return;
    gameState[index] = currentPlayer;
    renderBoard();
    checkWinner();
}

// Render game board
function renderBoard() {
    board.innerHTML = '';
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.innerText = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

// Check for a winner or draw
function checkWinner() {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            document.getElementById('message').innerText = `${currentPlayer} wins!`;
            return;
        }
    }

    if (!gameState.includes('')) {
        document.getElementById('message').innerText = "It's a Draw!";
        gameActive = false;
    }

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Reset the game
function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    document.getElementById('message').innerText = '';
    renderBoard();
}

// Initialize the game board
for (let i = 0; i < 9; i++) {
    createCell(i);
}
