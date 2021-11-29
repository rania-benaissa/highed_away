class Bricks {

    static BRICKS_HIT = 5;
    constructor(col, row) {

        this.names = ["blue", "green", "orange", "pink", "red", "yellow"];

        this.bricks = [];

        this.inactive = [];

        this.nbBricksCol = col;

        this.nbBricksRow = row;

    }

    createBricks() {

        this.bricks = [];

        var brick, frame, create, brickColor;

        for (let y = 0; y < this.nbBricksRow; y++) {

            for (let x = 0; x < this.nbBricksCol; x++) {

                frame = this.randomIntBetween(0, 1);

                create = this.randomIntBetween(0, 6);

                if (create != 0) {

                    brickColor = this.randomIntBetween(0, this.names.length - 1);

                    brick = new Brick(this.names[brickColor], 48 + (x * 120), 100 + (y * 52), frame);

                    this.bricks.push(brick);

                    brick.drawBrick();

                }

            }
        }

    }

    updateBricks(ball, paddle) {

        for (let i = 0; i < this.bricks.length; i++) {

            if (this.collisionWithBall(this.bricks[i], ball) && this.bricks[i].active) {

                brick_hit.playSound();

                if (this.bricks[i].currentF == 0) {

                    this.bricks[i].currentF = 1;

                    Score.TOTAL_SCORE += Score.SCORE_NORMAL_BRICK;

                    ball.dx = -ball.dx;

                    ball.dy = -ball.dy;

                } else {

                    Score.TOTAL_SCORE += Score.SCORE_BROKEN_BRICK;

                    this.bricks[i].active = 0;

                    ball.dy = -ball.dy;
                }

                Bricks.BRICKS_HIT--;

                if (Bricks.BRICKS_HIT == 0) {

                    Bricks.BRICKS_HIT = 5;

                    ball.speed += 0.5;

                }
            }
        }

        youWon = this.youWin(ball, paddle);

        if (youWon) {

            ball.resetBall();

            paddle.resetPaddle();

            winGame.playSound();
        }

    }

    drawBricks() {

        for (let i = 0; i < this.bricks.length; i++) {

            if (this.bricks[i].active == 1) {

                this.bricks[i].drawBrick();

            }

        }

    }

    collisionWithBall(brick, ball) {

        if (ball.ballX + ball.radius > brick.brickX && ball.ballX - ball.radius < brick.brickX + brick.brickW && ball.ballY + ball.radius > brick.brickY && ball.ballY - ball.radius < brick.brickY + brick.brickH) {

            return true;

        }

        return false;

    }

    youWin(ball, paddle) {

        for (let i = 0; i < this.bricks.length; i++) {

            if (this.bricks[i].active == 1) {

                return false;
            }

        }

        return true;

    }

    randomIntBetween(min, max) { // min and max included 

        return Math.floor(Math.random() * (max - min + 1) + min);
    }


}