const firebaseConfig = {
    apiKey: "AIzaSyCXsdXnOT6IgI6cMVjIpQ1DcKnUWeT1MBs",
    authDomain: "snake-game-80723.firebaseapp.com",
    projectId: "snake-game-80723",
    storageBucket: "snake-game-80723.appspot.com",
    messagingSenderId: "471118908466",
    appId: "1:471118908466:web:116b1b5334ed7bf4b1402b"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

const startButton = document.getElementById("startButton");
const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetButton");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "green";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

let posts = []; 
  //
const postsEl = document.getElementById("posts");
// const postFormEl = document.getElementById("postForm");
let playerName = prompt("Enter your name");


async function getPosts(){
    const posts = await db.collection("posts").orderBy("score", "desc").limit(5).get();
    // console.log(posts.docs[3].data()); 
    renderPosts(posts.docs);
}

getPosts();



startButton.addEventListener("click", gameStart);
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);



function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick() {
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    } else {
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);

};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};

    snake.unshift(head);
    // check if the food gets eaten
    if(snake[0].x === foodX && snake[0].y === foodY){
        score+= 1;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);

    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity === -unitSize);
    const goingDown = (yVelocity === unitSize);
    const goingRight = (xVelocity === unitSize);
    const goingLeft = (xVelocity === -unitSize);

    switch(true) {
        case(keyPressed === LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed === UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed === RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed === DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }

};
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            running = false;
    }
};
function displayGameOver(){
    ctx.font = "16px Marvelan";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over " + playerName +"! Your score was: " + Number(scoreText.textContent), gameWidth / 2, gameHeight / 2);
    running = false;

    db.collection("posts").add({
        name: playerName,
        score: Number(scoreText.textContent)
    });
    renderPosts(posts);

};
function resetGame(){
    // score = 0;
    // xVelocity = unitSize;
    // yVelocity = 0;
    // snake = [
    //     {x:unitSize * 4, y:0},
    //     {x:unitSize * 3, y:0},
    //     {x:unitSize * 2, y:0},
    //     {x:unitSize, y:0},
    //     {x:0, y:0}
    // ];
    // let playerName = prompt("Enter your name");
    // gameStart();
    location.reload();
};

function renderPosts(posts) {
    // postsEl.innerHTML = "";

    for (let post of posts) {
        const data = post.data();

        const postEl = document.createElement("p");
        postEl.innerHTML = ` <br>
        ${data.name}: <span style="color:red;">
        ${data.score} </span>`;
        postsEl.append(postEl);
    }

}

function openPopup() {
    // postsEl.style.display = "block";
    // postsEl.classList.add("open-popup")
    postsEl.style.visibility = "visible";
}

function closePopup() {
    postsEl.style.visibility = "hidden";
}
