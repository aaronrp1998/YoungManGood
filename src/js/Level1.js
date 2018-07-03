Game.Level1 = function(game) {};

var map;
var layer;
var shots;
var jumps;
var enemyd;
var enemysh;

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

var livingenemybullets=[];
//var enemy;
var pointenemynewX;
var pointenemynewY;
var detectionpointX;
var detectionpointY;
/*var detectado=false;
var vuelveenemy = false;
var ve=false;
var nuevapos=false;
var derchen=false;
var reset=false;
var para=false;
var velocidad=-100;*/

var enemyflys;
var livingenemy=[];

var enemystrg;
var enemysaltlife=5;

var enemyjumps;
var livingenemyjumps=[];

var torretas;
var torretaalive=[];

var enemytorretas;
var livingtorretas=[];


var enemyconch;
var posicion;
var posicionY;
var undisparo=true;
var conch=true;

var enemyconchs;
var livingenemyconch=[];

var enemyocto;
var octox;
var octoy;
var movotcx=100;
var movocty=0;
var vidaocto=3;
var dispaenem;

var enemyoctos;
var livingenemyocto=[];

Game.Level1.prototype = {

  create:function() {

    this.stage.backgroundColor = '#2ECCFA';
    //2ECCFA
    shots = this.add.audio('shots');
    jumps = this.add.audio('jumps');
    enemyd = this.add.audio('enemyd');
    enemysh=this.add.audio('enemysh');
    shots.volume-=0.2;

    map = this.add.tilemap('map',64,64);
    map.addTilesetImage('tileset');
    layer = map.createLayer(0);
    layer.resizeWorld();
    map.setCollisionBetween(13,39);
    map.setTileIndexCallback(12,this.SubirEscaleras,this);
    map.setTileIndexCallback(19,this.ResetPosition,this);
    map.setTileIndexCallback(-1,this.Libre,this);

   /* enemy= this.add.sprite(1400,7800,'enemy1');
    enemy.scale.setTo(2,2);
    enemy.anchor.setTo(0.5,0.5);
    enemy.enableBody=true;
    this.game.physics.arcade.enable(enemy);*/
    
    enemyflys=this.add.group();
    enemyflys.enableBody=true;
    enemyflys.physicsBodyType=Phaser.Physics.ARCADE;

    this.creaenemyfly();

   /* enemyjump=this.add.sprite(870,8050,'enemy3');
    enemyjump.scale.setTo(2,2);
    this.physics.arcade.enable(enemyjump);
    enemyjump.body.gravity.y=900;*/
    enemyjumps=this.add.group();
    enemyjumps.enableBody=true;
    enemyjumps.physicsBodyType=Phaser.Physics.ARCADE;

    this.creaenemyjumps();

   /* enemyocto=this.add.sprite(870,8050,'enemy2');
    enemyocto.scale.setTo(2,2);
    this.physics.arcade.enable(enemyocto);*/

    enemyoctos=this.add.group();
    enemyoctos.enableBody=true;
    enemyoctos.physicsBodyType=Phaser.Physics.ARCADE;

    this.creaenemyocto();
    
    enemystrg=this.add.sprite(7981,3184,'enemy4');
    enemystrg.scale.setTo(1.7,1.7);
    this.physics.arcade.enable(enemystrg);
    enemystrg.body.gravity.y=1400;

   /* enemyconch=this.add.sprite(1400,7800,'enemy5');
    enemyconch.scale.setTo(2,2);
    this.physics.arcade.enable(enemyconch);*/

    enemyconchs=this.add.group();
    enemyconchs.enableBody=true;
    enemyconchs.physicsBodyType=Phaser.Physics.ARCADE;

    this.creaenemyconch();

   /* torretas=this.add.sprite(890,7900,'torreta');
    torretas.scale.setTo(2,2);
    torretas.enableBody=true;
    this.physics.arcade.enable(torretas);*/

    enemytorretas=this.add.group();
    enemytorretas.enableBody=true;
    enemytorretas.physicsBodyType=Phaser.Physics.ARCADE;

    this.creatorretas();

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
    enemybullets.createMultiple(300, 'enemybullet');
    enemybullets.setAll('anchor.x', 0.5);
    enemybullets.setAll('anchor.y', 1);
   // enemybullets.setAll('scale',2,2);
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
   this.time.events.loop(Phaser.Timer.SECOND*3.5, this.logicatorretas, this);

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
   this.physics.arcade.collide(enemyjumps,layer);
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


    this.logicaenemigovolador();
    this.intocable();
    this.updateocto();
    this,this.updateenemigoconch();

    this.physics.arcade.overlap(bullets, enemytorretas, this.matatorreta, null, this);
    this.game.physics.arcade.overlap(bullets, enemystrg, this.mataenemigogrande, null, this);
    this.game.physics.arcade.overlap(enemystrg, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(bullets, enemyjumps , this.mataenemigo, null, this);
    this.game.physics.arcade.overlap(bullets, enemyflys , this.mataenemigo, null, this);
    this.game.physics.arcade.overlap(enemyjumps, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(enemyoctos, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(enemyconchs, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(torretas, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(enemyflys, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(bullets, enemyoctos, this.mataenemigoocto, null, this);
    this.physics.arcade.overlap(enemybullets, player, this.bullethitplayer, null, this);

  },
  render:function()
  {
    this.game.debug.text("PosX "+player.body.x,1,100);
    this.game.debug.text("PosY "+player.body.y,1,150);
    this.game.debug.text("Vida"+vidaJugador,1,200);
    this.game.debug.text("VAR "+player.alive,1,300);
   // this.game.debug.text("detx "+detectionpointX,1,250);
    //this.game.debug.text("dety "+detectionpointY,1,300);

  },
  creaenemyjumps:function()
  {
    for(var i=0;i<9;i++){
      if(i===0)
      {
      var enemyjump=enemyjumps.create(1270,8050,'enemy3');
      enemyjump.scale.setTo(2,2);
      enemyjump.body.gravity.y=900;
      }
      if(i===1)
      {
      var enemyjump=enemyjumps.create(3721,6642,'enemy3');
      enemyjump.scale.setTo(2,2);
      enemyjump.body.gravity.y=900;
      }
      if(i===2)
      {
      var enemyjump=enemyjumps.create(3711,5042,'enemy3');
      enemyjump.scale.setTo(2,2);
      enemyjump.body.gravity.y=900;
      }
      if(i===3)
      {
      var enemyjump=enemyjumps.create(3906,4274,'enemy3');
      enemyjump.scale.setTo(2,2);
      enemyjump.body.gravity.y=900;
      }
      if(i===4)
      {
      var enemyjump=enemyjumps.create(4167,3954,'enemy3');
      enemyjump.scale.setTo(2,2);
      enemyjump.body.gravity.y=900;
      }
      if(i===5)
      {
      var enemyjump=enemyjumps.create(5839,498,'enemy3');
      enemyjump.scale.setTo(2,2);
      enemyjump.body.gravity.y=900;
      }
      if(i===6)
      {
      var enemyjump=enemyjumps.create(6086,434,'enemy3');
      enemyjump.scale.setTo(2,2);
      enemyjump.body.gravity.y=900;
      }
      if(i===7)
      {
      var enemyjump=enemyjumps.create(6406,180,'enemy3');
      enemyjump.scale.setTo(2,2);
      enemyjump.body.gravity.y=900;
      }
      if(i===8)
      {
      var enemyjump=enemyjumps.create(7506,434,'enemy3');
      enemyjump.scale.setTo(2,2);
      enemyjump.body.gravity.y=900;
      }
    }
  },
  creaenemyfly:function()
  {
    for(var i=0;i<4;i++)
    {
    
      if(i===0)
      {
        var enemy=enemyflys.create(1400,7800,'enemy1');
        enemy.scale.setTo(2,2);
        enemy.anchor.setTo(0.5,0.5);
      //  enemy.body.velocity.x=velocidad;
      }
      if(i===1)
      { var enemy=enemyflys.create(1600,7600,'enemy1');
      enemy.scale.setTo(2,2);
      enemy.anchor.setTo(0.5,0.5);
     // enemy.body.velocity.x=velocidad;
      }
      if(i===2)
      { var enemy=enemyflys.create(2000,7600,'enemy1');
      enemy.scale.setTo(2,2);
      enemy.anchor.setTo(0.5,0.5);
     // enemy.body.velocity.x=velocidad;
      }
      if(i===3)
      { var enemy=enemyflys.create(8000,50,'enemy1');
      enemy.scale.setTo(2,2);
      enemy.anchor.setTo(0.5,0.5);
      //enemy.body.velocity.x=velocidad;
      }
    }
  },
  creatorretas:function()
  {
    for(var i=0;i<9;i++)
    {
      if(i===0)
      {
        var torreta=enemytorretas.create(3799.4,8048,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===1)
      {
        var torreta=enemytorretas.create(3798.4,7536,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===2)
      {
        var torreta=enemytorretas.create(3926.4,7104,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===3)
      {
        var torreta=enemytorretas.create(3414.4,7056,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===4)
      {
        var torreta=enemytorretas.create(3926.4,6140,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===5)
      {
        var torreta=enemytorretas.create(3542.4,6079,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===6)
      {
        var torreta=enemytorretas.create(3926.4,5250,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===7)
      {
        var torreta=enemytorretas.create(3798.4,4890,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===8)
      {
        var torreta=enemytorretas.create(5974.4,890,'torreta');
        torreta.scale.setTo(2,2);
      }
    }
  },
  creaenemyocto:function()
  {
    for(var i=0;i<5;i++)
    {
      if(i===0)
      {
        var eocto=enemyoctos.create(5840.4,2950,'enemy2');
        eocto.scale.setTo(2,2);
      }
      if(i===1)
      {
        var eocto=enemyoctos.create(5574,2350,'enemy2');
        eocto.scale.setTo(2,2);
      }
      if(i===2)
      {
        var eocto=enemyoctos.create(5446,1990,'enemy2');
        eocto.scale.setTo(2,2);
      }
      if(i===3)
      {
        var eocto=enemyoctos.create(5446,1800,'enemy2');
        eocto.scale.setTo(2,2);
      }
      if(i===4)
      {
        var eocto=enemyoctos.create(5504,1000,'enemy2');
        eocto.scale.setTo(2,2);
      }
    }
  },

  creaenemyconch:function()
  {
    for(var i=0;i<3;i++)
    {
      if(i===0)
      {
        var enemyconcha=enemyconchs.create(8400,750,'enemy5');
        enemyconcha.scale.setTo(2,2);
      }
      if(i===1)
      {
        var enemyconcha=enemyconchs.create(8200,1050,'enemy5');
        enemyconcha.scale.setTo(2,2);
      }
      if(i===2)
      {
        var enemyconcha=enemyconchs.create(8400,1950,'enemy5');
        enemyconcha.scale.setTo(2,2);
      }
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
    livingenemyocto.length=0;

    enemyoctos.forEachAlive(function(eocto){livingenemyocto.push(eocto)});

    for(var i=0;i<livingenemyocto.length;i++)
    {
    var enemyoctoe=livingenemyocto[i];
    octox=enemyoctoe.body.x + movotcx;
    octoy=enemyoctoe.body.y + movocty;
    this.game.physics.arcade.moveToXY(enemyoctoe,octox,octoy,175);
    movocty=-movocty;
    movotcx=-movotcx;
    }
  },

  updateocto:function()
  {
    livingenemyocto.length=0;

    enemyoctos.forEachAlive(function(eocto){livingenemyocto.push(eocto)});

    for(var i=0;i<livingenemyocto.length;i++)
    {
    var enemyoctoe=livingenemyocto[i];
    if(enemyoctoe.body.y >= octoy-2 && enemyoctoe.body.x<= octoy+2 )
    {
        enemyoctoe.body.velocity.y=0;
    }
    if(enemyoctoe.body.x >= octox-2 && enemyoctoe.body.x<= octox+2 )
    {
        enemyoctoe.body.velocity.x=0;
    }
  }
  },

  logicaenemigosalto:function()
  {
    livingenemyjumps.length=0;

    enemyjumps.forEachAlive(function(enemyjump){livingenemyjumps.push(enemyjump)});

    for(var i=0;i<livingenemyjumps.length;i++){
      var enemyjumpo=livingenemyjumps[i];
      if(enemyjumpo.inCamera)
      {
    enemyjumpo.body.velocity.y=-350;
   if((enemyjumpo.body.x-player.body.x <= 275 && enemyjumpo.body.x-player.body.x >= 0 ))
   {
       enemyjumpo.body.velocity.x=-100;
   }
   else if (enemyjumpo.body.x-player.body.x < 0 && enemyjumpo.body.x-player.body.x >= -275 )
   {
    enemyjumpo.body.velocity.x=100;
   }
   else{
       enemyjumpo.body.velocity.x=0;
      }
    }
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
    tiempoinv = this.game.time.now + Phaser.Timer.SECOND*2;
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
    livingenemyconch.length=0;
    enemyconchs.forEachAlive(function(enemyconcha){livingenemyconch.push(enemyconcha)});

    for(var i=0;i<livingenemyconch.length;i++)
    {
      var enemyconche=livingenemyconch[i];
    if(enemyconche.inCamera){
     posicion=enemyconche.body.x-150;
     posicionY=enemyconche.body.y;
     this.physics.arcade.moveToXY(enemyconche,posicion,posicionY,100);
     undisparo=true;
      }
    }

  },

  updateenemigoconch:function()
  {
    livingenemyconch.length=0;
    enemyconchs.forEachAlive(function(enemyconcha){livingenemyconch.push(enemyconcha)});

    for(var i=0;i<livingenemyconch.length;i++)
    {
      var enemyconche=livingenemyconch[i];
    if(enemyconche.body.x>=posicion-25 && enemyconche.body.x<=posicion+25 )
    {
        enemyconche.body.velocity.x=0;
        this.physics.arcade.overlap(bullets, enemyconchs, this.mataenemigo, null, this);
        if(undisparo)
        {
        this.disparocirculo(enemyconche);
        undisparo=false;
        }
      }
    }
  },

  logicaenemigovolador:function()
  {
    livingenemy.length=0;

    enemyflys.forEachAlive(function(enemy){livingenemy.push(enemy)});

    for(var i=0;i<livingenemy.length;i++)
    {
    var enemyv=livingenemy[i];

    var detectado=false;
    var vuelveenemy = false;
    var ve=false;
    var nuevapos=false;
    var derchen=false;
    var reset=false;
    var para=false;
    var velocidad=-100;

    if(enemyv.inCamera)
    {
        enemyv.body.velocity.x=velocidad;
    }
    else
    {
      enemyv.body.velocity.x=0;
    }
    if((enemyv.body.x-player.body.x <= 200 && enemyv.body.x-player.body.x >= -200 ) && (player.body.y-enemyv.body.y <= 200 && player.body.y-enemyv.body.y >=0) && !detectado)
    {
        detectionpointX = player.body.x;
        detectionpointY = player.body.y;
        if(enemyv.body.x-player.body.x <= 200 && enemyv.body.x-player.body.x >0 ){
            pointenemynewX = enemyv.body.x - 200;
        }
        else
        {
            pointenemynewX = enemyv.body.x + 200;
            derchen=true;
        }
        pointenemynewY = enemyv.body.y;
        detectado=true;
        ve=true;
        para=false;
    }
    if(ve)
    {
        this.game.physics.arcade.moveToXY(enemyv,detectionpointX,detectionpointY,200);
    }
    if((enemyv.body.x <= detectionpointX + 25 && enemyv.body.x >= detectionpointX - 25 ) && (enemyv.body.y >= detectionpointY-25 &&  enemyv.body.y <= detectionpointY+25) && !para)
    {
        enemyv.body.velocity.x=0;
        enemyv.body.velocity.y=0;
        ve=false;
        reset=false;
        nuevapos=true;
        para=true;
    }
    if(nuevapos)
    {
        this.game.physics.arcade.moveToXY(enemyv,pointenemynewX,pointenemynewY,200);
    }
    if((enemyv.body.x <= pointenemynewX + 25 && enemyv.body.x >= pointenemynewX - 25) && (enemyv.body.y <= pointenemynewY+25 && enemyv.body.y >= pointenemynewY-25)&& !reset)
    {
        enemyv.body.velocity.x=0;
        enemyv.body.velocity.y=0;
        nuevapos=false;
        if (derchen)
        {
            velocidad =100;
            enemyv.body.velocity.x=velocidad;
            derchen=false;
        }
        else
        {
            velocidad=-100;
            enemyv.body.velocity.x=velocidad;
        }
        enemyv.body.velocity.y=0;
        detectado=false;
        reset=true;
    }
   
  }
  },
  enemyfire:function(velx,vely,enemigo)
  {
      var enemybullet = enemybullets.getFirstExists(false);
     // if (enemybullet && game.time.now>dispaenem )
     // {
          enemybullet.reset(enemigo.body.x+20, enemigo.body.y+30);
          enemybullet.body.velocity.x=velx;
          enemybullet.body.velocity.y=vely;
          dispaenem=this.time.now+200;
     // }
  },
  disparocirculo:function(enemyconcha)
  {
    if(conch){
    enemysh.play();
    this.enemyfire(-200,-200,enemyconcha);
    this.enemyfire(200,0,enemyconcha);
    this.enemyfire(-200,0,enemyconcha);
    this.enemyfire(-200,200,enemyconcha);
    this.enemyfire(0,200,enemyconcha);
    this.enemyfire(0,-200,enemyconcha);
    this.enemyfire(200,200,enemyconcha);
    this.enemyfire(200,-200,enemyconcha);
    }
  },
  bullethitplayer:function(player,enemybullet)
  {
    if(!invulnerable){
    enemybullet.kill();
    vidaJugador=vidaJugador-10;
    tiempoinv = this.time.now + Phaser.Timer.SECOND*2;
    player.alpha=0.5;
    invulnerable=true;
    }
    if(vidaJugador <= 0)
    {
        player.kill();
        playeralive=false;
    }
  },
  logicatorretas:function()
  {
    livingtorretas.length=0;
    enemytorretas.forEachAlive(function(torreta){livingtorretas.push(torreta)});

    for(var i=0;i<livingtorretas.length;i++)
    {
    var torretar=livingtorretas[i];
    if(torretar.alive && torretar.inCamera){
    enemysh.play();
    this.enemyfire(-200,-200,torretar);
    this.enemyfire(-200,-100,torretar);
    this.enemyfire(-200,0,torretar);
    this.enemyfire(-200,200,torretar);
    }
  }
  },
  matatorreta:function(bullet,enemigo)
  {
    enemyd.play();
    bullet.kill();
    enemigo.kill();
  },
  mataconch:function(bullet,enemigo)
  {
    enemyd.play();
    bullet.kill();
    enemigo.kill();
    conch=false;
  },

}
