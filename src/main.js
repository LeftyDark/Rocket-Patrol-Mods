/*
Rocket Patrol Modding Project
Made by Ryan McCarty on 6/28/21
It took about 5 and a half hours to do all the mods
Points breakdown: 
20 for Finishing the Tutorial
5 for adding background music (25 total)
5 for adding speed increase (30 total)
10 for adding time remaining (40 total)
10 for editing the title screen (50 total)
20 for using Phaser's Particle Emitter for explosions (70 total)
30 for adding a simulatanious two player mode (100 total)
Sources for images and music I downloaded are stated where they are loaded
Used Phaser documentation and phaser particle emitter example at 
https://phaser.io/examples/v3/view/game-objects/particle-emitter/create-emitter
to help me create my mods.
*/
console.log("Rocket Patrol is cool!");
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
};

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// setting up keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, keyDOWN, keyL, keyA, keyD;

//setting up timer variable
let currentTime;