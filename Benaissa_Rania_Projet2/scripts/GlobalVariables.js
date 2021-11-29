
/* GAME PLAY VARS*/

//OBJECTS
var player, cursors, gems, roads, cars, lifeGauge, lifeLines, scoreGauge, score,
    background, button, sound, music, highestScoreGauge, highestScore, image, text;


var collectSound, hitCarSound, gameOverSound, highScoreSound, buttonClick, musicSound;


//GAME's VARIABLES
var CAM_WIDTH = 3000, initPosX = 100; playerLimitX = 800, nbGemsPerScene = 15, lifes = 3,
    score_value = 0, GAMEOVER = true, INIT = false, SOUND_ACTIVATED = true, MUSIC_ACTIVATED = true;

var highest_score_value;
//CONSTANTS
const MAX_LIFES = 3;


/* GENERAL VARS*/

const SCENES = {

    NAME: {

        gamePlay: "gamePlay"

    }
}

