class InteractiveButton {

    constructor(name, x, y, w, h) {

        this.icone = new Image();

        this.icone.src = "assets/spritesheet/buttons/" + name + "_button.png";

        this.x = x;

        this.y = y;

        this.w = w;

        this.h = h;

        this.active = true;

        this.currentFrame = 0;

        canvas.addEventListener("mousemove", (e) => {

            e.preventDefault();

            var positionX, positionY;

            positionX = e.clientX - canvas.getBoundingClientRect().left;

            positionY = e.clientY - canvas.getBoundingClientRect().top;

            if (positionX > this.x && positionX < this.x + this.w && positionY > this.y && positionY < this.y + this.h) {

                this.currentFrame = 1;

            } else {

                if (this.active) {

                    this.currentFrame = 0;

                } else {

                    this.currentFrame = 3;
                }
            }


        });

        canvas.addEventListener("mousedown", (e) => {

            e.preventDefault();

            var positionX, positionY;

            positionX = e.clientX - canvas.getBoundingClientRect().left;

            positionY = e.clientY - canvas.getBoundingClientRect().top;

            if (positionX > this.x && positionX < this.x + this.w && positionY > this.y && positionY < this.y + this.h) { this.currentFrame = 2; }
        });

        canvas.addEventListener("mouseup", (e) => {

            e.preventDefault();

            var positionX, positionY;

            positionX = e.clientX - canvas.getBoundingClientRect().left;

            positionY = e.clientY - canvas.getBoundingClientRect().top;

            if (positionX > this.x && positionX < this.x + this.w && positionY > this.y && positionY < this.y + this.h) {

                if (!(startGame && Life.LIFES > 0 && !youWon)) {

                    if (name == "play" || name == "replay") {

                        button_click.playSound();

                        Score.TOTAL_SCORE = 0;

                        Life.LIFES = 3;

                        startGame = false;

                        youWon = false;

                        if (name == "play") {

                            bricks.createBricks();

                            startGame = true;
                        }
                    }

                }

                if (name == "sound") {

                    if (this.active) {

                        button_click.playSound();

                        brick_hit.muteSound();

                        life_loss.muteSound();

                        paddle_hit.muteSound();

                        wall_hit.muteSound();

                        winGame.muteSound();

                        button_click.muteSound();

                        this.currentFrame = 3;

                        this.active = false;

                    } else {

                        brick_hit.unMuteSound();

                        life_loss.unMuteSound();

                        paddle_hit.unMuteSound();

                        wall_hit.unMuteSound();

                        winGame.unMuteSound();

                        button_click.unMuteSound();

                        this.currentFrame = 0;

                        this.active = true;
                    }

                }
            }

        });

    }

    drawInteracctiveButton() {

        ctx.drawImage(this.icone, this.w * this.currentFrame, 0, this.w, this.h, this.x, this.y, this.w, this.h);
    }
}