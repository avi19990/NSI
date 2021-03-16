import 'Phaser'

export default class GameScene extends Phaser.Scene
{
    constructor()
    {
        super('GameScene');
    }

    init(data)
    {
        this.isMuted = data.isMuted;
        this.bestScore = data.bestScore;
    }

    preload()
    {
        this.load.spritesheet('ArkFont', './assets/fonts/ark_dark.png', {
            frameWidth: 5,
            frameHeight: 6
        });

        this.load.image('SpaceShip', './assets/textures/SpaceShip.png');
        this.load.image('Enemy1', './assets/textures/Enemy1.png');
        this.load.image('Enemy2', './assets/textures/Enemy2.png');
        this.load.image('Enemy3', './assets/textures/Enemy3.png');
        this.load.image('Bullet', './assets/textures/Bullet.png');
        this.load.image('Heart', './assets/textures/Heart.png');

        this.load.audio('EnemyHit', './assets/sounds/EnemyHit.wav');
        this.load.audio('DeathSound', './assets/sounds/DeathSound.wav');
        this.load.audio('SpaceShipHit', './assets/sounds/SpaceShipHit.wav');
    }

    create()
    {
        this.cameras.main.setBackgroundColor('#c7f0d8');

        this.enemySpawnTimer = 0;

        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.difficulty = 1024;
        this.difficultyScale = 0;

        this.enemies = this.physics.add.group();
        this.myBullets = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();

        this.spaceShip = this.physics.add.image(24, 75, 'SpaceShip')
        this.spaceShip.spaceShipHealth = 3;
        this.spaceShip.shootingTimer = 0;

        this.hearts = [
            this.add.image(1, 1, 'Heart').setOrigin(0, 0),
            this.add.image(7, 1, 'Heart').setOrigin(0, 0),
            this.add.image(13, 1, 'Heart').setOrigin(0, 0)
        ];

        this.score = 0;
        this.scoreNumbers = [
            this.add.image(42, 1, 'ArkFont', 52).setOrigin(0, 0),
            this.add.image(36, 1, 'ArkFont', 52).setOrigin(0, 0),
            this.add.image(30, 1, 'ArkFont', 52).setOrigin(0, 0),
            this.add.image(24, 1, 'ArkFont', 52).setOrigin(0, 0)
        ];
        this.scoreNumbers[1].visible = false;
        this.scoreNumbers[2].visible = false;
        this.scoreNumbers[3].visible = false;
    }

    update(time, delta)
    {
        this.difficultyScale = this.difficulty / ((time / 1000) + (this.difficulty / 50)) + 75;

        this.physics.world.setFPS(Math.round(this.game.loop.actualFps));

        this.score += delta / 500;

        this.spaceShip.shootingTimer += delta;
        this.enemySpawnTimer += delta;

        //Enemy spawning
        if (this.enemySpawnTimer >= (this.difficultyScale * 100 / 5))
        {
            var randNum = Math.random();
            if (randNum < 0.1)
                var enemyType = 3;
            else if (randNum < 0.3)
                var enemyType = 2;
            else
                var enemyType = 1;

            switch (enemyType)
            {
                case 1:
                    var randomPositionX = Math.round((Math.random() * 44) + 2);
                    var enemy = this.enemies.create(randomPositionX, -5, 'Enemy1');
                    enemy.enemyType = 1;
                    enemy.health = 1;
                    enemy.shootingTimer = time;
                    break;
                case 2:
                    var randomPositionX = (Math.random() * 44) + 2;
                    var enemy = this.enemies.create(randomPositionX, -5, 'Enemy2');
                    enemy.enemyType = 2;
                    enemy.health = 2;
                    enemy.shootingTimer = time;
                    break;
                case 3:
                    var randomPositionX = (Math.random() * 44) + 2;
                    var enemy = this.enemies.create(randomPositionX, -5, 'Enemy3');
                    enemy.enemyType = 3;
                    enemy.health = 3;
                    enemy.shootingTimer = time;
                    break;
            }

            this.enemySpawnTimer = 0;
        }

        //User input
        if (this.right.isDown && this.spaceShip.body.position.x < 43)
        {
            this.spaceShip.body.position.x += 20 * (delta / 1000);
        }
        if (this.left.isDown && this.spaceShip.body.position.x > 0)
        {
            this.spaceShip.body.position.x -= 20 * (delta / 1000);
        }
        if (this.up.isDown && this.spaceShip.body.position.y > 28)
        {
            this.spaceShip.body.position.y -= 20 * (delta / 1000);
        }
        if (this.down.isDown && this.spaceShip.body.position.y < 78)
        {
            this.spaceShip.body.position.y += 20 * (delta / 1000);
        }
        if (this.fire.isDown && this.spaceShip.shootingTimer > 500)
        {
            let bullet = this.myBullets.create(Math.round(this.spaceShip.body.position.x) + 2, this.spaceShip.body.position.y, 'Bullet');
            bullet.velocityX = 0;
            bullet.velocityY = -30;

            this.spaceShip.shootingTimer = 0;
        }

        //Updating score numbers
        var scoreTrimmed = Math.floor(this.score);
        for (var i = 0; scoreTrimmed > 0; ++i)
        {
            var digit = scoreTrimmed % 10;
            this.scoreNumbers[i].setFrame(52 + digit);
            
            scoreTrimmed = Math.floor(scoreTrimmed / 10);

            if (scoreTrimmed > 0 && i < 3)
                this.scoreNumbers[i + 1].visible = true;
        }

        //Updating objects
        this.enemies.getChildren().forEach((enemy) => { 
            enemy.body.position.y += 8 * (delta / 1000);
            if (enemy.body.position.y > 90)
            enemy.destroy();
            
            if (time - enemy.shootingTimer >= 2000)
            {
                enemy.shootingTimer = time;

                switch (enemy.enemyType)
                {
                    case 1:
                        var bullet = this.enemyBullets.create(Math.round(enemy.body.position.x) + 1, enemy.body.position.y + 4, 'Bullet');
                        bullet.velocityX = 0;
                        bullet.velocityY = 30;
                        break;
                    case 2:
                        var bullet = this.enemyBullets.create(Math.round(enemy.body.position.x) + ((Math.random() < 0.5) ? 1 : 2), enemy.body.position.y + 4, 'Bullet');

                        var offsetY = Math.round(this.spaceShip.body.position.y) + 3 - Math.round(bullet.body.position.y);
                        var offsetX = (Math.round(this.spaceShip.body.position.x) + 2) - bullet.body.position.x;

                        var velocityX = offsetX * (30 / offsetY);
                        var velocityDistance = Math.sqrt(900 + velocityX * velocityX);

                        bullet.velocityX = (offsetY > 10) ? (velocityX / velocityDistance * 30) : 0;
                        bullet.velocityY = (offsetY > 10) ? (30 / velocityDistance * 30) : 30;
                        break;
                    case 3:
                        var bullet = this.enemyBullets.create(Math.round(enemy.body.position.x) + 2, enemy.body.position.y + 5, 'Bullet');
                        bullet.velocityX = 0;
                        bullet.velocityY = 30;
                        var bullet = this.enemyBullets.create(Math.round(enemy.body.position.x), enemy.body.position.y + 5, 'Bullet');
                        bullet.velocityX = -9.48;
                        bullet.velocityY = 28.46;
                        var bullet = this.enemyBullets.create(Math.round(enemy.body.position.x) + 5, enemy.body.position.y + 5, 'Bullet');
                        bullet.velocityX = 9.48;
                        bullet.velocityY = 28.46;
                        break;
                }
            }
        });

        this.myBullets.getChildren().forEach((bullet) => {
            bullet.body.position.x += bullet.velocityX * (delta / 1000);
            bullet.body.position.y += bullet.velocityY * (delta / 1000);
            if (bullet.body.position.y < -5)
                bullet.destroy();
        });

        this.enemyBullets.getChildren().forEach((bullet) => {
            bullet.body.position.x += bullet.velocityX * (delta / 1000);
            bullet.body.position.y += bullet.velocityY * (delta / 1000);
            if (bullet.body.position.y > 89)
                bullet.destroy();
        });
        
        //Checking collisions
        this.physics.collide(this.spaceShip, this.enemies, (ship, enemy) => {
            enemy.destroy();
            this.hearts[this.spaceShip.spaceShipHealth - 1].visible = false;
            this.spaceShip.spaceShipHealth--;
            if (this.spaceShip.spaceShipHealth > 0)
                if (!this.isMuted)
                    this.sound.play('SpaceShipHit', { volume: 0.1 });
        });

        this.physics.collide(this.spaceShip, this.enemyBullets, (ship, bullet) => {
            bullet.destroy();
            this.hearts[this.spaceShip.spaceShipHealth - 1].visible = false;
            this.spaceShip.spaceShipHealth--;
            if (this.spaceShip.spaceShipHealth > 0)
                if (!this.isMuted)
                    this.sound.play('SpaceShipHit', { volume: 0.1 });
        });

        this.physics.collide(this.enemies, this.myBullets, (enemy, bullet) => {
            bullet.destroy();
            enemy.health--;
            if (!this.isMuted)
                this.sound.play('EnemyHit', { volume: 0.05 });
            if (enemy.health <= 0)
            {
                enemy.destroy();
                switch (enemy.enemyType)
                {
                    case 1:
                        this.score += 2;
                        break;
                    case 2:
                        this.score += 5;
                        break;
                    case 3:
                        this.score += 11;
                        break;
                }
            }
        });

        if (this.spaceShip.spaceShipHealth <= 0)
        {
            if (this.bestScore < this.score)
                this.bestScore = Math.floor(this.score);
            
            if (!this.isMuted)
                this.sound.play('DeathSound', { volume: 0.1 });
            
            this.scene.start('MenuScene', {isMuted:this.isMuted, bestScore:this.bestScore});
        }
    }
}