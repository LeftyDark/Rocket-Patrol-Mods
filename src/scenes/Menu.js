class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    init() {

    }
    preload() {
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
        this.add.text(game.config.width/2, game.config.height/2 - (borderUISize + borderPadding), 'ROCKET PATROL',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ to move and (L) to fire',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2+40, 'p2: A and D to move and (F) to fire',menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";    
        this.add.text(game.config.width/2, game.config.height/2 + 100 + (borderUISize + borderPadding), '←: novice, →: expert, ↓: 2p.',menuConfig).setOrigin(0.5);

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
