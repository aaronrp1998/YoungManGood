Game.Level1 = function(game) {};

var map;
var layer;
var shots;
var jumps;
var enemyd;

var player;
var vidaJugador = 100;
var weapon;
var bullets;
var firebutton;
var tiempodis=0;
var dispderch=true;
var tiempoinv;
var invulnerable=false;

var controls = {};
var playerSpeed = 250;
var jumpTimer = 0;

var enemybullets;

var enemy;
var pointenemynewX;
var pointenemynewY;
var detectionpointX;
var detectionpointY;
var detectado=false;
var vuelveenemy = false;
var ve=false;
var nuevapos=false;
var derchen=false;
var reset=false;
var para=false;
var velocidad=-100;

var enemystrg;
var enemysaltlife=5;

var enemyjump;

var torreta;

var enemyconch;
var posicion;
var posicionY;
var undisparo=true;

var enemyocto;
var octox;
var octoy;
var movotcx=300;
var movocty=0;
var vidaocto=3;

Game.Level1.prototype = {

  create:function() {

    this.stage.backgroundColor = '#2ECCFA';
    //2ECCFA
    shots = this.add.audio('shots');
    jumps = this.add.audio('jumps');
    enemyd = this.add.audio('enemyd');
    shots.volume-=0.2;

    map = this.add.tilemap('map',64,64);
    map.addTilesetImage('tileset');
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(13,39);
    map.setTileIndexCallback(12,this.SubirEscaleras,this);
    map.setTileIndexCallback(19,this.ResetPosition,this);
    map.setTileIndexCallback(-1,this.Libre,this);

    enemy= this.add.sprite(1400,7800,'enemy1');
    enemy.scale.setTo(2,2);
    enemy.anchor.setTo(0.5,0.5);
    enemy.enableBody=true;
    this.game.physics.arcade.enable(enemy);

    enemystrg=this.add.sprite(7981,3184,'enemy4');
    enemystrg.scale.setTo(1.7,1.7);
    this.physics.arcade.enable(enemystrg);
    enemystrg.body.gravity.y=1400;

    enemyjump=this.add.sprite(870,8050,'enemy3');
    enemyjump.scale.setTo(2,2);
    this.physics.arcade.enable(enemyjump);
    enemyjump.body.gravity.y=900;

    enemyocto=this.add.sprite(870,8050,'enemy2');
    enemyocto.scale.setTo(2,2);
    this.physics.arcade.enable(enemyocto);

    enemyconch=this.add.sprite(1400,7800,'enemy5');
    enemyconch.scale.setTo(2,2);
    this.physics.arcade.enable(enemyconch);

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
    player.body.collideWorldBounds = true;

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

    enemybullets=this.add.group();
    enemybullets.enableBody = true;
    enemybullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemybullets.createMultiple(30, 'enemybullet');
    enemybullets.setAll('anchor.x', 0.5);
    enemybullets.setAll('anchor.y', 1);
    enemybullets.setAll('outOfBoundsKill', true);
    enemybullets.setAll('checkWorldBounds', true);

    weapon = this.add.weapon(10,'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    // weapon.bulletAngleOffset = 90;
    weapon.bulletSpeed = 300;
    weapon.trackSprite(player,15,30, true);
    firebutton= this.input.keyboard.addKey(Phaser.Keyboard.K);

    musica = this.add.audio('musica');
   // musica.play();

    player.scale.setTo(2,2);

   this.time.events.loop(Phaser.Timer.SECOND*2.5, this.enemigoconcha, this);
   this.game.time.events.loop(Phaser.Timer.SECOND*1.5,this.logicaenemigosaltofuerte , this);
   this.game.time.events.loop(Phaser.Timer.SECOND*1.5, this.logicaenemigosalto, this);
   this.game.time.events.loop(Phaser.Timer.SECOND*3, this.logicaocto, this);

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up: this.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.input.keyboard.addKey(Phaser.Keyboard.S),
    };

  },

  update:function() {

   this.physics.arcade.collide(player,layer);
   this.physics.arcade.collide(enemystrg,layer);
   this.physics.arcade.collide(enemyjump,layer);
  //  this.physics.arcade.gravity.y = 1400;
   //enemy.body.gravity.y = 1400;

    player.body.velocity.x = 0;

    if(vidaJugador>0)
    {
    if(controls.right.isDown) {
      player.scale.setTo(1.8,2);
      player.body.velocity.x += playerSpeed;
    }
    if(firebutton.isDown  && player.body.onFloor() && controls.right.isDown)
    {
      dispderch=true;
      player.animations.play('rundis');
      this.fire();
      shots.play();
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
      shots.play();
    }
  else if(controls.left.isDown && player.body.onFloor() && !firebutton.isDown) {
      dispderch=false;
      player.animations.play('run');
    }

    if(firebutton.isDown  && player.body.onFloor() && (player.body.velocity.x == 0))
    {
      player.animations.play('disiddle');
      this.fire();
      shots.play();
    }

    else if((player.body.velocity.x == 0) && player.body.onFloor()){
      player.animations.play('iddle');
    }

    if(firebutton.isDown  && !player.body.onFloor() && controls.right.isDown)
    {
      dispderch=true;
      player.animations.play('jumpdis');
      this.fire();
      shots.play();
    }

    if(firebutton.isDown  && !player.body.onFloor() && controls.left.isDown)
    {
      dispderch=false;
      player.animations.play('jumpdis');
      this.fire();
      shots.play();
    }
  }
    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer){
      player.body.velocity.y = -800;
      jumpTimer = this.time.now + 750;
      player.animations.play('jump');
      jumps.play();
    }

    if( player.body.velocity.y >=570)
    {
      player.body.velocity.y=520;
    }

    if(player.x > 8896){
      this.state.start('PreloaderBoss');
    }

    if(enemyocto.body.y >= octoy-2 && enemyocto.body.x<= octoy+2 )
    {
        enemyocto.body.velocity.y=0;
    }
    if(enemyocto.body.x >= octox-2 && enemyocto.body.x<= octox+2 )
    {
        enemyocto.body.velocity.x=0;
    }

    if(enemy.inCamera)
    {
        enemy.body.velocity.x=velocidad;
    }
    else
    {
      enemy.body.velocity.x=0;
    }
    if(enemyconch.body.x>=posicion-25 && enemyconch.body.x<=posicion+25 )
    {
        enemyconch.body.velocity.x=0;
        game.physics.arcade.overlap(bullets, enemyconch, mataenemigo, null, this);
        if(undisparo)
        {
        disparocirculo();
        undisparo=false;
        }
    }

    this.logicaenemigovolador();
    this.intocable();

    this.game.physics.arcade.overlap(bullets, enemystrg, this.mataenemigogrande, null, this);
    this.game.physics.arcade.overlap(enemystrg, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(bullets, enemyjump , this.mataenemigo, null, this);
    this.game.physics.arcade.overlap(bullets, enemy , this.mataenemigo, null, this);
    this.game.physics.arcade.overlap(enemyjump, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(enemyocto, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(enemy, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(bullets, enemyocto, this.mataenemigoocto, null, this);

  },
  render:function()
  {
    this.game.debug.text("PosX "+player.body.x,1,100);
    this.game.debug.text("PosY "+player.body.y,1,150);
    this.game.debug.text("Vida"+vidaJugador,1,250);
    //this.game.debug.text("VAR "+enemy.inCamera,1,300);
    this.game.debug.text("detx "+detectionpointX,1,250);
    this.game.debug.text("dety "+detectionpointY,1,300);

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
      enemystrg.body.velocity.y=-600;
     if((enemystrg.body.x-player.body.x <= 375 && enemystrg.body.x-player.body.x >= 0 ))
     {
         enemystrg.scale.setTo(-1.7,1.7);
         enemystrg.body.velocity.x=-90;
     }
     else if (enemystrg.body.x-player.body.x < 0 && enemystrg.body.x-player.body.x >= -375 )
     {
      enemystrg.scale.setTo(1.7,1.7);
      enemystrg.body.velocity.x=90;
     }
     else{
         enemystrg.body.velocity.x=0;
     }
  },
  logicaocto:function()
  {
    octox=enemyocto.body.x + movotcx;
    octoy=enemyocto.body.y + movocty;
    this.game.physics.arcade.moveToXY(enemyocto,octox,octoy,175);
    movocty=-movocty;
    movotcx=-movotcx;
  },
  logicaenemigosalto:function()
  {
    enemyjump.body.velocity.y=-350;
   if((enemyjump.body.x-player.body.x <= 275 && enemyjump.body.x-player.body.x >= 0 ))
   {
       enemyjump.body.velocity.x=-100;
   }
   else if (enemyjump.body.x-player.body.x < 0 && enemyjump.body.x-player.body.x >= -275 )
   {
    enemyjump.body.velocity.x=100;
   }
   else{
       enemyjump.body.velocity.x=0;
   }
  },
  mataenemigogrande:function(enemigo,bullet)
  {
    bullet.kill();
    enemysaltlife=enemysaltlife-1;
    if(enemysaltlife == 0)
    {
        enemigo.kill();
        enemyd.play();
        enemysaltlife=5;
    }
  },

  enemyhitplayer:function()
  {
    if(!invulnerable){
    vidaJugador=vidaJugador-5;
    tiempoinv = this.game.time.now + Phaser.Timer.SECOND*4;
    player.alpha=0.5;
    invulnerable=true;
    }
    if(vidaJugador <= 0)
    {
        player.kill();
        playeralive=false;
    }
  },
  mataenemigo:function(bullet,enemigo)
  {
    bullet.kill();
    enemigo.kill();
    enemyd.play();
  },
  intocable:function()
  {
    if(this.game.time.now >= tiempoinv)
    {
        player.alpha=1;
        invulnerable=false;
    }
  },
  mataenemigoocto:function(enemigo,bullet)
  {
    bullet.kill();
    vidaocto = vidaocto-1;
    if(vidaocto<=0)
    {
      enemigo.kill();
      enemyd.play();
      vidaocto=3;
    }
  },
  enemigoconcha:function() 
  {
     posicion=enemy5.body.x-150;
     posicionY=enemy5.body.y;
     this.physics.arcade.moveToXY(enemy5,posicion,posicionY,100);
     undisparo=true;

  },

  logicaenemigovolador:function()
  {
    if((enemy.body.x-player.body.x <= 175 && enemy.body.x-player.body.x >= -175 ) && (player.body.y-enemy.body.y <= 200 && player.body.y-enemy.body.y >=0) && !detectado)
    {
        detectionpointX = player.body.x;
        detectionpointY = player.body.y;
        if(enemy.body.x-player.body.x <= 175 && enemy.body.x-player.body.x >0 ){
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
        this.game.physics.arcade.moveToXY(enemy,detectionpointX,detectionpointY,200);
    }
    if((enemy.body.x <= detectionpointX + 25 && enemy.body.x >= detectionpointX - 25 ) && (enemy.body.y >= detectionpointY-25 &&  enemy.body.y <= detectionpointY+25) && !para)
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
        this.game.physics.arcade.moveToXY(enemy,pointenemynewX,pointenemynewY,200);
    }
    if((enemy.body.x <= pointenemynewX + 25 && enemy.body.x >= pointenemynewX - 25) && (enemy.body.y <= pointenemynewY+25 && enemy.body.y >= pointenemynewY-25)&& !reset)
    {
        enemy.body.velocity.x=0;
        enemy.body.velocity.y=0;
        nuevapos=false;
        if (derchen)
        {
            velocidad =100;
            enemy.body.velocity.x=velocidad;
            derchen=false;
        }
        else
        {
            velocidad=-100;
            enemy.body.velocity.x=velocidad;
        }
        enemy.body.velocity.y=0;
        detectado=false;
        reset=true;
    }
  },
  enemyfire:function(velx,vely,enemigo3)
  {
      var enemybullet = enemybullets.getFirstExists(false);
     // if (enemybullet && game.time.now>dispaenem )
     // {
          enemybullet.reset(enemigo3.body.x-2, enemigo3.body.y+5);
          enemybullet.body.velocity.x=velx;
          enemybullet.body.velocity.y=vely;
          dispaenem=game.time.now+200;
     // }
  },
  disparocirculo:function()
  {
    enemyfire(-200,-200,enemyconch);
    enemyfire(200,0,enemyconch);
    enemyfire(-200,0,enemyconch);
    enemyfire(-200,200,enemyconch);
    enemyfire(0,200,enemyconch);
    enemyfire(0,-200,enemyconch);
    enemyfire(200,200,enemyconch);
    enemyfire(200,-200,enemyconch);
  },

}
