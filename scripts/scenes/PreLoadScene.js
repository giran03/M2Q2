class PreLoadScene extends Phaser.Scene
{
    constructor() 
    { 
        super("PreLoadScene")
    }

    preload()
    {
        this.sound.pauseOnBlur = false;
        // this.load.video('background', './assets/background/pix-bg.mp4');
        // this.load.image('fruit', './assets/misc/watermelon.png');
        // this.load.spritesheet('uiButton', './assets/gui/UI_Button.png', { frameWidth: 96, frameHeight: 32 });
        // this.load.audio('confirmSFX', './assets/audio/select.ogg');
        this.load.audio('bgm', './assets/audio/bgm.ogg');
        this.load.audio('projectileSFX', './assets/audio/projectile.ogg');
        this.load.audio('powerUpSFX', './assets/audio/powerUp.ogg');
        this.load.audio('victorySFX', './assets/audio/victory.ogg');
        this.load.audio('defeatSFX', './assets/audio/defeat.ogg');
        this.load.audio('defeat2SFX', './assets/audio/defeat2.ogg');

        this.load.image('bgLVL1', './assets/background/level_1.png');
        this.load.image('powerUp', './assets/misc/powerUp.png');
        
        this.load.spritesheet('inaIdle', './assets/player/Ina_IdleAnim.png', { frameWidth: 140, frameHeight: 175 });
        this.load.spritesheet('inaRun', './assets/player/Ina_RunAnim-Sheet.png', { frameWidth: 150, frameHeight: 170 });
        this.load.spritesheet('normalTako', './assets/misc/Takodachi.png', { frameWidth: 42, frameHeight: 42 });
        this.load.spritesheet('hungryTako', './assets/misc/Hungry_Takodachi.png', { frameWidth: 42, frameHeight: 42 });
        
        this.load.spritesheet('spaceKey', './assets/gui/SPACE.png', { frameWidth: 67, frameHeight: 16 });
        this.load.spritesheet('letterKeys', './assets/gui/letter_keys.png', { frameWidth: 17, frameHeight: 16 });
        this.load.spritesheet('arrowKeys', './assets/gui/arrow_keys.png', { frameWidth: 17, frameHeight: 16 });
        this.load.spritesheet('uiButtonLarge', './assets/gui/buttonsLarge.png', { frameWidth: 48, frameHeight: 16 });

        this.load.image('tentacle', './assets/misc/playerProjectile.png');
        this.load.image('border', './assets/misc/border.jpg');

        this.load.on("progress", (percent)=> {
            console.log("loading: "+ percent)
        })

        this.add.text(config.width*.3,config.height*.5,"L O A D I N G . . .", {
            fontSize: '30px'
        })
    }

    create() 
    {
        // 🗿 PLAYER ANIMATION 🗿
        this.anims.create({
            key: 'playerIdle',
            frames: this.anims.generateFrameNumbers('inaIdle', { start: 0, end: 3 }),
            frameRate: 6,
            repeat: -1
        })
        this.anims.create({
            key: 'playerAttack',
            frames: this.anims.generateFrameNumbers('inaRun', { start: 0, end: 5 }),
            frameRate: 8,
            repeat: -1
        })

        // 🐙 ENEMIES ANIMATION 🐙
        this.anims.create({
            key: 'TakoNormal',
            frames: this.anims.generateFrameNumbers('normalTako', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        })
        this.anims.create({
            key: 'TakoHungry',
            frames: this.anims.generateFrameNumbers('hungryTako', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        })

        // BUTTON ANIMATION
        this.anims.create({
            key: 'animL',
            frames: this.anims.generateFrameNumbers('arrowKeys', { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: 'animR',
            frames: this.anims.generateFrameNumbers('arrowKeys', { start: 4, end: 5 }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: 'animLetterL',
            frames: this.anims.generateFrameNumbers('letterKeys', { start: 2, end: 3 }),
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: 'animLetterR',
            frames: this.anims.generateFrameNumbers('letterKeys', { start: 4, end: 5 }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: 'animSpacebar',
            frames: this.anims.generateFrameNumbers('spaceKey', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        })
        console.log("Loading Scene Done!")
        this.scene.start("MainMenuScene")
    }
}