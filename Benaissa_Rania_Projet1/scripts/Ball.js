class Ball {

    constructor(x, y, r, s, vx, vy) {

        this.ballX = x;

        this.initX = x;

        this.initY = y;

        this.initSpeed = s;

        this.ballY = y;

        this.radius = r;

        this.speed = s;

        this.dx = vx;

        this.dy = vy;

    }

    drawBall() {

        ctx.beginPath();

        ctx.arc(this.ballX, this.ballY, this.radius, 0, Math.PI * 2);

        ctx.fillStyle = "#B22222";

        ctx.fill();

        ctx.strokeStyle = "#8B0000";

        ctx.stroke();

        ctx.closePath();

    }

    moveBall(paddle) {

        /*  RIGHT AND LEFT COLLISION */

        if (this.ballX + this.radius > canvas.width || this.ballX - this.radius < 0) {

            this.dx = -this.dx;

            wall_hit.playSound();
        }

        /* TOP COLLISION */

        if (this.ballY - this.radius < 0) {

            this.dy = -this.dy;

            wall_hit.playSound();

        } else {

            if (this.ballY + this.radius < canvas.height) {

                if (this.ballX + this.radius > paddle.paddleX && this.ballX < paddle.paddleX + paddle.paddleW && this.ballY + this.radius > paddle.paddleY && this.ballY < paddle.paddleY + paddle.paddleH) {

                    // TO GET THE COLLISION POINT

                    paddle_hit.playSound();

                    let collider = this.ballX - (paddle.paddleX + paddle.paddleW / 2);

                    collider = collider / (paddle.paddleW / 2);

                    let angle = collider * (Math.PI / 3);

                    this.dy = - this.speed * Math.cos(angle);

                    this.dx = this.speed * Math.sin(angle);
                }
            } else {

                // IF THE BALL FALLS

                Life.LIFES--;

                life_loss.playSound();

                if (Score.TOTAL_SCORE >= Score.SCORE_LIFE_LOSS) {

                    Score.TOTAL_SCORE -= Score.SCORE_LIFE_LOSS;
                }
                else {

                    Score.TOTAL_SCORE = 0;
                }

                this.resetBall();

                paddle.resetPaddle();

            }

        }

        /* UPDATE THE BALL'S POSITION */

        this.ballX += this.dx;
        this.ballY += this.dy;

    }

    resetBall() {

        this.ballX = this.initX;

        this.ballY = this.initY;

        if (Life.LIFES == 0 || youWon) {

            this.speed = this.initSpeed;
        }

    }
}