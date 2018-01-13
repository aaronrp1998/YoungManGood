Enemy = function(index,game,x,y){

    this.enemy = game.add.sprite(x,y,'enemy');
    this.enemy.anchor.setTo(0.5,0.5);
    this.enemy.name = index.toString();
    game.physics.enable(thid.enemy,Phaser.Physics.ARCADE);
    this.enemy.body.inmovable = true;
    this.bird.body.collisionWorldBounds = true;

    if((enemy.body.x-player.body.x <= 75 && enemy.body.x-player.body.x >= -75 ) && (player.body.y-enemy.body.y <= 100 && player.body.y-enemy.body.y >=0) && !detectado)
    {
        detectionpointX = player.body.x;
        detectionpointY = player.body.y;
        if(enemy.body.x-player.body.x <= 75 && enemy.body.x-player.body.x >0 ){
            pointenemynewX = enemy.body.x - 200;
        }
        else
        {
            pointenemynewX = enemy.body.x + 200;
            derchen=true;
        }
        pointenemynewY = enemy.body.y;
        detectado=true;
        ve=true;
        para=false;
    }
    if(ve)
    {
        game.physics.arcade.moveToXY(enemy,detectionpointX,detectionpointY,200);
    }
    if((enemy.body.x <= detectionpointX + 2 && enemy.body.x >= detectionpointX - 2 ) && (enemy.body.y >= detectionpointY-2 &&  enemy.body.y <= detectionpointY+2) && !para)
    {
        enemy.body.velocity.x=0;
        enemy.body.velocity.y=0;
        ve=false;
        reset=false;
        nuevapos=true;
        para=true;
    }
    if(nuevapos)
    {
        game.physics.arcade.moveToXY(enemy,pointenemynewX,pointenemynewY,200);
    }
    if((enemy.body.x <= pointenemynewX + 2 && enemy.body.x >= pointenemynewX - 2) && (enemy.body.y <= pointenemynewY+1 && enemy.body.y >= pointenemynewY-1)&& !reset)
    {
        enemy.body.velocity.x=0;
        enemy.body.velocity.y=0;
        nuevapos=false;
        if (derchen)
        {
            enemy.body.velocity.x=100;
            derchen=false;
        }
        else
        {
            enemy.body.velocity.x=-100;
        }
        enemy.body.velocity.y=0;
        detectado=false;
        reset=true;
    }
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
    this.physics.arcade.gravity.y = 1400;

    map = this.add.tilemap('map',64,64);
    map.addTilesetImage('tileset');
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(13,39);
    map.setTileIndexCallback(12,this.SubirEscaleras,this);
    map.setTileIndexCallback(19,this.ResetPosition,this);


    player = this.add.sprite(570,8050, 'player');
    player.anchor.setTo(0.5,0.5);
    player.animations.add('start',[25,26,27,28],7,true);
    player.animations.add('iddle',[0],1,true);
    player.animations.add('jump',[4],1,true);
    player.animations.add('run',[1,2,3,2],7,true);

    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.body.collisionWorldBounds = true;

    musica = this.add.audio('musica');
    musica.play();

    player.animations.play('start');

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up: this.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.input.keyboard.addKey(Phaser.Keyboard.S),
    };

  },

  update:function() {

    this.physics.arcade.collide(player,layer);

    player.body.velocity.x = 0;

    this.Generarenemigo

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer){
      player.animations.play('jump')
      player.body.velocity.y = -800;
      jumpTimer = this.time.now + 750;
    }
    if(controls.right.isDown) {
      player.animations.play('run');
      player.scale.setTo(1,1);
      player.body.velocity.x += playerSpeed;
    }
    if(controls.left.isDown) {
      player.animations.play('run');
      player.scale.setTo(-1,1);
      player.body.velocity.x -= playerSpeed;
    }

  },

  Generarenemigo:function() {
    new Enemy(0,game,player.x+400,player.y-200);
  },

  ResetPosition:function() {
    player.reset(570,8050);
  },

  SubirEscaleras:function() {
    if (controls.up.isDown){
      player.body.velocity.y = -300;
    }
    if(controls.down.isDown){
      player.body.velocity.y = 300;
    }
  }

}
