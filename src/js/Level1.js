Game.Level1 = function(game) {};

var map;
var layer;

var player;
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

    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.body.collisionWorldBounds = true;

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

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer){
      player.body.velocity.y = -800;
      jumpTimer = this.time.now + 750;
    }
    if(controls.right.isDown) {
      player.body.velocity.x += playerSpeed;
    }
    if(controls.left.isDown) {
      player.body.velocity.x -= playerSpeed;
    }



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
