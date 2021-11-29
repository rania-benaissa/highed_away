

class GamePlay extends Phaser.Scene {

    constructor() {

        super({ key: SCENES.NAME.gamePlay });

    }

    preload() {

        /* LOADING IMAGES */
        this.load.image('car1', '/assets/images/red_car.png');
        this.load.image('car2', '/assets/images/yellow_car.png');
        this.load.image('car3', '/assets/images/police_car.png');
        this.load.image('road', '/assets/images/road.jpg');
        this.load.image('life', '/assets/images/life.png');
        this.load.image('life_line', '/assets/images/life_line.png');
        this.load.image('score', '/assets/images/score.png');
        this.load.image('highestScore', '/assets/images/highestScore.png');
        this.load.image('logo_start', '/assets/images/logo_start.png');
        this.load.image('logo_resume', '/assets/images/logo_resume.png');
        this.load.image('logo_gameOver', '/assets/images/gameOver.png');
        this.load.image('logo_newScore', '/assets/images/newScore.png');
        this.load.image('text_start', '/assets/images/text_start.png');
        this.load.image('text_resume', '/assets/images/text_resume.png');
        this.load.image('text_newScore', '/assets/images/text_newScore.png');

        /* LOADING SPRITES */
        this.load.spritesheet('character', 'assets/spritesheet/leia.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('gem', 'assets/spritesheet/gemblue.png', { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('restart', 'assets/spritesheet/buttons/restart.png', { frameWidth: 311, frameHeight: 153 });
        this.load.spritesheet('start', 'assets/spritesheet/buttons/start.png', { frameWidth: 311, frameHeight: 153 });
        this.load.spritesheet('resume', 'assets/spritesheet/buttons/resume.png', { frameWidth: 311, frameHeight: 153 });
        this.load.spritesheet('sound', 'assets/spritesheet/buttons/sound.png', { frameWidth: 147.25, frameHeight: 153 });
        this.load.spritesheet('music', 'assets/spritesheet/buttons/music.png', { frameWidth: 147.25, frameHeight: 153 });

        /* LOAD AUDIO*/

        this.load.audio("collectGem", "/assets/audio/collectGem.mp3");
        this.load.audio("hitCar", "/assets/audio/hitCar.wav");
        this.load.audio("gameOver", "/assets/audio/gameOver.wav");
        this.load.audio("highScore", "/assets/audio/highScore.wav");
        this.load.audio("buttonClick", "/assets/audio/buttonClick.mp3");
        this.load.audio("musicSound", "/assets/audio/music.wav");

    }

    create() {

        collectSound = this.sound.add("collectGem");
        hitCarSound = this.sound.add("hitCar");
        highScoreSound = this.sound.add("highScore");
        gameOverSound = this.sound.add("gameOver");
        buttonClick = this.sound.add("buttonClick");
        musicSound = this.sound.add("musicSound", { loop: true, volume: 0.5 });

        //  localStorage.setItem('highestScore', 0);

        //if it's the game begining then we'll get 0

        highest_score_value = parseInt(localStorage.getItem('highestScore')) || 0;

        this.initGame();

        this.resetGame("start");

    }

    initGame() {
        /* ANIMATIONS */

        //create player's animations
        this.createPlayerAnimations();

        //creates gems animation
        this.createGemsAnimations();

        /* DEFINE OBJECTS*/

        // this will create a map of roads
        this.createMap();

        //create gems
        gems = this.physics.add.group();

        this.createGems();
        //create cars
        cars = this.physics.add.group();
        this.createCars();

        //create the player
        this.createPlayer();

        // TO MOVE THE PlAYER
        cursors = this.input.keyboard.createCursorKeys();

        //camera's settings
        this.cameras.main.startFollow(player);

        //  draw life gauge
        this.createLifeGauge();

        // draw score gauge
        this.createScoreGauge();

        this.camerasConfig()
    }

    update() {

        if (INIT) {

            INIT = false;

            this.initGame();

            this.physics.resume();

            GAMEOVER = false;

        } else {

            // nb lifes is much better
            if (!GAMEOVER) {

                // this is for the infinite loop of the map
                this.camerasConfig();

                // this will create the gems and cars 
                this.updateMap();

                //move the car according to their speed
                this.moveCars();

                // this is to move the player 
                this.movePlayer();

            }
        }
    }

    createPlayerAnimations() {

        this.anims.create({
            key: 'move_left',
            frames: this.anims.generateFrameNumbers('character', { start: 4, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'move_right',
            frames: this.anims.generateFrameNumbers('character', { start: 8, end: 11 }),
            frameRate: 15,
            repeat: -1
        });

        this.anims.create({
            key: 'move_up',
            frames: this.anims.generateFrameNumbers('character', { start: 12, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'move_down',
            frames: this.anims.generateFrameNumbers('character', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

    }

    createGemsAnimations() {

        this.anims.create({

            key: 'turn',
            frames: this.anims.generateFrameNumbers('gem', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
    }

    createMap() {

        //roads
        roads = this.physics.add.group();

        for (let i = 0; i < 8; i++) {

            var road;

            road = this.add.tileSprite(i * 100, 0, 100, 500, 'road');


            road.setScrollFactor(0);

            road.setOrigin(0);

            roads.add(road);
        }


    }

    createPlayer() {

        player = this.physics.add.sprite(
            25, // x position
            70, // y position
            'character' // key of image for the sprite

        );

        player.setScale(1.1);

        //this is to set a correct  colliding box
        player.enableBody = true;
        player.body.setSize(player.width - 10, player.height, true);

        // if the player touchs a gem he ll collect it
        this.physics.add.overlap(player, gems, this.collectGems, null, this);

        //if the player hits a car he ll die. or loose a life
        this.physics.add.overlap(player, cars, this.hitCar, null, this);

        //player will collide with world's bounds but not in the right
        player.setCollideWorldBounds(true);
        this.physics.world.checkCollision.right = false;

    }

    // this one is to create gems at different places
    createGems() {

        // this is the number of gems
        var nbGems = Phaser.Math.Between(10, nbGemsPerScene);

        // here the Y position of a gem  [150,250,...]
        var gemY = this.generateNumbers(50, 50, 450, 50);

        // same for x a value btw 150 and 750
        var gemX = this.generateNumbers(initPosX, 45, playerLimitX, 100);

        //the new gem itself
        var gem;
        var createdGems = new Set();

        for (let i = 1; i <= nbGems; i++) {

            let x, y;

            // make the x y pair unique
            do {

                x = Phaser.Utils.Array.GetRandom(gemX)
                y = Phaser.Utils.Array.GetRandom(gemY)

            } while (this.checkIfGemExists(createdGems, x, y));

            createdGems.add([x, y]);

            gem = this.physics.add.sprite(x, y, "gem");

            if (playerLimitX > 800) {

                gem.setX(gem.x + 10)

            }

            gem.anims.play('turn', true);

            gems.add(gem)

            gem.setImmovable(true);

        }

    }

    createCars() {

        //the new car itself
        var car;

        var carX = this.generateNumbers(initPosX, 45, playerLimitX, 100);

        var selectCar;

        for (let i = 0; i < carX.length; i++) {

            selectCar = Phaser.Math.Between(1, 3);

            car = this.physics.add.sprite(carX[i], 50, "car" + selectCar);

            if (playerLimitX > 800) {

                car.setX(car.x + 35)
                car.setY(car.y + 70)
            }

            // give the car a random speed
            car.speed = Phaser.Math.Between(2, 10);

            car.setScale(0.6);

            cars.add(car);

            car.setCollideWorldBounds(true, 1, 1);

            car.setImmovable(true)

        }


    }

    createLifeGauge() {

        lifeGauge = this.physics.add.image(80, 25, 'life').setScale(0.3);
        lifeGauge.setScrollFactor(0);


        lifeLines = this.physics.add.group();

        var lifeLine;

        var posX = 58;

        for (let i = 0; i < 3; i++) {

            lifeLine = this.physics.add.image(posX, 25, 'life_line').setScale(0.3);

            lifeLine.setScrollFactor(0);

            lifeLine.displayWidth = lifeLine.displayWidth / 3;

            lifeLines.add(lifeLine);

            posX += 35;

        }

    }

    createScoreGauge() {

        scoreGauge = this.physics.add.image(720, 25, 'score').setScale(0.3);
        scoreGauge.setScrollFactor(0);

        var gem = this.physics.add.sprite(661, 25, 'gem');

        gem.anims.play('turn', true);
        gem.setScrollFactor(0);

        score = this.add.text(
            692,
            18,
            score_value,
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '16px',
                fill: '#fff',
                align: 'center',
                fixedWidth: 80,

            }
        );

        score.setScrollFactor(0);

    }

    createHighestScoreGauge(posX, posY, posTextX, posTextY) {

        highestScoreGauge = this.physics.add.image(posX, posY, 'highestScore').setScale(0.3);
        highestScoreGauge.setScrollFactor(0);

        highestScore = this.add.text(
            posTextX,
            posTextY,
            highest_score_value,
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '16px',
                fill: '#fff',
                align: 'center',
                fixedWidth: 80,

            }
        );

        highestScore.setScrollFactor(0);

    }

    createSound(posX, posY) {

        sound = this.physics.add.sprite(posX, posY, "sound").setScale(0.4).setInteractive({ useHandCursor: true });

        sound.setScrollFactor(0);

        if (SOUND_ACTIVATED) {

            sound.setFrame(0);
        } else {
            sound.setFrame(3);
        }

        sound.on('pointerover', () => { sound.setFrame(1) });
        sound.on('pointerout', () => {

            if (SOUND_ACTIVATED) {

                sound.setFrame(0);
            } else {
                sound.setFrame(3);
            }

        });
        sound.on('pointerdown', () => {

            buttonClick.play();

            if (SOUND_ACTIVATED) {

                SOUND_ACTIVATED = false;

            } else {

                SOUND_ACTIVATED = true;

            }

            sound.setFrame(2);

        });

        sound.on('pointerup', () => {

            if (SOUND_ACTIVATED) {

                sound.setFrame(0);
            } else {
                sound.setFrame(3);
            }

            hitCarSound.setMute(!SOUND_ACTIVATED);
            gameOverSound.setMute(!SOUND_ACTIVATED);
            collectSound.setMute(!SOUND_ACTIVATED);
            highScoreSound.setMute(!SOUND_ACTIVATED);
            buttonClick.setMute(!SOUND_ACTIVATED);

        });

    }

    createMusic(posX, posY) {

        music = this.physics.add.sprite(posX, posY, "music").setScale(0.4).setInteractive({ useHandCursor: true });

        music.setScrollFactor(0);

        if (MUSIC_ACTIVATED) {

            music.setFrame(0);
        } else {
            music.setFrame(3);
        }

        music.on('pointerover', () => { music.setFrame(1) });
        music.on('pointerout', () => {

            if (MUSIC_ACTIVATED) {

                music.setFrame(0);
            } else {
                music.setFrame(3);
            }

        });
        music.on('pointerdown', () => {

            buttonClick.play();

            if (MUSIC_ACTIVATED) {

                MUSIC_ACTIVATED = false;

            } else {

                MUSIC_ACTIVATED = true;

            }

            music.setFrame(2);

        });

        music.on('pointerup', () => {

            if (MUSIC_ACTIVATED) {

                music.setFrame(0);
            } else {
                music.setFrame(3);
            }

            musicSound.setMute(!MUSIC_ACTIVATED);

        });

    }

    updateMap() {

        //update cars + gems
        if (player.x >= playerLimitX / 2) {

            initPosX = playerLimitX;

            playerLimitX *= 2;

            if (playerLimitX > 1600) {

                nbGemsPerScene *= 2;
            }
            //we create the cars
            this.createCars();
            // we create other gems
            this.createGems();

        }

    }

    moveCars() {

        cars.getChildren().forEach(function (car) {

            car.body.y += car.speed;

            if (car.body.y + car.body.height >= this.physics.world.bounds.height || car.body.y <= 0) {

                car.speed = -car.speed;
            }

        }, this);


    }

    movePlayer() {


        if (cursors.left.isDown) {

            player.anims.play("move_left", true);
            player.setVelocityY(0);
            player.setVelocityX(-200);


        }
        else if (cursors.right.isDown) {

            player.anims.play("move_right", true);
            player.setVelocityY(0);
            player.setVelocityX(200);

        }

        else if (cursors.up.isDown) {

            player.anims.play("move_up", true);
            player.setVelocityX(0);
            player.setVelocityY(-150);
        }
        else if (cursors.down.isDown) {

            player.anims.play("move_down", true);
            player.setVelocityX(0);
            player.setVelocityY(150);

        }
        else {

            player.setVelocity(0, 0);

            player.anims.stop();

            if (player.anims.getCurrentKey() == 'move_left') {

                player.setFrame(4);

            } else {

                if (player.anims.getCurrentKey() == 'move_right') {
                    player.setFrame(8);

                } else {

                    if (player.anims.getCurrentKey() == 'move_up') {
                        player.setFrame(12);

                    } else {

                        if (player.anims.getCurrentKey() == 'move_down') {
                            player.setFrame(0);
                        }
                    }
                }

            }

        }
    }

    collectGems(player, gem) {

        gem.disableBody(true, true);
        gems.remove(gem);
        gem.destroy();

        collectSound.play();
        //update score
        score_value += 40;
        score.setText(score_value);

    }

    checkIfGemExists(createdGems, x, y) {

        for (let value of createdGems) {

            if (value[0] == x && value[1] == y) {
                return true;
            }
        };

        return false;

    }

    generateNumbers(init, dInit, value, step) {

        var values = [];

        for (let i = init + dInit; i < value; i += step) {

            values.push(i);
        }

        return values
    }

    camerasConfig() {

        this.cameras.main.setBounds(0, 0, CAM_WIDTH, 500);

        CAM_WIDTH += 10;

        roads.getChildren().forEach(function (road) {

            road.tilePositionX = this.cameras.main.scrollX;

        }, this);

    }

    looseLife() {

        lifes -= 1;

        var life = lifeLines.getChildren()[lifes]

        life.destroy();

    }

    hitCar(player, car) {

        hitCarSound.play();

        this.physics.pause();

        this.cameras.main.stopFollow(player)

        GAMEOVER = true;

        //change player's color
        player.setTint(0xff0000);

        //stop its animation
        player.anims.stop();

        // take the player away
        player.x = Math.floor(player.x / 100) * 100

        if (lifes > 1) {

            this.looseLife();

            //reset game -> (restart and start )or resume
            this.resetGame("resume");

        } else {

            this.looseLife();

            this.resetGame("restart");

        }

    }

    resetGame(option) {

        musicSound.pause();

        background = this.add.graphics({ x: 0, y: 0 });

        background.fillStyle('0x000000', 0.9)

        background.fillRect(0, 0, 800, 500);

        background.setScrollFactor(0);

        if (option != "start") {

            button = this.physics.add.sprite(552, 428, option).setScale(0.5).setInteractive({ useHandCursor: true });
            this.createSound(824, 116);

            this.createMusic(824, 186);

            if (option == "resume") {

                image = this.physics.add.image(665, 200, 'logo_resume');
                text = this.physics.add.image(645, 270, 'text_resume');

            } else {// means it s restart

                if (highest_score_value < score_value) {

                    highScoreSound.play();

                    localStorage.setItem('highestScore', score_value);
                    highest_score_value = score_value;

                    //here we show new highest score image
                    image = this.physics.add.image(710, 255, 'logo_newScore');
                    text = this.physics.add.image(930, 300, 'text_newScore');

                } else {

                    gameOverSound.play();
                    //here we show game over text + image 
                    image = this.physics.add.image(665, 200, 'logo_gameOver');
                    text = this.physics.add.image(645, 270, 'text_resume');

                }

                this.createHighestScoreGauge(353, 83, 72, 17);
            }

        } else {

            this.createHighestScoreGauge(100, 25, 72, 18);
            image = this.physics.add.image(405, 150, 'logo_start');
            text = this.physics.add.image(400, 250, 'text_start');
            button = this.physics.add.sprite(397, 350, option).setScale(0.5).setInteractive({ useHandCursor: true });
            this.createSound(750, 40);
            this.createMusic(750, 110);
        }

        button.setScrollFactor(0);
        image.setScrollFactor(0);
        text.setScrollFactor(0);

        button.on('pointerover', () => { button.setFrame(1) });
        button.on('pointerout', () => { button.setFrame(0) });
        button.on('pointerdown', () => {

            //change buttonframe
            button.setFrame(2)

            buttonClick.play();

            switch (option) {

                case "start": {

                    GAMEOVER = false;

                } break;

                case "restart": {

                    //init values

                    CAM_WIDTH = 3000;
                    initPosX = 100;
                    playerLimitX = 800;
                    nbGemsPerScene = 15;
                    lifes = 3;
                    score_value = 0;

                    this.destroyObjects();

                    INIT = true;

                } break;

                case "resume": {

                    this.cameras.main.startFollow(player)

                    player.clearTint();

                    GAMEOVER = false;

                    this.physics.resume();

                } break;
            }

            background.destroy();
            button.destroy();
            sound.destroy();
            music.destroy();
            image.destroy();
            text.destroy();
            highestScoreGauge.destroy();
            highestScore.destroy();

            musicSound.play();

        });

    }

    // COOLEST GARBAGE COLLECTOOOOOOOOOOOOOOOR B/
    destroyObjects() {

        player.destroy();
        cars.destroy(true);
        gems.destroy(true);
        roads.destroy(true);
        lifeGauge.destroy();
        lifeLines.destroy(true);
        scoreGauge.destroy();
        score.destroy();

    }

}











