Enemy = function(index,game,x,y){

    this.enemy = game.add.sprite(x,y,'enemy1');
    this.enemy.anchor.setTo(0.5,0.5);
    this.enemy.name = index.toString();
    game.physics.enable(thid.enemy,Phaser.Physics.ARCADE);
    this.enemy.body.inmovable = true;
    this.bird.body.collisionWorldBounds = true;

};



Game.Level1 = function(game) {};

var map;
var layer;

var player;
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

    enemy3 = this.add.sprite(896,8256,'enemy3');
    enemy3.enablebody = true;
    this.physics.arcade.enable(enemy3);
    enemy3.body.gravity = 900;
    enemy3.anchor.setTo(0.5,0.5);

    this.time.events.loop(Phaser.Timer.SECOND*2, logicaenemigosaltofuerte, this);

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

  logicaenemigosaltofuerte:function(){
    enemy3.body.velocity.y=-200;
   if((enemy3.body.x-player.body.x <= 175 && enemy3.body.x-player.body.x >= 0 )) {
       enemy3.scale.x=-1;
       enemy3.body.velocity.x=-100;
   }
   else if (enemy3.body.x-player.body.x < 0 && enemy43body.x-player.body.x >= -175 ) {
    enemy3.scale.x=1;
    enemy3.body.velocity.x=100;
   }
   else{
       enemy3.body.velocity.x=0;
   }
 }

}
