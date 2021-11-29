class Brick {

    constructor(name, x, y, f) {

        this.brick = new Image();

        this.brick.src = "assets/spritesheet/bricks/" + name + "_brick.png";

        this.brickX = x;

        this.brickY = y;

        this.realW = 132;

        this.realH = 40;

        this.currentF = f;

        this.active = 1;

        // after scaling the images 

        this.brickH = this.realH * 0.8;

        this.brickW = this.realW * 0.8;


    };

    drawBrick() {

        ctx.drawImage(this.brick, this.realW * this.currentF, 0, this.realW, this.realH, this.brickX, this.brickY, this.brickW, this.brickH);

    }

}