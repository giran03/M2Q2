var config = {
    type: Phaser.AUTO,
    width: 540,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 }
        }
    },
    fps: {
        target: 120,
        forceSetTimeOut: true
    },
    scene: [PreLoadScene,MainMenuScene,CreditScene,GameScene,GameVictoryScene,GameOverScene],
    render: {
        pixelArt: true,
        antialias: false
    }
};

const game = new Phaser.Game(config)