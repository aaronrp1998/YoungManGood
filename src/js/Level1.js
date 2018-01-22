Game.Level1 = function(game) {};

var map;
var layer;

var player;
var vidaJugador = 100;
var weapon;
var bullets;
var firebutton;

var enemybullets;
var enemy;
//var enemy2;
var enemy3;
//var enemy4;
//var enemy5;
var torreta;
var vidaenemigo=5;
var dispaenem=0;
var undisparo=true;
var torretaalive=true;
var contadorEnemy = 0;

var controls = {};
var playerSpeed = 250;
var jumpTimer = 0;

Game.Level1.prototype = {

  create:function() {

    this.stage.backgroundColor = '#2ECCFA';
    //2ECCFA

    map = this.add.tilemap('map',64,64);
    map.addTilesetImage('tileset');
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(13,39);
    map.setTileIndexCallback(12,this.SubirEscaleras,this);
    map.setTileIndexCallback(19,this.ResetPosition,this);
    map.setTileIndexCallback(13,this.cambioNivel,this);


    player = this.add.sprite(570,8050, 'player');
    player.anchor.setTo(0.5,0.5);
    player.animations.add('iddle',[0],1,true);
    player.animations.add('jump',[4],1,true);
    player.animations.add('run',[1,2,3],7,true);
    player.animations.add('stairs',[5,6,7],7,true);
    player.animations.add('stairsiddle'[6],1,true);

    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.body.collisionWorldBounds = true;

    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    weapon = this.add.weapon(10,'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    // weapon.bulletAngleOffset = 90;
    weapon.bulletSpeed = 300;
    weapon.trackSprite(player,15,30, true);
    firebutton= this.input.keyboard.addKey(Phaser.Keyboard.K);

    enemy = this.add.sprite(7808,1280,'enemy1');
    enemy.scale.setTo(2,2);

    enemy3 = this.add.sprite(1408,7808,'enemy3');
    this.physics.arcade.enable(enemy3);
    enemy3.anchor.setTo(0.5,0.5);
    enemy3.body.collisionWorldBounds = true;

    torreta = this.add.sprite(3296,8064,'torreta');
    torreta.scale.setTo(2,2);

    this.time.events.loop(Phaser.Timer.SECOND*2, this.logicaenemigosaltofuerte, this);
    this.time.events.loop(Phaser.Timer.SECOND*3.5, this.logicatorretas, this);

    musica = this.add.audio('musica');
    musica.play();

    player.scale.setTo(2,2);

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up: this.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.input.keyboard.addKey(Phaser.Keyboard.S),
    };

  },

  update:function() {

    this.physics.arcade.collide(player,layer);
    this.physics.arcade.collide(enemy3,layer);
    this.physics.arcade.gravity.y = 1400;

    player.body.velocity.x = 0;



    if(enemy3.body.onFloor() && enemy3.body.touching.down){
      enemy3.body.velocity.x=0;
    }

    if(controls.right.isDown) {
      player.scale.setTo(2,2);
      player.body.velocity.x += playerSpeed;
    }
    if(controls.right.isDown && player.body.onFloor()) {
      player.animations.play('run');
    }
    if(controls.left.isDown) {
      player.scale.setTo(-2,2);
      player.body.velocity.x -= playerSpeed;
    }
    if(controls.left.isDown && player.body.onFloor()) {
      player.animations.play('run');
    }

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer){
      player.body.velocity.y = -800;
      jumpTimer = this.time.now + 750;
      player.animations.play('jump');
    }

    if(firebutton.isDown)
    {
      this.fire;
    }

    if((player.body.velocity.x == 0) && player.body.onFloor()){
      player.animations.play('iddle');
    }

  },

  ResetPosition:function() {
    player.reset(570,8050);
  },

  SubirEscaleras:function() {

    player.body.gravity.y = 0;

    if (controls.up.isDown){
      player.body.velocity.y = -300;
      player.animations.play('stairs');
    }

    if(controls.down.isDown){
      player.body.velocity.y = 300;
      player.animations.play('stairs');
    }

    if(player.body.velocity.y == 0){
      player.animations.play('stairsiddle');
    }

  },

  cambioNivel:function() {
    this.state.start('Level1Boss');
  },

  fire:function() {
      if (this.time.now > tiempodis)
      {
      var bullet = bullets.getFirstExists(false);
        if (bullet)
           {
               bullet.reset(player.body.x+10, player.body.y+30);
               if(dispderch){
               bullet.body.velocity.x=200;
               }
               else
               {
                  bullet.body.velocity.x=-200;
               }
               tiempodis = this.time.now + 200;
               bullet.rotation=player.rotation;
           }
      }
  },

  resetBullet:function(bullet) {
          bullet.kill();
  },

  logicaenemigosaltofuerte:function(){
    enemy3.body.velocity.y=-600;
   if(enemy3.body.x-player.body.x < 0) {
       enemy3.scale.x=1;
       enemy3.body.velocity.x=20;
   }
   else if (enemy3.body.x-player.body.x > 0) {
      enemy3.scale.x=-1;
      enemy3.body.velocity.x=-20;
   }
   else{
       enemy3.body.velocity.x=0;
   }
 },

 enemyfire:function(velx,vely,enemigo3)
 {
     var enemybullet = enemybullets.getFirstExists(false);
         enemybullet.reset(enemigo3.body.x-2, enemigo3.body.y+5);
         enemybullet.body.velocity.x=velx;
         enemybullet.body.velocity.y=vely;
         dispaenem=this.time.now+200;
 },

 logicatorretas:function()
 {
     if(torretaalive){
     enemyfire(-200,-200,torretas);
     enemyfire(-200,-100,torretas);
     enemyfire(-200,0,torretas);
     enemyfire(-200,200,torretas);
     }
 }

}
