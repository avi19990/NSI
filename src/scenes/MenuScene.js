import 'Phaser'

export default class MenuScene extends Phaser.Scene
{
    constructor()
    {
        super('MenuScene');
        this.isMuted = false;
        this.bestScore = 0;
    }

    init(data)
    {
        if (typeof data.isMuted != 'undefined')
            this.isMuted = data.isMuted;
        if (typeof data.bestScore != 'undefined')
            this.bestScore = data.bestScore;
    }

    preload()
    {
        this.load.spritesheet('ArkFont', './assets/fonts/ark_dark.png', {
            frameWidth: 5,
            frameHeight: 6
        });
        this.load.spritesheet('CheckBox', './assets/textures/CheckBox.png', {
            frameWidth: 7,
            frameHeight: 7
        });

        this.load.image('SelectionBorder', './assets/textures/SelectionBorder.png');
    }

    create()
    {
        this.cameras.main.setBackgroundColor('#c7f0d8');

        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.select = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.startText = [
            this.add.image(8, 30, 'ArkFont', 18).setOrigin(0, 0),
            this.add.image(14, 30, 'ArkFont', 19).setOrigin(0, 0),
            this.add.image(20, 30, 'ArkFont', 0).setOrigin(0, 0),
            this.add.image(26, 30, 'ArkFont', 17).setOrigin(0, 0),
            this.add.image(32, 30, 'ArkFont', 19).setOrigin(0, 0)
        ];

        this.muteText = [
            this.add.image(8, 38, 'ArkFont', 12).setOrigin(0, 0),
            this.add.image(14, 38, 'ArkFont', 20).setOrigin(0, 0),
            this.add.image(20, 38, 'ArkFont', 19).setOrigin(0, 0),
            this.add.image(26, 38, 'ArkFont', 4).setOrigin(0, 0)
        ];

        this.scoreNumbers = [
            this.add.image(42, 1, 'ArkFont', 52).setOrigin(0, 0),
            this.add.image(36, 1, 'ArkFont', 52).setOrigin(0, 0),
            this.add.image(30, 1, 'ArkFont', 52).setOrigin(0, 0),
            this.add.image(24, 1, 'ArkFont', 52).setOrigin(0, 0),
        ];

        this.scoreNumbers[1].visible = false;
        this.scoreNumbers[2].visible = false;
        this.scoreNumbers[3].visible = false;

        var bestScore = this.bestScore;
        for (var i = 0; bestScore > 0; ++i)
        {
            var digit = bestScore % 10;
            this.scoreNumbers[i].setFrame(52 + digit);
            
            bestScore = Math.floor(bestScore / 10);

            if (bestScore > 0 && i < 3)
                this.scoreNumbers[i + 1].visible = true;
        }

        this.bestText = [
            this.add.image(1, 1, 'ArkFont', 1).setOrigin(0, 0),
            this.add.image(7, 1, 'ArkFont', 4).setOrigin(0, 0),
            this.add.image(13, 1, 'ArkFont', 18).setOrigin(0, 0),
            this.add.image(19, 1, 'ArkFont', 19).setOrigin(0, 0)
        ];

        this.checkBox = this.add.image(32, 37, 'CheckBox', ((this.isMuted) ? 1 : 0)).setOrigin(0, 0);

        this.selected = 1;
        this.upperSelection = this.add.image(6, 28, 'SelectionBorder').setOrigin(0, 0);
        this.bottomSelection = this.add.image(6, 36, 'SelectionBorder').setOrigin(0, 0);

        this.clicked = false;
    }

    update(time, delta)
    {
        if (this.up.isDown)
            this.selected = 1;
        if (this.down.isDown)
            this.selected = 2;

        if (this.selected == 1)
        {
            this.upperSelection.visible = true;
            this.bottomSelection.visible = false;
        }
        else
        {
            this.upperSelection.visible = false;
            this.bottomSelection.visible = true;
        }

        if (this.select.isDown && !this.clicked)
        {
            this.clicked = true;

            switch (this.selected)
            {
                case 1:
                    this.scene.start('GameScene', {isMuted:this.isMuted, bestScore:this.bestScore});
                    break;
                case 2:
                    this.isMuted = !this.isMuted;
                    if (this.isMuted)
                        this.checkBox.setFrame(1);
                    else
                        this.checkBox.setFrame(0);
                    break;
            }
        }
        if (this.select.isUp)
            this.clicked = false;
    }
}