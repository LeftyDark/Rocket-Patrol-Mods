class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, fireKey, moveLKey, moveRKey, frame){
        super(scene, x, y, texture, frame);
        //add to scene
        scene.add.existing(this);
        this.isFiring = false;
        this.moveSpeed = 2; 
        this.sfxRocket = scene.sound.add('sfx_rocket');
        this.fireKey = fireKey;
        this.moveLKey = moveLKey;
        this.moveRKey = moveRKey;
    }

    update() {
        if(!this.isFiring) {
            if(this.moveLKey.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            }
            else if (this.moveRKey.isDown && this.x <= game.config.width - (borderUISize + this.width)) {
                this.x += this.moveSpeed;
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.fireKey)) {
            this.isFiring = true;
            this.sfxRocket.play();
        }
        if(this.isFiring && this.y >= borderUISize *3 +borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset when miss
        if(this.y <= borderUISize * 3 +borderPadding) {
            this.reset();
        }
    }
    reset() {
        this.isFiring = false;
            this.y = game.config.height - (borderUISize +borderPadding);
    }
}