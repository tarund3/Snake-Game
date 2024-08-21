const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 400;
canvas.height = 400;

const box = 20; // The size of one grid square
let snake = [];
snake[0] = { x: 9 * box, y: 10 * box }; // Starting position of the snake

let direction;
let food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box
};

let score = 0;

// Control the snake's direction
document.addEventListener('keydown', setDirection);

function setDirection(event) {
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

// Check for collisions with the wall or itself
function collision(newHead, snakeArray) {
    for (let i = 0; i < snakeArray.length; i++) {
        if (newHead.x === snakeArray[i].x && newHead.y === snakeArray[i].y) {
            return true;
        }
    }
    return newHead.x < 0 || newHead.y < 0 || newHead.x >= canvas.width || newHead.y >= canvas.height;
}

// Main game loop
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? 'green' : 'white'; // Head is green, body is white
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'red';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);

    // Move the snake
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    // Check if the snake eats the food
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } else {
        snake.pop(); // Remove the tail
    }

    // New head position
    let newHead = { x: snakeX, y: snakeY };

    // Check for collision
    if (collision(newHead, snake)) {
        clearInterval(game); // Stop the game
        alert('Game Over! Your score: ' + score);
    }

    // Add new head to the snake
    snake.unshift(newHead);

    // Display score
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 24);
}

// Call draw function every 100ms
let game = setInterval(draw, 100);
