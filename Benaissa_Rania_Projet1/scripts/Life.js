class Life {

    static LIFES = 3;

    constructor() {

        this.lifeImg = new Image();

        this.lifeImg.src = "assets/images/life.png";

        this.lifeLine = new Image();

        this.lifeLine.src = "assets/images/life_line.png";


    }


    drawLife() {

        ctx.drawImage(this.lifeImg, 10, 10, 200, 50);

        if (Life.LIFES > 0)
            ctx.drawImage(this.lifeLine, 57, 24, 47, 22);

        if (Life.LIFES > 1)
            ctx.drawImage(this.lifeLine, 106, 24, 47, 22);

        if (Life.LIFES > 2)
            ctx.drawImage(this.lifeLine, 155, 24, 47, 22);

    }


}