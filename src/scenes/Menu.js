class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    init() {

    }
    preload() {
        this.load.image('title', './assets/title.png');
        this.load.image('text', './assets/text.png');
        this.load.image('rocket_clip', './assets/title_rocket.png');
        //Downloaded from https://www.stickpng.com/img/transport/spacecraft/rocket-clipart
        this.load.image('ship_clip', './assets/title_ship.png');
        //Downloaded from http://clipart-library.com/clipart/XyikBXkcE.htm
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('bgm', './assets/Rob Gasser - Supersonic [NCS Release].mp3')
        /*
        Song: Rob Gasser - Supersonic [NCS Release]
        Music provided by NoCopyrightSounds
        Free Download/Stream: http://ncs.io/rgsupersonic
        Watch: http://youtu.be/TdEo002K2GQ
        */
    }
    create() {


        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5, bottom: 5
            },
            fixedwidth: 0
        }
        this.add.image(game.config.width/2, game.config.height/2 - (borderUISize + borderPadding)*2, 'title');
        this.add.image(game.config.width/2, game.config.height/2+130, 'text');
        this.add.image(game.config.width/10, game.config.height - 60, 'rocket_clip');
        this.add.image(game.config.width/10, game.config.height - 180, 'rocket_clip');
        this.add.image(game.config.width/10, game.config.height - 300, 'rocket_clip');
        this.add.image(game.config.width/10, game.config.height - 420, 'rocket_clip');
        this.add.image(game.config.width*8.7/10, game.config.height - 60, 'ship_clip');
        this.add.image(game.config.width*8.7/10, game.config.height - 180, 'ship_clip');
        this.add.image(game.config.width*8.7/10, game.config.height - 300, 'ship_clip');
        this.add.image(game.config.width*8.7/10, game.config.height - 420, 'ship_clip');

        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";    

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                twoPlayer: false
            }
            this.scene.start('playScene');
            this.sound.play('sfx_select');         
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000,
                twoPlayer: false
            }
            this.scene.start('playScene');
            this.sound.play('sfx_select');         
        }
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000,
                twoPlayer: true
            }
            this.scene.start('playScene');
            this.sound.play('sfx_select');         
        } 
    }
}
