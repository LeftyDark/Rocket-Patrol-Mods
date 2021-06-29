class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    init() {

    }
    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('spark', './assets/sparkasset_20.png');
        // downloaded from https://www.subpng.com/png-q5vdlk/
    }
    create() {
        this.add.text(20,20,"Rocket Patrol Play");
        this.starfield = this.add.tileSprite(0,0,640,480, 'starfield').setOrigin(0,0);
        
        //green UI background
        this.add.rectangle(0,borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);
        //white borders
        this.add.rectangle(0,0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        if (game.settings.twoPlayer == false) {
            this.p1Rocket = new Rocket(this, 
            game.config.width/2, game.config.height - (borderUISize +borderPadding), 
            'rocket', keyL, keyLEFT, keyRIGHT).setOrigin(0.5,0); 
        } 
        if (game.settings.twoPlayer == true) {
            this.p1Rocket = new Rocket(this, 
                game.config.width /3, game.config.height - (borderUISize +borderPadding), 
                'rocket', keyL, keyLEFT, keyRIGHT).setOrigin(0.5,0); 
            this.p2Rocket = new Rocket(this, 
                    game.config.width* 2/3, game.config.height - (borderUISize +borderPadding), 
                    'rocket', keyF, keyA, keyD).setOrigin(0.5,0);     
            } 
        //please let this end the rocket so it stops eating up the next part of the code and breaking the program
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6,
           borderUISize*4, 'spaceship', 0, 30).setOrigin(0,0);
        //end of spaceship 1
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3,
            borderUISize*5 + borderPadding, 'spaceship', 0, 20).setOrigin(0,0);
        //end of spaceship 2
        this.ship03 = new Spaceship(this, game.config.width,
            borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        //end of spaceship3
    
    this.p1Score = 0;

    let scoreConfig = {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5, bottom: 5
        },
        fixedwidth: 100
    }
    this.scoreLeft = this.add.text(borderUISize +borderPadding,
        borderUISize + borderPadding*2, this.p1Score, scoreConfig);
    //score

    this.gameOver = false;

    this.sound.play('bgm'); //Plays game music

    //speed up after 30 seconds 
    this.speedTime = this.time.delayedCall(30000, () => {
        this.ship01.speedUp = true;
        this.ship02.speedUp = true;
        this.ship03.speedUp = true;
    }, null, this);
    //60 second play clock
    scoreConfig.fixedwidth = 0;
    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER',
        scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 +64, 'Press (R) to Restart or ← for menu', 
        scoreConfig).setOrigin(0.5);
        this.gameOver = true;
    }, null, this);
    //timer
    this.currentTime = game.settings.gameTimer/1000;
    this.timer = this.add.text(borderUISize + borderPadding*45, borderUISize +borderPadding*2, this.currentTime, scoreConfig);
    }    
    
    update() {
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        } 
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
            this.sound.stopAll();
        } 
        this.starfield.tilePositionX -=  4;
        if(!this.gameOver) {
        this.p1Rocket.update();
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();
        if(game.settings.twoPlayer == true) {this.p2Rocket.update();}
        
        }
        //how timer runs
        this.currentTime = game.settings.gameTimer/1000 - Math.floor(this.clock.getElapsedSeconds());
        if (this.currentTime >= 0) {
            this.timer.text = this.currentTime;
            this.timer.update();
        }
        // check for any collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            console.log("Press F for ship 3")
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            console.log("Press F for ship 2")
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            console.log("Press F for ship 1")
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        //check for collisions with p2 ship
        if(game.settings.twoPlayer == true) {
            if(this.checkCollision(this.p2Rocket, this.ship03)) {
                console.log("Press F for ship 3")
                this.p2Rocket.reset();
                this.shipExplode(this.ship03);
            }
            if(this.checkCollision(this.p2Rocket, this.ship02)) {
                console.log("Press F for ship 2")
                this.p2Rocket.reset();
                this.shipExplode(this.ship02);
            }
            if(this.checkCollision(this.p2Rocket, this.ship01)) {
                console.log("Press F for ship 1")
                this.p2Rocket.reset();
                this.shipExplode(this.ship01);
            }
        }
    }

    checkCollision(rocket, ship) {
        if(rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y +ship.height && 
            rocket.height + rocket.y > ship.y)
            {return true; 
            }
        return false;
    }
    shipExplode(ship) {
        ship.alpha = 0; //hide sprite
        this.sound.play('sfx_explosion');
        //first try at particle emitter
        let particles = this.add.particles('spark')
        let emitter = particles.createEmitter();
        emitter.setPosition(ship.x, ship.y);
        emitter.setSpeed(200);
        emitter.setBlendMode(Phaser.BlendModes.ADD);
        this.explodeStop = this.time.delayedCall(1000, () => {
            emitter.stop();
            ship.reset();
            ship.alpha = 1;
        })
        //add score and show new score
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }  
}