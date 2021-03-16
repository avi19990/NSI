!function(){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */var e=function(t,i){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])})(t,i)};var t=function(){var e=0,i=document.createElement("div");function s(e){return i.appendChild(e.dom),e}function o(t){for(var s=0;s<i.children.length;s++)i.children[s].style.display=s===t?"block":"none";e=t}i.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:90000",i.addEventListener("click",(function(t){t.preventDefault(),o(++e%i.children.length)}),!1);var a=(performance||Date).now(),h=a,n=0,r=s(new t.Panel("FPS","#0ff","#002")),d=s(new t.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var c=s(new t.Panel("MB","#f08","#201"));return o(0),{REVISION:16,dom:i,addPanel:s,showPanel:o,begin:function(){a=(performance||Date).now()},end:function(){n++;var e=(performance||Date).now();if(d.update(e-a,200),e>=h+1e3&&(r.update(1e3*n/(e-h),100),h=e,n=0,c)){var t=performance.memory;c.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){a=this.end()},domElement:i,setMode:o}};t.Panel=function(e,t,i){var s=1/0,o=0,a=Math.round,h=a(window.devicePixelRatio||1),n=80*h,r=48*h,d=3*h,c=2*h,l=3*h,p=15*h,y=74*h,u=30*h,m=document.createElement("canvas");m.width=n,m.height=r,m.style.cssText="width:80px;height:48px";var S=m.getContext("2d");return S.font="bold "+9*h+"px Helvetica,Arial,sans-serif",S.textBaseline="top",S.fillStyle=i,S.fillRect(0,0,n,r),S.fillStyle=t,S.fillText(e,d,c),S.fillRect(l,p,y,u),S.fillStyle=i,S.globalAlpha=.9,S.fillRect(l,p,y,u),{dom:m,update:function(r,b){s=Math.min(s,r),o=Math.max(o,r),S.fillStyle=i,S.globalAlpha=1,S.fillRect(0,0,n,p),S.fillStyle=t,S.fillText(a(r)+" "+e+" ("+a(s)+"-"+a(o)+")",d,c),S.drawImage(m,l+h,p,y-h,u,l,p,y-h,u),S.fillRect(l+y-h,p,h,u),S.fillStyle=i,S.globalAlpha=.9,S.fillRect(l+y-h,p,h,a((1-r/b)*u))}}};class i extends Phaser.Scene{constructor(){super("MenuScene"),this.isMuted=!1,this.bestScore=0}init(e){void 0!==e.isMuted&&(this.isMuted=e.isMuted),void 0!==e.bestScore&&(this.bestScore=e.bestScore)}preload(){this.load.spritesheet("ArkFont","./assets/fonts/ark_dark.png",{frameWidth:5,frameHeight:6}),this.load.spritesheet("CheckBox","./assets/textures/CheckBox.png",{frameWidth:7,frameHeight:7}),this.load.image("SelectionBorder","./assets/textures/SelectionBorder.png")}create(){this.cameras.main.setBackgroundColor("#c7f0d8"),this.up=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),this.down=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.select=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.startText=[this.add.image(8,30,"ArkFont",18).setOrigin(0,0),this.add.image(14,30,"ArkFont",19).setOrigin(0,0),this.add.image(20,30,"ArkFont",0).setOrigin(0,0),this.add.image(26,30,"ArkFont",17).setOrigin(0,0),this.add.image(32,30,"ArkFont",19).setOrigin(0,0)],this.muteText=[this.add.image(8,38,"ArkFont",12).setOrigin(0,0),this.add.image(14,38,"ArkFont",20).setOrigin(0,0),this.add.image(20,38,"ArkFont",19).setOrigin(0,0),this.add.image(26,38,"ArkFont",4).setOrigin(0,0)],this.scoreNumbers=[this.add.image(42,1,"ArkFont",52).setOrigin(0,0),this.add.image(36,1,"ArkFont",52).setOrigin(0,0),this.add.image(30,1,"ArkFont",52).setOrigin(0,0),this.add.image(24,1,"ArkFont",52).setOrigin(0,0)],this.scoreNumbers[1].visible=!1,this.scoreNumbers[2].visible=!1,this.scoreNumbers[3].visible=!1;for(var e=this.bestScore,t=0;e>0;++t){var i=e%10;this.scoreNumbers[t].setFrame(52+i),(e=Math.floor(e/10))>0&&t<3&&(this.scoreNumbers[t+1].visible=!0)}this.bestText=[this.add.image(1,1,"ArkFont",1).setOrigin(0,0),this.add.image(7,1,"ArkFont",4).setOrigin(0,0),this.add.image(13,1,"ArkFont",18).setOrigin(0,0),this.add.image(19,1,"ArkFont",19).setOrigin(0,0)],this.checkBox=this.add.image(32,37,"CheckBox",this.isMuted?1:0).setOrigin(0,0),this.selected=1,this.upperSelection=this.add.image(6,28,"SelectionBorder").setOrigin(0,0),this.bottomSelection=this.add.image(6,36,"SelectionBorder").setOrigin(0,0),this.clicked=!1}update(e,t){if(this.up.isDown&&(this.selected=1),this.down.isDown&&(this.selected=2),1==this.selected?(this.upperSelection.visible=!0,this.bottomSelection.visible=!1):(this.upperSelection.visible=!1,this.bottomSelection.visible=!0),this.select.isDown&&!this.clicked)switch(this.clicked=!0,this.selected){case 1:this.scene.start("GameScene",{isMuted:this.isMuted,bestScore:this.bestScore});break;case 2:this.isMuted=!this.isMuted,this.isMuted?this.checkBox.setFrame(1):this.checkBox.setFrame(0)}this.select.isUp&&(this.clicked=!1)}}class s extends Phaser.Scene{constructor(){super("GameScene")}init(e){this.isMuted=e.isMuted,this.bestScore=e.bestScore}preload(){this.load.spritesheet("ArkFont","./assets/fonts/ark_dark.png",{frameWidth:5,frameHeight:6}),this.load.image("SpaceShip","./assets/textures/SpaceShip.png"),this.load.image("Enemy1","./assets/textures/Enemy1.png"),this.load.image("Enemy2","./assets/textures/Enemy2.png"),this.load.image("Enemy3","./assets/textures/Enemy3.png"),this.load.image("Bullet","./assets/textures/Bullet.png"),this.load.image("Heart","./assets/textures/Heart.png"),this.load.audio("EnemyHit","./assets/sounds/EnemyHit.wav"),this.load.audio("DeathSound","./assets/sounds/DeathSound.wav"),this.load.audio("SpaceShipHit","./assets/sounds/SpaceShipHit.wav")}create(){this.cameras.main.setBackgroundColor("#c7f0d8"),this.enemySpawnTimer=0,this.right=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),this.left=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),this.up=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),this.down=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),this.fire=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.difficulty=1024,this.difficultyScale=0,this.enemies=this.physics.add.group(),this.myBullets=this.physics.add.group(),this.enemyBullets=this.physics.add.group(),this.spaceShip=this.physics.add.image(24,75,"SpaceShip"),this.spaceShip.spaceShipHealth=3,this.spaceShip.shootingTimer=0,this.hearts=[this.add.image(1,1,"Heart").setOrigin(0,0),this.add.image(7,1,"Heart").setOrigin(0,0),this.add.image(13,1,"Heart").setOrigin(0,0)],this.score=0,this.scoreNumbers=[this.add.image(42,1,"ArkFont",52).setOrigin(0,0),this.add.image(36,1,"ArkFont",52).setOrigin(0,0),this.add.image(30,1,"ArkFont",52).setOrigin(0,0),this.add.image(24,1,"ArkFont",52).setOrigin(0,0)],this.scoreNumbers[1].visible=!1,this.scoreNumbers[2].visible=!1,this.scoreNumbers[3].visible=!1}update(e,t){if(this.difficultyScale=this.difficulty/(e/1e3+this.difficulty/50)+75,this.physics.world.setFPS(Math.round(this.game.loop.actualFps)),this.score+=t/500,this.spaceShip.shootingTimer+=t,this.enemySpawnTimer+=t,this.enemySpawnTimer>=100*this.difficultyScale/5){var i=Math.random();if(i<.1)var s=3;else if(i<.3)s=2;else s=1;switch(s){case 1:var o=Math.round(44*Math.random()+2);(a=this.enemies.create(o,-5,"Enemy1")).enemyType=1,a.health=1,a.shootingTimer=e;break;case 2:o=44*Math.random()+2;(a=this.enemies.create(o,-5,"Enemy2")).enemyType=2,a.health=2,a.shootingTimer=e;break;case 3:var a;o=44*Math.random()+2;(a=this.enemies.create(o,-5,"Enemy3")).enemyType=3,a.health=3,a.shootingTimer=e}this.enemySpawnTimer=0}if(this.right.isDown&&this.spaceShip.body.position.x<43&&(this.spaceShip.body.position.x+=t/1e3*20),this.left.isDown&&this.spaceShip.body.position.x>0&&(this.spaceShip.body.position.x-=t/1e3*20),this.up.isDown&&this.spaceShip.body.position.y>28&&(this.spaceShip.body.position.y-=t/1e3*20),this.down.isDown&&this.spaceShip.body.position.y<78&&(this.spaceShip.body.position.y+=t/1e3*20),this.fire.isDown&&this.spaceShip.shootingTimer>500){let e=this.myBullets.create(Math.round(this.spaceShip.body.position.x)+2,this.spaceShip.body.position.y,"Bullet");e.velocityX=0,e.velocityY=-30,this.spaceShip.shootingTimer=0}for(var h=Math.floor(this.score),n=0;h>0;++n){var r=h%10;this.scoreNumbers[n].setFrame(52+r),(h=Math.floor(h/10))>0&&n<3&&(this.scoreNumbers[n+1].visible=!0)}this.enemies.getChildren().forEach((i=>{if(i.body.position.y+=t/1e3*8,i.body.position.y>90&&i.destroy(),e-i.shootingTimer>=2e3)switch(i.shootingTimer=e,i.enemyType){case 1:(s=this.enemyBullets.create(Math.round(i.body.position.x)+1,i.body.position.y+4,"Bullet")).velocityX=0,s.velocityY=30;break;case 2:var s=this.enemyBullets.create(Math.round(i.body.position.x)+(Math.random()<.5?1:2),i.body.position.y+4,"Bullet"),o=Math.round(this.spaceShip.body.position.y)+3-Math.round(s.body.position.y),a=(Math.round(this.spaceShip.body.position.x)+2-s.body.position.x)*(30/o),h=Math.sqrt(900+a*a);s.velocityX=o>10?a/h*30:0,s.velocityY=o>10?30/h*30:30;break;case 3:(s=this.enemyBullets.create(Math.round(i.body.position.x)+2,i.body.position.y+5,"Bullet")).velocityX=0,s.velocityY=30,(s=this.enemyBullets.create(Math.round(i.body.position.x),i.body.position.y+5,"Bullet")).velocityX=-9.48,s.velocityY=28.46,(s=this.enemyBullets.create(Math.round(i.body.position.x)+5,i.body.position.y+5,"Bullet")).velocityX=9.48,s.velocityY=28.46}})),this.myBullets.getChildren().forEach((e=>{e.body.position.x+=e.velocityX*(t/1e3),e.body.position.y+=e.velocityY*(t/1e3),e.body.position.y<-5&&e.destroy()})),this.enemyBullets.getChildren().forEach((e=>{e.body.position.x+=e.velocityX*(t/1e3),e.body.position.y+=e.velocityY*(t/1e3),e.body.position.y>89&&e.destroy()})),this.physics.collide(this.spaceShip,this.enemies,((e,t)=>{t.destroy(),this.hearts[this.spaceShip.spaceShipHealth-1].visible=!1,this.spaceShip.spaceShipHealth--,this.spaceShip.spaceShipHealth>0&&(this.isMuted||this.sound.play("SpaceShipHit",{volume:.1}))})),this.physics.collide(this.spaceShip,this.enemyBullets,((e,t)=>{t.destroy(),this.hearts[this.spaceShip.spaceShipHealth-1].visible=!1,this.spaceShip.spaceShipHealth--,this.spaceShip.spaceShipHealth>0&&(this.isMuted||this.sound.play("SpaceShipHit",{volume:.1}))})),this.physics.collide(this.enemies,this.myBullets,((e,t)=>{if(t.destroy(),e.health--,this.isMuted||this.sound.play("EnemyHit",{volume:.05}),e.health<=0)switch(e.destroy(),e.enemyType){case 1:this.score+=2;break;case 2:this.score+=5;break;case 3:this.score+=11}})),this.spaceShip.spaceShipHealth<=0&&(this.bestScore<this.score&&(this.bestScore=Math.floor(this.score)),this.isMuted||this.sound.play("DeathSound",{volume:.1}),this.scene.start("MenuScene",{isMuted:this.isMuted,bestScore:this.bestScore}))}}var o=function(o){function a(e){var t=o.call(this,e)||this;return t.ENV="production","production"!==t.ENV&&t.setupStatsJS(),t.scene.add("MenuScene",i,!0),t.scene.add("GameScene",s,!1),t}return function(t,i){function s(){this.constructor=t}e(t,i),t.prototype=null===i?Object.create(i):(s.prototype=i.prototype,new s)}(a,o),a.prototype.setupStatsJS=function(){var e=t();e.showPanel(0),document.body.appendChild(e.dom),this.events.on(Phaser.Core.Events.PRE_STEP,(function(){e.begin()})),this.events.on(Phaser.Core.Events.POST_RENDER,(function(){e.end()}))},a}(Phaser.Game);window.onload=function(){new o({type:Phaser.AUTO,width:48,height:84,audio:{disableWebAudio:!0},physics:{default:"arcade",arcade:{debug:!1}},render:{antialias:!1,pixelArt:!0},scale:{mode:Phaser.Scale.ScaleModes.FIT,autoCenter:Phaser.Scale.CENTER_BOTH}})}}();