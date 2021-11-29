
// DECLARATION VARIABLES 
var canvas = document.getElementById("idCanvas");

var ctx = canvas.getContext('2d');

/* BACKGROUND LOADING  */

var background = new Image();

background.src = "assets/images/bg.png";

// Declaration :

var paddle = new Paddle(330, 530, 140, 35, 8);

var ball = new Ball(400, 515, 12, 4, 2, -2);

var bricks = new Bricks(6, 6);

var life = new Life();

var score = new Score();

/* GAME BOOLEAN STARTERS*/

var startGame = false;

var youWon = false;

/* Buttons */

var restartButton = new InteractiveButton("replay", 350, 300, 118.5, 114);

var startButton = new InteractiveButton("play", 350, 300, 118.5, 114);

var soundButton = new InteractiveButton("sound", 710, 10, 59.5, 57);

/* Sounds */

var brick_hit = new Sound("brick_hit");

var life_loss = new Sound("life_loss");

var paddle_hit = new Sound("paddle_hit");

var wall_hit = new Sound("wall_hit");

var winGame = new Sound("win");

var button_click = new Sound("button_click");

setInterval(draw, 1000 / 60);

function draw() {

    load();

    if (startGame && Life.LIFES > 0 && !youWon) {

        update();

    } else {

        if (!startGame) {

            display("Press the button to start", startButton, 180, 250);

        } else if (Life.LIFES == 0) {

            display("GAME OVER", restartButton, 280, 250);

        } else {

            display("YOU WIN", restartButton, 310, 250);
        }

    }

}

function display(text, button, x, y) {

    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";

    ctx.fillRect(0, 0, canvas.width, canvas.height);


    button.drawInteracctiveButton();

    ctx.fillStyle = "#64b5f6";

    ctx.font = "bold 40px Times New Roman";

    ctx.fillText(text, x, y);



}

function load() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    paddle.drawPaddle();

    ball.drawBall();

    bricks.drawBricks();

    life.drawLife();

    score.drawScore();

    soundButton.drawInteracctiveButton();
}

function update() {

    paddle.movePaddle();

    ball.moveBall(paddle);

    bricks.updateBricks(ball, paddle);

}

