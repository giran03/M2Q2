class MainMenuScene extends Phaser.Scene
{
    constructor() 
    { 
        super("MainMenuScene")
        // buttons
        this.playBtn
        this.creditsBtn
        this.quitBtn
        
        this.bgMusic
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let backgroundImage = this.add.image(screenCenterX, screenCenterY, 'bgLVL1');
        backgroundImage.displayHeight = 960
        backgroundImage.displayWidth = 540

        this.sound.stopAll();
        this.sound.play('bgm', {
            loop: true,
            volume: .8
        })

        let player = this.add.sprite(screenCenterX, screenCenterY - 1000, "inaIdle").play('playerIdle', true).setScale(1)
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
        
        // ⚠️ 'this.tweens.' are used for animations ⚠️

        // CONTROLS INFO
        let controlsText = this.add.text(screenCenterX*.25, screenCenterY*.15, "C O N T R O L S  " ,
        { fill: '#fff' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'}).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5).setVisible(false)

        let leftText = this.add.text(screenCenterX*.6, screenCenterY*.24, "L E F T  " ,
        { fill: '#fff' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'}).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5).setVisible(false)
        let letterA = this.add.sprite(screenCenterX*.35, screenCenterY*.25, 'letterKeys').setScale(3).setOrigin(.5).setVisible(false)
        letterA.anims.play('animLetterL', true)
        let arrowL = this.add.sprite(screenCenterX*.15, screenCenterY*.25, 'arrowKeys').setScale(3).setOrigin(.5).setVisible(false)
        arrowL.anims.play('animL', true)
        
        let rightText = this.add.text(screenCenterX*.64, screenCenterY*.345, "R I G H T  " ,
        { fill: '#fff' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'}).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5).setVisible(false)
        let letterD = this.add.sprite(screenCenterX*.35, screenCenterY*.355, 'letterKeys').setScale(3).setOrigin(.5).setVisible(false)
        letterD.anims.play('animLetterR', true)
        let arrowR = this.add.sprite(screenCenterX*.15, screenCenterY*.355, 'arrowKeys').setScale(3).setOrigin(.5).setVisible(false)
        arrowR.anims.play('animR', true)

        let spacebarText = this.add.text(screenCenterX*.65, screenCenterY*.455, "S H O O T  " ,
        { fill: '#fff' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'}).setShadow(2, 2, '#000', 5, true, true).setOrigin(.5).setVisible(false)
        let spaceBar = this.add.sprite(screenCenterX*.25, screenCenterY*.46, 'spaceKey').setScale(1.6).setOrigin(.5).setVisible(false)
        spaceBar.anims.play('animSpacebar', true)

        // 🌀 BUTTONS 🌀
        this.playBtn = this.add.sprite(screenCenterX + 1000, screenCenterY*1.2, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(3)
        let playText = this.add.text(screenCenterX, screenCenterY*1.18, "P L A Y " ,{ 
            fill: '#000' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5).setVisible(false)
        this.tweens.add({
            targets: this.playBtn,
            x: screenCenterX,
            y: screenCenterY*1.2,
            duration: 1000,
            ease: 'Bounce'
        })

        this.creditsBtn = this.add.sprite(screenCenterX - 1000, screenCenterY*1.32, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(3)
        let creditsText = this.add.text(screenCenterX, screenCenterY*1.3, "C R E D I T S " ,{ 
            fill: '#000' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5).setVisible(false)
        this.tweens.add({
            targets: this.creditsBtn,
            x: screenCenterX,
            y: screenCenterY*1.32,
            duration: 1000,
            ease: 'Bounce'
        })

        this.quitBtn = this.add.sprite(screenCenterX, screenCenterY + 1000, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(3)
        let quitText = this.add.text(screenCenterX, screenCenterY*1.42, "Q U I T " ,{ 
            fill: '#000' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5).setVisible(false)
        this.tweens.add({
            targets: this.quitBtn,
            x: screenCenterX,
            y: screenCenterY*1.44,
            duration: 1000,
            ease: 'Bounce'
        })

        // button text revealed after 1.2 seconds
        this.time.addEvent({
            delay: 1200,
            callback:()=>{
                playText.setVisible(true)
                creditsText.setVisible(true)
                quitText.setVisible(true)
 
                controlsText.setVisible(true)
                leftText.setVisible(true)
                letterA.setVisible(true)
                arrowL.setVisible(true)
                rightText.setVisible(true)
                letterD.setVisible(true)
                arrowR.setVisible(true)
                spacebarText.setVisible(true)
                spaceBar.setVisible(true)
            }
        })

        this.playBtn.on("pointerover", ()=>{
            this.playBtn.setTint(0xd5a8ff)
        })
        this.playBtn.on("pointerout", ()=>{
            playText.y = screenCenterY*1.18
            this.playBtn.clearTint()
        })
        this.playBtn.on("pointerdown", ()=>{
            playText.y += 3
        })
        this.playBtn.on("pointerup", ()=>{
            playText.y -= 3
            this.time.delayedCall(50, () => {
                this.scene.start("GameScene")
            })
        })

        this.creditsBtn.on("pointerover", ()=>{
            this.creditsBtn.setTint(0xd5a8ff)
        })
        this.creditsBtn.on("pointerout", ()=>{
            creditsText.y = screenCenterY*1.3
            this.creditsBtn.clearTint()
        })
        this.creditsBtn.on("pointerdown", ()=>{
            creditsText.y += 3
        })
        this.creditsBtn.on("pointerup", ()=>{
            creditsText.y -= 3
            this.time.delayedCall(50, () => {
                this.scene.start("CreditScene")
            })
        })
        
        this.quitBtn.on("pointerover", ()=>{
            this.quitBtn.setTint(0xd5a8ff)
        })
        this.quitBtn.on("pointerout", ()=>{
            quitText.y = screenCenterY*1.42
            this.quitBtn.clearTint()
        })
        this.quitBtn.on("pointerdown", ()=>{
            quitText.y += 3
        })
        this.quitBtn.on("pointerup", ()=>{
            quitText.y -= 3
            this.time.delayedCall(50, () => {
                this.sound.stopAll()
                alert('Thank you for playing!!!')
                window.location.reload();
            })
        })

        // MUTE BUTTON
        this.muteBtn = this.add.sprite(60, 30, 'uiButtonLarge').setOrigin(.5).setInteractive().setScale(2)
        .on('pointerdown', () => { this.sound.mute = !this.sound.mute })
        this.add.text(60, 25, "M U T E " ,{ 
            fill: '#000' , fontSize: '17px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5)
        
    }
}