import 'phaser'
import Stats from 'stats-js/src/Stats'
import MenuScene from './scenes/MenuScene'
import GameScene from './scenes/GameScene'

let game: Phaser.Game;

class Game extends Phaser.Game
{
    public ENV: string;

    constructor(gameConfig: Phaser.Types.Core.GameConfig)
    {
        super(gameConfig);
        this.ENV = '__buildEnv__';
        if (this.ENV !== 'production')
        {
            this.setupStatsJS();
        }
        this.scene.add('MenuScene', MenuScene, true);
        this.scene.add('GameScene', GameScene, false);
    }

    private setupStatsJS()
    {
        const stats = Stats();
        stats.showPanel(0);
        document.body.appendChild(stats.dom);
        this.events.on(Phaser.Core.Events.PRE_STEP, () => {
            stats.begin();
        });
        this.events.on(Phaser.Core.Events.POST_RENDER, () => {
            stats.end();
        });
    }
}

window.onload = () => {
    game = new Game({
        type: Phaser.AUTO,
        width: 48,
        height: 84,
        audio: {
            disableWebAudio: true
        },
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        render: {
            antialias: false,
            pixelArt: true
        },
        scale: {
            mode: Phaser.Scale.ScaleModes.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
    });
}