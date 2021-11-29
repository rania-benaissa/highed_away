class Paddle {

    constructor(x, y, w, h, v) {

        this.paddle = new Image();

        this.paddle.src = "assets/images/paddle.png";

        this.paddleX = x;

        this.paddleY = y;

        this.paddleInitX = x;

        this.paddleInitY = y;

        this.paddleW = w;

        this.paddleH = h;

        this.dx = v;

        this.leftArrow = false;

        this.rightArrow = false;


        window.addEventListener('keydown', (e) => {

            if (e.keyCode == 37) {

                this.leftArrow = true;

            } else {

                if (e.keyCode == 39) {

                    this.rightArrow = true;
                }
            }

        });

        window.addEventListener('keyup', (e) => {

            if (e.keyCode == 37) {

                this.leftArrow = false;

            } else {

                if (e.keyCode == 39) {

                    this.rightArrow = false;
                }
            }

        });

    }

    drawPaddle() {

        ctx.drawImage(this.paddle, this.paddleX, this.paddleY, this.paddleW, this.paddleH);

    }


    movePaddle(e) {

        //left
        if (this.leftArrow && this.paddleX > 0) {

            if (this.paddleX - this.dx > 0) {

                this.paddleX -= this.dx;

            } else {

                this.paddleX = 0;
            }

        }

        //right 
        if (this.rightArrow && (this.paddleX + this.paddleW) < canvas.width) {

            if (this.paddleX + this.dx + this.paddleW < canvas.width) {

                this.paddleX += this.dx;

            } else {

                this.paddleX = canvas.width - this.paddleW;
            }
        }

    }

    resetPaddle() {

        paddle.paddleX = paddle.paddleInitX;
        paddle.paddleY = paddle.paddleInitY;
    }


}