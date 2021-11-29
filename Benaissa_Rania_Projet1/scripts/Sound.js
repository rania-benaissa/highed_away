class Sound {

    constructor(name) {

        this.sound = new Audio;

        this.sound.src = "assets/sounds/" + name + ".mp3";

    }

    playSound() {

        this.sound.play();

    }

    unMuteSound() {

        this.sound.muted = false;

    }

    muteSound() {

        this.sound.muted = true;

    }



}