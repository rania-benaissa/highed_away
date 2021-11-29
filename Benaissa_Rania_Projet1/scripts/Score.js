class Score {

    static TOTAL_SCORE = 0;
    static SCORE_BROKEN_BRICK = 30;
    static SCORE_NORMAL_BRICK = 50;
    static SCORE_LIFE_LOSS = 50;

    constructor() {

        this.score = new Image();

        this.score.src = "assets/images/score.png";
    }

    drawScore() {

        ctx.drawImage(this.score, 300, 5, 155, 102 / 2);

        ctx.fillStyle = "#FFF";

        ctx.font = "25px Arial bold";

        ctx.fillText(Score.TOTAL_SCORE, 390, 40);

    }

}