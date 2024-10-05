const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = [{ x: box * 5, y: box * 5 }];
let direction = '';
let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};
let score = 0;
let gameInterval;

// Start the game
function startGame() {
    document.addEventListener('keydown', changeDirection);
    gameInterval = setInterval(draw, 100);
}

// Change direction based on key press
function changeDirection(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') {
        direction = 'LEFT';
    } else if (event.keyCode === 38 && direction !== 'DOWN') {
        direction = 'UP';
    } else if (event.keyCode === 39 && direction !== 'LEFT') {
        direction = 'RIGHT';
    } else if (event.keyCode === 40 && direction !== 'UP') {
        direction = 'DOWN';
    }
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = '#ff5722';
    ctx.fillRect(food.x, food.y, box, box);

    // Move snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Check for food collision
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById('score').innerText = `Score: ${score}`;
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
    } else {
        snake.pop(); // Remove last segment if not eating
    }

    // Check for wall collision
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(snakeX, snakeY, snake)) {
        clearInterval(gameInterval);
        alert(`Game Over! Your score was: ${score}`);
        return;
    }

    // Add new head
    const newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead); // Add new head

    // Draw snake
    ctx.fillStyle = '#4caf50';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}

// Check collision with itself
function collision(x, y, array) {
    return array.some(segment => segment.x === x && segment.y === y);
}

// Reset game
function resetGame() {
    clearInterval(gameInterval);
    score = 0;
    snake = [{ x: box * 5, y: box * 5 }];
    direction = '';
    document.getElementById('score').innerText = `Score: ${score}`;
    food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
    startGame();
}

// Initialize the game
startGame();
