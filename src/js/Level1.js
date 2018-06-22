Game.Level1 = function(game) {};

var map;
var layer;

var player;
var vidaJugador = 100;
var weapon;
var bullets;
var firebutton;
var tiempodis=0;
var dispderch=true;

var controls = {};
var playerSpeed = 250;
var jumpTimer = 0;

var enemy;

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
    map.setTileIndexCallback(-1,this.Libre,this);

    enemy=this.add.sprite(860,8050,'enemy4');
    enemy.scale.setTo(1.7,1.7);
    this.physics.arcade.enable(enemy);

    player = this.add.sprite(570,8050, 'player');
    player.anchor.setTo(0.5,0.5);
    player.animations.add('iddle',[0],1,true);
    player.animations.add('jump',[4],1,true);
    player.animations.add('run',[1,2,3],7,true);
    player.animations.add('stairs',[5,6,7],7,true);
    player.animations.add('stairsiddle'[6],1,true);
    player.animations.add('disiddle',[8],1,true);
    player.animations.add('rundis',[9,10,11],7,true);
    player.animations.add('jumpdis',[12],1,true);
   // player.body.gravity.y = 1400;

    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.body.gravity.y = 1400;
    player.body.collisionWorldBounds = true;

    flyingenemy=this.add.group();
    flyingenemy.enableBody=true;
    flyingenemy.physicsBodyType = Phaser.Physics.ARCADE;

    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(300, 'bullet', 0, false);
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

    musica = this.add.audio('musica');
   // musica.play();

    player.scale.setTo(2,2);

   this.game.time.events.loop(Phaser.Timer.SECOND*2, logicaenemigosaltofuerte(), this);

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up: this.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.input.keyboard.addKey(Phaser.Keyboard.S),
    };

  },

  update:function() {

   this.physics.arcade.collide(player,layer);
   this.physics.arcade.collide(enemy,layer);
  //  this.physics.arcade.gravity.y = 1400;
   //enemy.body.gravity.y = 1400;

    player.body.velocity.x = 0;

    
    if(controls.right.isDown) {
      player.scale.setTo(1.8,2);
      player.body.velocity.x += playerSpeed;
    }
    if(firebutton.isDown  && player.body.onFloor() && controls.right.isDown)
    {
      dispderch=true;
      player.animations.play('rundis');
      this.fire();
    }
    else if(controls.right.isDown && player.body.onFloor() && !firebutton.isDown ) {
      dispderch=true;
      player.animations.play('run');
    }
    if(controls.left.isDown) {
      player.scale.setTo(-1.8,2);
      player.body.velocity.x -= playerSpeed;
    }
    if(firebutton.isDown  && player.body.onFloor() && controls.left.isDown)
    {
      dispderch=false;
      player.animations.play('rundis');
      this.fire();
    }
  else if(controls.left.isDown && player.body.onFloor() && !firebutton.isDown) {
      dispderch=false;
      player.animations.play('run');
    }

    if(firebutton.isDown  && player.body.onFloor() && (player.body.velocity.x == 0))
    {
      player.animations.play('disiddle');
      this.fire();
    }

    else if((player.body.velocity.x == 0) && player.body.onFloor()){
      player.animations.play('iddle');
    }

    if(firebutton.isDown  && !player.body.onFloor() && controls.right.isDown)
    {
      dispderch=true;
      player.animations.play('jumpdis');
      this.fire();
    }

    if(firebutton.isDown  && !player.body.onFloor() && controls.left.isDown)
    {
      dispderch=false;
      player.animations.play('jumpdis');
      this.fire();
    }

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer){
      player.body.velocity.y = -800;
      jumpTimer = this.time.now + 750;
      player.animations.play('jump');
    }

    if( player.body.velocity.y >=570)
    {
      player.body.velocity.y=520;
    }

    if(player.x > 8896){
      this.state.start('PreloaderBoss');
    }

  },

  ResetPosition:function() {
    player.reset(570,8050);
  },

  SubirEscaleras:function() {

    player.body.gravity.y = 0;
    
    if(!controls.up.isDown && !controls.down.isDown)
    {
      player.animations.play('stairsiddle');
    }

    if (controls.up.isDown){
      player.body.velocity.y = -300;
      player.animations.play('stairs');
    }

    else if(controls.down.isDown){
      player.body.velocity.y = 300;
      player.animations.play('stairs');
    }
    else
    {
      player.body.velocity.y = 0;
    }
    
  },

  fire:function() {
      if (this.time.now > tiempodis)
      {
      var bullet = bullets.getFirstExists(false);
        if (bullet)
           {
              
               if(dispderch){
               bullet.reset(player.body.x+50, player.body.y+30);
               bullet.body.velocity.x=400;
               }
               else
               {
                  bullet.reset(player.body.x+50, player.body.y+30,);
                  bullet.body.velocity.x=-400;
               }
               tiempodis = this.time.now + 200;
               bullet.rotation=player.rotation;
           }
      }
       
  },

  resetBullet:function(bullet) {
          bullet.kill();
  },
  Libre:function() {
  player.body.gravity.y = 1400;
  },
  
  logicaenemigosaltofuerte:function()
  {
      enemy.body.velocity.y=-200;
     if((enemy.body.x-player.body.x <= 375 && enemy.body.x-player.body.x >= 0 ))
     {
         enemy.scale.x=-1;
         enemy.body.velocity.x=-100;
     }
     else if (enemy.body.x-player.body.x < 0 && enemy.body.x-player.body.x >= -375 )
     {
      enemy.scale.x=1;
      enemy.body.velocity.x=100;
     }
     else{
         enemy.body.velocity.x=0;
     }
  },


}
