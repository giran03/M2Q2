class GameVictoryScene extends Phaser.Scene
{
    constructor() 
    { 
        super("GameVictoryScene")
        // buttons
        this.restartBtn
        this.mainMenuBtn
        
        this.victorySFX
    }

    create() {
        this.sound.stopAll();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let backgroundImage = this.add.image(screenCenterX, screenCenterY, 'bgLVL1');
        backgroundImage.displayHeight = 960
        backgroundImage.displayWidth = 540

        this.victorySFX = this.sound.add('victorySFX')
        this.victorySFX.setVolume(.5)
        this.victorySFX.play()

        // random winning text display
        const winningText = ['Y A T T A !', 'H O O O R A Y !', 'C O N G R A T S !', 'Y O U  W I N !'];
        let gameOverText = this.add.text(screenCenterX, -200, `${winningText[Phaser.Math.Between(0,3)]}`, {
            fontSize: '80px', fontFamily: 'impact'
        }).setOrigin(0.5).setShadow(2, 2, '#000', 5, true, true)
        this.tweens.add({
            targets: gameOverText,
            x: screenCenterX,
            y: screenCenterY*.4,
            duration: 1000,
            ease: 'Bounce'
        })

        // event for fireworks
        this.time.addEvent({
            delay:200,
            loop: true,
            callback: () => {
                this.emitterFireworks(screenCenterX*.3)
            }
        })   

        let player = this.add.sprite(config.width + 2000, screenCenterY*.7, "inaIdle").play('playerIdle', true).setScale(1)
        this.tweens.add({
            targets: player,
            x: screenCenterX,
            y: screenCenterY*.7,
            duration: 1000,
            ease: 'Bounce'
        })
        this.time.addEvent({
            delay: 3000,
            loop: true,
            callback: ()=>{
                player.play('playerAttack', true)
            }
        })
        this.time.addEvent({
            delay: 6000,
            loop: true,
            callback: ()=>{
                player.play('playerIdle', true)
            }
        })

        let spaceBarInfo = this.add.text(screenCenterX, 2000, "SPACEBAR to Restart ", {
            fontSize: '30px', fontFamily: 'impact'
        }).setOrigin(0.5).setShadow(2, 2, '#000', 5, true, true)
        this.tweens.add({
            targets: spaceBarInfo,
            x: screenCenterX,
            y: screenCenterY*1.7,
            duration: 1000,
            ease: 'Bounce'
        })

        let playerScore = this.add.text(config.width - 1000, screenCenterY,
            `Score: ${this.scene.get('GameScene').data.get('score')}  `,
            { 
                fill: '#fff' , fontSize: '30px', fontStyle: 'italic' , fontFamily: 'impact'
            }).setOrigin(.5).setShadow(2, 2, '#000', 5, true, true)
        this.tweens.add({
            targets: playerScore,
            x: screenCenterX,
            y: screenCenterY,
            duration: 1000,
            ease: 'Bounce'
        })
        let timeSurvived = this.add.text(config.width + 1000, screenCenterY + 50,
            `Time Survived: ${this.scene.get('GameScene').data.get('timeSurvived')}  `,
            { 
                fill: '#fff' , fontSize: '30px', fontStyle: 'italic' , fontFamily: 'impact'
            }).setOrigin(.5).setShadow(2, 2, '#000', 5, true, true)
        this.tweens.add({
            targets: timeSurvived,
            x: screenCenterX,
            y: screenCenterY + 50,
            duration: 1000,
            ease: 'Bounce'
        })
        
        this.restartBtn = this.add.sprite(screenCenterX*.7, screenCenterY*1.52, 'uiButtonLarge').setOrigin(.5)
        let restartText = this.add.text(screenCenterX*.7, screenCenterY*1.5, "R E S T A R T " ,{
            fill: '#000' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5)
        this.restartBtn.setScale(3)

        this.mainMenuBtn = this.add.sprite(screenCenterX*1.3, screenCenterY*1.52, 'uiButtonLarge').setOrigin(.5)
        let mainMenuText = this.add.text(screenCenterX*1.3, screenCenterY*1.5, "M A I N  M E N U " ,{
            fill: '#000' , fontSize: '18px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5)
        this.mainMenuBtn.setScale(3)

        this.restartBtn.setInteractive()
        this.mainMenuBtn.setInteractive()

        this.restartBtn.on("pointerover", ()=>{
            this.restartBtn.setTint(0xd5a8ff)
        })
        this.restartBtn.on("pointerout", ()=>{
            restartText.y = screenCenterY*1.5
            this.restartBtn.clearTint()
        })
        this.restartBtn.on("pointerdown", ()=>{
            restartText.y += 3
            
        })
        this.restartBtn.on("pointerup", ()=>{
            restartText.y -= 3
            this.time.delayedCall(50, () => {
                this.scene.start("GameScene")
            })
        })

        this.mainMenuBtn.on("pointerover", ()=>{
            this.mainMenuBtn.setTint(0xd5a8ff)
        })
        this.mainMenuBtn.on("pointerout", ()=>{
            mainMenuText.y = screenCenterY*1.5
            this.mainMenuBtn.clearTint()
        })
        this.mainMenuBtn.on("pointerdown", ()=>{
            mainMenuText.y += 3
            
        })
        this.mainMenuBtn.on("pointerup", ()=>{
            mainMenuText.y -= 3
            this.time.delayedCall(50, () => {
                this.scene.start("MainMenuScene")
            })
        })

        this.cursors = this.input.keyboard.createCursorKeys(); // keyboard controls
    }

    update() {
        // bind SPACEBAR to restart game or return to GameScene.js
        if (this.cursors.space.isDown) { this.scene.start("GameScene") }
    }

    emitterFireworks(x) {
        let emitter = this.add.particles('inaIdle').createEmitter({
            x: x + Phaser.Math.Between(0,config.width),
            y: 80,
            speed: { min: -200, max: 100 },
            angle: { min: 0, max: 360 },
            scale: { start: .3, end: .1 },
            blendMode: 'ADD'
        })
        this.time.delayedCall(500, () => { emitter.stop() }, null, this)
    }
}