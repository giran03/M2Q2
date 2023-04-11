class CreditScene extends Phaser.Scene
{
    constructor() 
    { 
        super("CreditScene")
        // button
        this.backBtn
        
    }

    create() {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        let backgroundImage = this.add.image(screenCenterX, screenCenterY, 'bgLVL1');
        backgroundImage.displayHeight = 960
        backgroundImage.displayWidth = 540

        this.backBtn = this.add.sprite(80, 30, 'uiButtonLarge').setOrigin(.5).setScale(3).setInteractive()
        let backText = this.add.text(80, 20, "B A C K " ,{
            fill: '#000' , fontSize: '20px', fontStyle: 'italic' , fontFamily: 'impact'
        }).setOrigin(.5)

        this.backBtn.on("pointerover", ()=>{
            this.backBtn.setTint(0xd5a8ff)
        })
        this.backBtn.on("pointerout", ()=>{
            this.backBtn.clearTint()
        })
        this.backBtn.on("pointerdown", ()=>{
            backText.y += 3
        })
        this.backBtn.on("pointerup", ()=>{
            backText.y -= 3
            this.time.delayedCall(50, () => {
                this.scene.start("MainMenuScene")
            })
        })

        // DEVELOPER INFORMATION
        let devInfo = this.add.text(config.width - 1000, screenCenterY*.75, "Developer: Guillan Fredd T. Parreño\n\nSection: A223\n\nProgram: EMC", {
            fontSize: '25px', fontFamily: 'impact', align: 'center'
        }).setOrigin(.5).setShadow(2, 2, '#000', 5, true, true)
        this.tweens.add({
            targets: devInfo,
            x: screenCenterX,
            y: screenCenterY*.75,
            duration: 1000,
            ease: 'Bounce'
        })
        
        // PLAYER SPRITE
        let player = this.add.sprite(config.width + 1000, screenCenterY*1.4, "inaIdle")
        .play('playerIdle', true)
        .setScale(1)
        this.tweens.add({
            targets: player,
            x: screenCenterX,
            y: screenCenterY*1.4,
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
        

    }
}