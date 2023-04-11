class GameScene extends Phaser.Scene
{
    constructor() 
    { 
        super("GameScene");
        this.invisibleBorders
        this.invisibleBorder
        this.tentacles
        this.player

        this.controls
        this.keyA
        this.keyD
        this.score
        this.scoreText = 0
        
        this.hungryTako
        this.normalTako
        this.takoVelocity
        this.spawnTakoDelay
        this.spawnTakoEvent
        
        this.fireRate
        this.fireRateText
        this.fireRateHandler
        this.fireRateIncrease = true

        this.timeRemaining = 90
        this.timeRemainingText = null
        this.timeSurvived = 0

        this.canFire

        this.projectileSFX
        this.defeatSFX
        this.powerUpSFX

        this.powerUp
        this.spawnPowerUpEvent
        this.powerUpEnable = false
    }
    
    create() {
        this.sound.stopAll();
        this.sound.play('bgm', {
            loop: true,
            volume: .8
        })
        this.timeRemaining = 90
        this.timeSurvived = 0
        this.scoreText = 0
        this.spawnTakoDelay = 400 // default: 400
        this.fireRate = 400 // default: 400
        this.takoVelocity = 50

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let backgroundImage = this.add.image(screenCenterX, screenCenterY, 'bgLVL1');
        backgroundImage.displayHeight = 960
        backgroundImage.displayWidth = 540

        this.projectileSFX = this.sound.add('projectileSFX')
        this.projectileSFX.setVolume(.5)
        this.defeatSFX = this.sound.add('defeatSFX')
        this.defeatSFX.setVolume(.8)
        this.powerUpSFX = this.sound.add('powerUpSFX')
        this.powerUpSFX.setVolume(.8)

        this.invisibleBorders = this.physics.add.staticGroup()
        this.invisibleBorders.enableBody = true
        this.invisibleBorder = this.invisibleBorders.create(screenCenterX, screenCenterY*2.7, 'border')
        .setScale(1.9).refreshBody().setVisible(false)
        this.invisibleBorder = this.invisibleBorders.create(-600, screenCenterY, 'border')
        .setScale(2).refreshBody().setVisible(false)
        this.invisibleBorder = this.invisibleBorders.create(1140, screenCenterY, 'border')
        .setScale(2).refreshBody().setVisible(false)

        this.player = this.physics.add.sprite(screenCenterX, screenCenterY * 1.65, "inaIdle")
        .setCollideWorldBounds(true).play('playerIdle', true).setScale(.4)

        // POWER UP GROUP
        this.powerUp = this.physics.add.group({
            defaultKey: 'powerUp',
            maxSize: 2,
            runChildUpdate: true
        })
        this.powerUp.createMultiple({
            key: this.powerUp.defaultKey,
            frame: this.powerUp.defaultFrame,
            frameQuantity:this.powerUp.maxSize,
            active: false,
            visible: false,
            setXY: {x: -50, y: -50}
        })

        // NORMAL TAKO GROUP
        this.normalTako = this.physics.add.group({
            defaultKey: 'normalTako',
            maxSize: 25,
            runChildUpdate: true
        })
        this.normalTako.createMultiple({
            key: this.normalTako.defaultKey,
            frame: this.normalTako.defaultFrame,
            frameQuantity:this.normalTako.maxSize,
            active: false,
            visible: false,
            setXY: {x: -50, y: -50}
        })

        // HUNGRY TAKO GROUP
        this.hungryTako = this.physics.add.group({
            defaultKey: 'hungryTako',
            maxSize: 2,
            runChildUpdate: true
        })
        this.hungryTako.createMultiple({
            key: this.hungryTako.defaultKey,
            frame: this.hungryTako.defaultFrame,
            frameQuantity:this.hungryTako.maxSize,
            active: false,
            visible: false,
            setXY: {x: -50, y: -50}
        })
        
        // TENTACLES GROUP
        this.tentacles = this.physics.add.group({
            defaultKey: 'tentacle',
            maxSize: -1,
            runChildUpdate: true
        })


        // 🎊 GAME EVENTS 🎊

        // FIRE RATE HANDLER
        this.canFire = true;
        this.fireRateHandler = this.time.addEvent({
        delay: this.fireRate,
        loop: true,
        callback: function() { this.canFire = true },
        callbackScope: this,
        })

        // COUNTER | TOP RIGHT
        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: () => {
                console.log("Current FPS: ", game.loop.actualFps);
                this.timeRemaining--;
                this.timeSurvived++;
                this.timeRemainingText.setText(`Time: ${this.timeRemaining} `);
                console.log(`current fire rate:  ${this.fireRate}`)

                if(this.timeRemaining % 5 == 0 && this.spawnTakoEvent.delay >= 100) {
                    this.spawnTakoEvent.delay -= 15
                    console.log(`SPAWN TAKO DELAY: ${this.spawnTakoEvent.delay} `)
                }
            }
        })

        // POWER UP
        this.spawnPowerUpEvent = this.time.addEvent({
            delay: 6000,
            loop: true,
            callback: () => { 
                this.spawnPowerUp()
            }
        })

        // SPAWN TAKO
        this.spawnTakoEvent = this.time.addEvent({
            delay: this.spawnTakoDelay,
            loop: true,
            callback: () => { 
                this.spawnTako()
            }
        })

        // TAKO VELOCITY EVENT
        this.time.addEvent({
            delay: 5000,
            loop: true,
            callback: () => {
                this.takoVelocity += 50
                console.log(`TAKO VELOCITY: ${this.takoVelocity}`)
            }
        })

        // TAKO FRENZY EVENT
        this.time.addEvent({
            delay:10000,
            loop: true,
            callback: () => { 
                console.log('tako frenzy start!!!')
                this.spawnHungryTako()
                this.time.addEvent({
                    delay: 100,
                    repeat: 20,
                    callback: () => { 
                        this.spawnTako()
                        this.time.addEvent({
                            delay:2000,
                            loop: false,
                            callback: () => { 
                                console.log('tako frenzy end!!!')
                            }
                        })
                    }
                })
            }
        })

        this.timeRemainingText = this.add.text(config.width - 20, 20, `Time: ${this.timeRemaining} `, {
            fontSize: '30px',
            fontFamily: 'impact',
            color: '#ffffff'
        }).setOrigin(1, 0);
        this.timeRemainingText.setShadow(2, 2, '#000', 5, true, true);

        this.score = this.add.text(20,20, 'Score: 0 ', { // fruits collected text
            fontSize: '30px', 
            fill: '#fff' , 
            fontFamily: 'impact'
        }).setShadow(2, 2, '#000', 5, true, true)

        this.controls = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        // 🎊🫧 WINNING CONDITION 🫧🎊
        if (this.timeRemaining == 0) { this.scene.start('GameVictoryScene') }

        // 🌐 COLLIDERS 🌐
        this.physics.add.collider(this.invisibleBorders, this.player)
        this.physics.add.collider(this.player, this.powerUp, (player, powerUp) => {
            this.deactivateObject(this.powerUp, powerUp)
            if (this.fireRate >= 100) { this.fireRate -= 30 }
            this.powerUpSFX.play()
        })
        this.physics.add.collider(this.tentacles, this.normalTako, (tentacle, tako) => {
            this.scoreText += 1
            this.score.setText(`Score: ${this.scoreText} `);
            this.deactivateObject(this.normalTako, tako)
            this.deactivateObject(this.tentacles, tentacle)

            if (this.fireRate >= 100) { this.fireRate -= 5 }
            else { console.log('FIRE RATE MAX!') }
        })
        this.physics.add.collider(this.player, this.normalTako, (player, tako) => {
            this.physics.pause()
            this.defeatSFX.play()
            player.setTint(0xce52ff)
            tako.setTint(0xce52ff)
            let emitter = this.add.particles('normalTako').createEmitter({
                x: player.x,
                y: player.y,
                speed: { min: -200, max: 100 },
                angle: { min: 0, max: 360 },
                scale: { start: .4, end: .2 },
                blendMode: 'ADD'
            })
            this.time.delayedCall(500, () => { emitter.stop() }, null, this)

            this.time.delayedCall(1000, ()=> {
                
                this.scene.start('GameOverScene')
            })
        })
        this.physics.add.collider(this.player, this.hungryTako, (player, takoHungry) => {
            this.physics.pause()
            this.defeatSFX.play()
            player.setTint(0xce52ff)
            takoHungry.setTint(0xce52ff)
            let emitter = this.add.particles('hungryTako').createEmitter({
                x: player.x,
                y: player.y,
                speed: { min: -200, max: 100 },
                angle: { min: 0, max: 360 },
                scale: { start: .4, end: .2 },
                blendMode: 'ADD'
            })
            this.time.delayedCall(500, () => { emitter.stop() }, null, this)

            this.time.delayedCall(1000, ()=> {
                
                this.scene.start('GameOverScene')
            })
        })

        // pass the score and time survived into the data manager
        this.data.set('score', this.scoreText)
        this.data.set('timeSurvived', this.timeSurvived)

        this.playerControls()
        this.objectBounds()
        
        this.fireRateHandler.delay = this.fireRate
    }

    // GROUP MEMBER LIMITS
    objectBounds() {
        this.normalTako.children.iterate((tako) => {
            if (tako && tako.y > 1000) {
                this.deactivateObject(this.normalTako, tako)
            }
        })
        this.hungryTako.children.iterate((takoHungry) => {
            if (takoHungry && takoHungry.y > 1000) {
                this.deactivateObject(this.hungryTako, takoHungry)
            }
        })
        this.tentacles.children.iterate((tentacle) => {
            if (tentacle && tentacle.y < 0 || tentacle && tentacle.y >= this.player.y + .1) { // || tentacle && tentacle.y >= this.player.y + .1
                this.deactivateObject(this.tentacles, tentacle)
            }
        })
    }

    playerControls() {
        // ⌨️ PLAYER CONTROLS ⌨️
        if (this.controls.right.isUp && this.controls.left.isUp || this.keyA.isUp && this.keyD.isUp ) {
            this.player.setVelocityX(0);
        } 
        if (this.controls.left.isDown || this.keyA.isDown) {
            this.player.setVelocityX(-600); this.player.anims.play('playerIdle', true)
        }
        else if (this.controls.right.isDown || this.keyD.isDown) {
            this.player.setVelocityX(600); this.player.anims.play('playerIdle', true)
        }
        if (this.controls.space.isDown) {
            this.fireBullet(this.player.x + Phaser.Math.Between(-20,20), this.player.y)
            this.player.anims.play('playerAttack', true)
        }
    }

    fireBullet(x, y) {
        if (this.canFire) {
            const bullet = this.tentacles.get(x, y);
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.setVelocityY(-3000); // Set bullet velocity
            this.canFire = false;
            this.projectileSFX.play()
        }
    }

    activateTako(tako, x, y) {
        tako.enableBody(true, x, y, true, true).setVelocityY(this.takoVelocity).setScale(1.5)
    }
    activateTakoHungry(tako, x, y) {
        tako.enableBody(true, x, y, true, true).setVelocityY(30).setScale(4)
    }
    activatePowerUp(powerUp, x, y) {
        powerUp.enableBody(true, x, y, true, true).setGravity(0).setScale(3).setTint(0xa339d4)
    }
    deactivateObject(group, child) {
        group.remove(child, true, true); // Remove the member/child from the group and the world
        child.destroy(); // Destroy the member/child to free up memory
    }
    spawnTako() {
        let tako = this.normalTako.get()
        if (!tako) return;
        tako.anims.play('TakoNormal', true)
        this.activateTako(tako, Phaser.Math.Between(50,config.width-50), -50)
    }
    spawnHungryTako() {
        let takoHungry = this.hungryTako.get()
        if (!takoHungry) return;
        takoHungry.anims.play('TakoHungry', true)
        this.activateTakoHungry(takoHungry, Phaser.Math.Between(50,config.width-50), -200)
    }
    spawnPowerUp() {
        let powerUp = this.powerUp.get()
        if (!powerUp) return;
        this.activatePowerUp(powerUp, Phaser.Math.Between(50,config.width-50), -50)
    }

}