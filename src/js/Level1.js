Game.Level1 = function(game) {};

var map;
var layer;
var shots;
var jumps;
var enemyd;
var enemysh;

var botonpausa;
var pausa=false;
var waittime=0;

var player;
var vidaJugador = 100;
var weapon;
var bullets;
var firebutton;
var tiempodis=0;
var dispderch=true;
var tiempoinv;
var invulnerable=false;
var puntos=0;
var vidas=2;
var livingplayerbullets=[];

var drop;

var controls = {};
var playerSpeed = 250;
var jumpTimer = 0;

var enemybullets;

var livingenemybullets=[];

var pointenemynewX;
var pointenemynewY;
var detectionpointX;
var detectionpointY;


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
var movotcx=300;
var movocty=0;
var vidaocto=3;

var enemyocto1;
var octox1;
var octoy1;
var movotcx1=100;
var movocty1=0;
var vidaocto1=3;

var enemyocto2;
var octox2;
var octoy2;
var movotcx2=300;
var movocty2=0;
var vidaocto2=3;

var enemyocto3;
var octox3;
var octoy3;
var movotcx3=300;
var movocty3=0;
var vidaocto3=3;

var dispaenem;

var enemyoctos;
var livingenemyocto=[];

var onetime=true;
var zonabo=true;

var vidap;
var vidag;
var puntosp;
var puntosg;

var eliminabalastimer;
var livingdrops=[];
var tiempoespera;

var texto;
var textovidas;
var textopuntos;
///////////FINAL BOSS///////////////////////////////////////////////////////////////////////////////////

var finalboss;
var bossbullets;
var vidaboss=50;
var bossinv=false;
var tiempbossinv;
var posbalx;
var posbaly;
var tienebala=true;
var atacabala=false;
var vuelve;
var bossalive=true;
var deadbullet=false;
var numsaltos;
var descansa=false;
var calculasaltos=true;
var saltox;
var saltoy;
var tiempodescanso;
var mueveboss=false;
var saltalado=300;
var knockback=false;
var movjefe=1.65;
var furioso=false;
var descanso=4.15;
var undesc=true;
var bossdrop;

//////////////////////////////////////////////////////////////////////////////////////////////////////


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
    map.setCollisionBetween(14,39);
    map.setTileIndexCallback(12,this.SubirEscaleras,this);
    map.setTileIndexCallback(19,this.ResetPosition,this);
    map.setTileIndexCallback(-1,this.Libre,this);

 
    
    enemyflys=this.add.group();
    enemyflys.enableBody=true;
    enemyflys.physicsBodyType=Phaser.Physics.ARCADE;

    this.creaenemyfly();

   
    enemyjumps=this.add.group();
    enemyjumps.enableBody=true;
    enemyjumps.physicsBodyType=Phaser.Physics.ARCADE;

    this.creaenemyjumps();

    enemyocto=this.add.sprite(5540.4,2950,'enemy2');
    enemyocto.scale.setTo(2,2);
    this.physics.arcade.enable(enemyocto);

    enemyocto1=this.add.sprite(5500,2356,'enemy2');
    enemyocto1.scale.setTo(2,2);
    this.physics.arcade.enable(enemyocto1);

    enemyocto2=this.add.sprite(5250,1990,'enemy2');
    enemyocto2.scale.setTo(2,2);
    this.physics.arcade.enable(enemyocto2);

    enemyocto3=this.add.sprite(5250,1800,'enemy2');
    enemyocto3.scale.setTo(2,2);
    this.physics.arcade.enable(enemyocto3);

  
    
    enemystrg=this.add.sprite(7981,3184,'enemy4');
    enemystrg.scale.setTo(1.7,1.7);
    this.physics.arcade.enable(enemystrg);
    enemystrg.body.gravity.y=1400;


    enemyconchs=this.add.group();
    enemyconchs.enableBody=true;
    enemyconchs.physicsBodyType=Phaser.Physics.ARCADE;

    this.creaenemyconch();

   
    enemytorretas=this.add.group();
    enemytorretas.enableBody=true;
    enemytorretas.physicsBodyType=Phaser.Physics.ARCADE;

    this.creatorretas();


    player = this.add.sprite(570,8110, 'player');
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

    //BOSS
    finalboss= this.add.sprite(10890, 3130, 'bossS');
    finalboss.animations.add('iddleboss',[0],1,true);
    finalboss.animations.add('jumpboss',[1],1,true);
    finalboss.animations.add('dispboss',[2],1,true);
    //finalboss.anchor.setTo(0.5,0.1);
    finalboss.scale.setTo(1.25,1.25);
    this.physics.arcade.enable(finalboss);
    finalboss.body.gravity.y = 900;
    finalboss.body.collideWorldBounds = true;
    finalboss.animations.play('idleboss');

    flyingenemy=this.add.group();
    flyingenemy.enableBody=true;
    flyingenemy.physicsBodyType = Phaser.Physics.ARCADE;

    vidap=this.add.group();
    vidap.enableBody=true;
    vidap.physicsBodyType=Phaser.Physics.ARCADE;

    vidag=this.add.group();
    vidag.enableBody=true;
    vidag.physicsBodyType=Phaser.Physics.ARCADE;

    puntosp=this.add.group();
    puntosp.enableBody=true;
    puntosp.physicsBodyType=Phaser.Physics.ARCADE;

    puntosg=this.add.group();
    puntosg.enableBody=true;
    puntosg.physicsBodyType=Phaser.Physics.ARCADE;

    bossdrop=this.add.group();
    bossdrop.enableBody=true;
    bossdrop.physicsBodyType=Phaser.Physics.ARCADE;

    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
   
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    bossbullets=this.add.group();
    bossbullets.enableBody = true;
    bossbullets.physicsBodyType = Phaser.Physics.ARCADE;
    bossbullets.createMultiple(30, 'bossbullet');
    bossbullets.setAll('anchor.x', 0.5);
    bossbullets.setAll('anchor.y', 0.5);
    bossbullets.setAll('outOfBoundsKill', true);
    bossbullets.setAll('checkWorldBounds', true);


    enemybullets=this.add.group();
    enemybullets.enableBody = true;
    enemybullets.physicsBodyType = Phaser.Physics.ARCADE;
  
    enemybullets.setAll('anchor.x', 0.5);
    enemybullets.setAll('anchor.y', 1);
    enemybullets.setAll('outOfBoundsKill', true);
    enemybullets.setAll('checkWorldBounds', true);

    weapon = this.add.weapon(10,'bullet');
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
  
    weapon.bulletSpeed = 300;
    weapon.trackSprite(player,15,30, true);
    firebutton= this.input.keyboard.addKey(Phaser.Keyboard.K);
    botonpausa=this.input.keyboard.addKey(Phaser.Keyboard.P);

    musica = this.add.audio('musica');
    musica.play();
    player.scale.setTo(2,2);
   
   this.time.events.loop(Phaser.Timer.SECOND*2.5, this.enemigoconcha, this);
   this.game.time.events.loop(Phaser.Timer.SECOND*1.5,this.logicaenemigosaltofuerte , this);
   this.game.time.events.loop(Phaser.Timer.SECOND*1.5, this.logicaenemigosalto, this);
   this.game.time.events.loop(Phaser.Timer.SECOND*3, this.logicaocto, this);
   this.game.time.events.loop(Phaser.Timer.SECOND*3, this.logicaocto1, this);
   this.game.time.events.loop(Phaser.Timer.SECOND*3, this.logicaocto2, this);
   this.game.time.events.loop(Phaser.Timer.SECOND*3, this.logicaocto3, this);
   this.time.events.loop(Phaser.Timer.SECOND*3.5, this.logicatorretas, this);

   this.time.events.loop(Phaser.Timer.SECOND*2.5, this.bossfireing, this);
   this.time.events.loop(Phaser.Timer.SECOND*2, this.numerosaltos, this);


    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up: this.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.input.keyboard.addKey(Phaser.Keyboard.S),
    };

  },

  update:function() {


    if(vidas<=-1)
    {
      this.state.start('Boot');
    }
   this.physics.arcade.collide(player,layer);
   this.physics.arcade.collide(enemystrg,layer);
   this.physics.arcade.collide(enemyjumps,layer);
   this.physics.arcade.collide(finalboss,layer);

   this.physics.arcade.collide(vidag,layer);
   this.physics.arcade.collide(vidap,layer);
   this.physics.arcade.collide(puntosp,layer);
   this.physics.arcade.collide(puntosg,layer);
   this.physics.arcade.collide(bossdrop,layer);
 
    if(botonpausa.isDown && this.time.now>waittime)
    {
      pausa=!pausa;
      waittime=this.time.now+300;
    }
    player.body.velocity.x = 0;
    if(!pausa){
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

    this.logicaenemigovolador();
    this.intocable();
    this.updateocto();
    this.updateenemigoconch();
    this.replacetiles();
    this.zonaboss();

    if(this.time.now>eliminabalastimer)
    {
    this.eliminabalas();
    }
    this.eliminadrops();
    this.bossintocable();
    this.updateboss();

    this.physics.arcade.overlap(bullets, enemytorretas, this.matatorreta, null, this);
    this.game.physics.arcade.overlap(bullets, enemystrg, this.mataenemigogrande, null, this);
    this.game.physics.arcade.overlap(enemystrg, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(bullets, enemyjumps , this.mataenemigo, null, this);
    this.game.physics.arcade.overlap(bullets, enemyflys , this.mataenemigo, null, this);
    this.game.physics.arcade.overlap(enemyjumps, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(enemyocto, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(enemyocto1, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(enemyocto2, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(enemyocto3, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(enemyconchs, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(torretas, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(enemyflys, player, this.enemyhitplayer, null, this);
    this.game.physics.arcade.overlap(bullets, enemyocto, this.mataenemigoocto, null, this);
    this.game.physics.arcade.overlap(bullets, enemyocto1, this.mataenemigoocto1, null, this);
    this.game.physics.arcade.overlap(bullets, enemyocto2, this.mataenemigoocto2, null, this);
    this.game.physics.arcade.overlap(bullets, enemyocto3, this.mataenemigoocto3, null, this);
    this.physics.arcade.overlap(enemybullets, player, this.bullethitplayer, null, this);

     //COLISIONES
     this.physics.arcade.overlap(finalboss, player, this.enemyhitplayer, null, this);
     this.physics.arcade.overlap(bullets, finalboss, this.killboss, null, this);
     this.physics.arcade.overlap(bossbullets, finalboss, this.balaboss, null, this);
     this.physics.arcade.overlap(bossbullets, player, this.bulletbosshitplayer, null, this);

     this.physics.arcade.overlap(vidap, player, this.sumavidap, null, this);
     this.physics.arcade.overlap(vidag, player, this.sumavidag, null, this);
     this.physics.arcade.overlap(puntosp, player, this.sumapuntosp, null, this);
     this.physics.arcade.overlap(puntosg, player, this.sumapuntosg, null, this);

     this.physics.arcade.overlap(bossdrop, player, this.finjuego, null, this);
  }

  },
  render:function()
  {
    this.game.debug.text("VIDA: "+vidaJugador+'%',1,50);
    this.game.debug.text("VIDAS "+vidas,1,100);
    this.game.debug.text("PUNTOS: "+puntos,1,150);
  

  },
  creaenemyjumps:function()
  {
    for(var i=0;i<9;i++){
      if(i===0)
      {
      var enemyjump=enemyjumps.create(1270,8100,'enemy3');
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
     
      }
      if(i===1)
      { var enemy=enemyflys.create(1600,7600,'enemy1');
      enemy.scale.setTo(2,2);
      enemy.anchor.setTo(0.5,0.5);

      }
      if(i===2)
      { var enemy=enemyflys.create(2000,7600,'enemy1');
      enemy.scale.setTo(2,2);
      enemy.anchor.setTo(0.5,0.5);
    
      }
      if(i===3)
      { var enemy=enemyflys.create(8000,50,'enemy1');
      enemy.scale.setTo(2,2);
      enemy.anchor.setTo(0.5,0.5);
     
      }
    }
  },
  creatorretas:function()
  {
    for(var i=0;i<9;i++)
    {
      if(i===0)
      {
        var torreta=enemytorretas.create(3805.4,7930,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===1)
      {
        var torreta=enemytorretas.create(3802.4,7440,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===2)
      {
        var torreta=enemytorretas.create(3931.4,7170,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===3)
      {
        var torreta=enemytorretas.create(3419.4,7080,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===4)
      {
        var torreta=enemytorretas.create(3931.4,6210,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===5)
      {
        var torreta=enemytorretas.create(3547.4,6079,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===6)
      {
        var torreta=enemytorretas.create(3931.4,5310,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===7)
      {
        var torreta=enemytorretas.create(3803.4,4920,'torreta');
        torreta.scale.setTo(2,2);
      }
      if(i===8)
      {
        var torreta=enemytorretas.create(5979.4,890,'torreta');
        torreta.scale.setTo(2,2);
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
    player.reset(570,8100);
    vidas=vidas-1;
    if(vidas<=-1)
    {
      player.kill();
      vidaJugador=0;
    }
  },

  ResetPositionP:function() {
    player.reset(570,8100);
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
      var bullet; 

               if(dispderch){
               bullet=bullets.create(player.body.x+60, player.body.y+40,'bullet');
               bullet.body.velocity.x=400;
               }
               else
               {
               bullet=bullets.create(player.body.x-10, player.body.y+40,'bullet');
                  bullet.body.velocity.x=-400;
               }
               tiempodis = this.time.now + 200;
               bullet.rotation=player.rotation;
         
               eliminabalastimer = this.time.now+50;
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
    if(!pausa)
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
    }
    if(pausa)
    {
      enemystrg.body.velocity.x=0;
    }
  },

  logicaocto:function()
  {
    if(!pausa)
    {
    octox=enemyocto.body.x + movotcx;
    octoy=enemyocto.body.y + movocty;
    this.game.physics.arcade.moveToXY(enemyocto,octox,octoy,175);
    movocty=-movocty;
    movotcx=-movotcx;
    }
  },
  logicaocto1:function()
  {
    if(!pausa)
    {
    octox1=enemyocto1.body.x + movotcx1;
    octoy1=enemyocto1.body.y + movocty1;
    this.game.physics.arcade.moveToXY(enemyocto1,octox1,octoy1,175);
    movocty1=-movocty1;
    movotcx1=-movotcx1;
    }
  },
  logicaocto2:function()
  {
    if(!pausa)
    {
    octox2=enemyocto2.body.x + movotcx2;
    octoy2=enemyocto2.body.y + movocty2;
    this.game.physics.arcade.moveToXY(enemyocto2,octox2,octoy2,175);
    movocty2=-movocty2;
    movotcx2=-movotcx2;
    }
  },
  logicaocto3:function()
  {
    if(!pausa)
    {
    octox3=enemyocto3.body.x + movotcx3;
    octoy3=enemyocto3.body.y + movocty3;
    this.game.physics.arcade.moveToXY(enemyocto3,octox3,octoy3,175);
    movocty3=-movocty3;
    movotcx3=-movotcx3;
    }
  },

  updateocto:function()
  {
    if(enemyocto.body.y >= octoy-2 && enemyocto.body.x<= octoy+2 )
    {
        enemyocto.body.velocity.y=0;
    }
    if(enemyocto.body.x >= octox-2 && enemyocto.body.x<= octox+2 )
    {
        enemyocto.body.velocity.x=0;
    }

    if(enemyocto1.body.y >= octoy1-2 && enemyocto1.body.x<= octoy1+2 )
    {
        enemyocto1.body.velocity.y=0;
    }
    if(enemyocto1.body.x >= octox1-2 && enemyocto1.body.x<= octox1+2 )
    {
        enemyocto1.body.velocity.x=0;
    }

    if(enemyocto2.body.y >= octoy2-2 && enemyocto2.body.x<= octoy2+2 )
    {
        enemyocto2.body.velocity.y=0;
    }
    if(enemyocto2.body.x >= octox2-2 && enemyocto2.body.x<= octox2+2 )
    {
        enemyocto2.body.velocity.x=0;
    }

    if(enemyocto3.body.y >= octoy3-2 && enemyocto3.body.x<= octoy3+2 )
    {
        enemyocto3.body.velocity.y=0;
    }
    if(enemyocto3.body.x >= octox3-2 && enemyocto3.body.x<= octox3+2 )
    {
        enemyocto3.body.velocity.x=0;
    }
  },

  logicaenemigosalto:function()
  {
    livingenemyjumps.length=0;

    enemyjumps.forEachAlive(function(enemyjump){livingenemyjumps.push(enemyjump)});

    for(var i=0;i<livingenemyjumps.length;i++){

      var enemyjumpo=livingenemyjumps[i];
      if(!pausa){
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
  if(pausa)
  {
    enemyjumpo.body.velocity.x=0;
  }
  }
  },
  mataenemigogrande:function(enemigo,bullet)
  {
    bullet.kill();
    enemysaltlife=enemysaltlife-1;
    if(enemysaltlife == 0)
    {
        this.enemydrop(enemigo);
        enemigo.kill();
        enemyd.play();
        enemysaltlife=5;
        puntos=puntos+100;
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
        vidas=vidas-1;
        vidaJugador=100;
        if(vidas>-1)
        {
          vidaJugador=100;
          this.ResetPositionP();
        }
        else
        {
          playeralive=false;
          player.kill();
        }
    }
  },
  mataenemigo:function(bullet,enemigo)
  {
    bullet.kill();
    this.enemydrop(enemigo);
    enemigo.kill();
    enemyd.play();
    puntos=puntos+25;
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
      this.enemydrop(enemigo);
      enemigo.kill();
      enemyd.play();
      puntos=puntos+50;
    }
  },
  mataenemigoocto1:function(enemigo,bullet)
  {
    bullet.kill();
    vidaocto1 = vidaocto1-1;
    if(vidaocto1<=0)
    {
      this.enemydrop(enemigo);
      enemigo.kill();
      enemyd.play();
      puntos=puntos+50;
    }
  },
  mataenemigoocto2:function(enemigo,bullet)
  {
    bullet.kill();
    vidaocto2 = vidaocto2-1;
    if(vidaocto2<=0)
    {
      this.enemydrop(enemigo);
      enemigo.kill();
      enemyd.play();
      puntos=puntos+50;
    }
  },
  mataenemigoocto3:function(enemigo,bullet)
  {
    bullet.kill();
    vidaocto3 = vidaocto3-1;
    if(vidaocto3<=0)
    {
      this.enemydrop(enemigo);
      enemigo.kill();
      enemyd.play();
      puntos=puntos+50;
    }
  },
  enemigoconcha:function() 
  {
    if(!pausa){
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
      var enemybullet;
     
          enemybullet= enemybullets.create(enemigo.body.x+20, enemigo.body.y+30,'enemybullet');
          enemybullet.body.velocity.x=velx;
          enemybullet.body.velocity.y=vely;
          dispaenem=this.time.now+200;
          eliminabalastimer=this.time.now+50;
     
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

        vidas=vidas-1;
        if(vidas>-1)
        {
          this.ResetPositionP();
          vidaJugador=100;
        }
        else
        {
          playeralive=false;
          player.kill();
        }
    }
  },
  logicatorretas:function()
  {
    if(!pausa)
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
  }
  },
  matatorreta:function(bullet,enemigo)
  {
    enemyd.play();
    bullet.kill();
    this.enemydrop(enemigo);
    enemigo.kill();
  },
  mataconch:function(bullet,enemigo)
  {
    enemyd.play();
    bullet.kill();
    this.enemydrop(enemigo);
    enemigo.kill();
    conch=false;
  },

  replacetiles:function()
  {
    if(player.body.x>=9040 && player.body.x<9200 && onetime)
    {
    map.replace(13,-3);
    onetime=false;
    }
  },
  zonaboss:function()
  {
    if(player.body.x>=10223 && zonabo)
    {
      map.replace(-3,13);
      map.setCollision(13,true);
      zonabo=false;
    }
  },

////BOSS///////
  bossfire:function(enemigo)
  {
    var bossbullet = bossbullets.getFirstExists(false);
    if (bossbullet && tienebala && bossalive)
    {
        bossbullet.reset(enemigo.body.x-2, enemigo.body.y+5);
        tienebala=false;
        atacabala=true;
        posbalx=player.body.x;
        posbaly=player.body.y;
    }
  },
  numeroAleatorio:function(min, max)
  {
    return Math.round(Math.random() * (max - min) + min);
  },
  numerosaltos:function()
  {
    if(!zonabo)
    {
    if(calculasaltos)
    {
    numsaltos=this.numeroAleatorio(1,4);
    calculasaltos=false;
    }
    }
  },
  bossfireing:function()
  {
    if(!zonabo)
    {
    finalboss.animations.play('dispboss');
    this.bossfire(finalboss);
    }
  },
  logicaboss:function()
  {
    if (!descansa)
    {
        if(numsaltos > 0)
        {
            saltox=player.body.x;
            saltoy= player.body.y;
            finalboss.body.velocity.y=-750;
            mueveboss=true;
            numsaltos=numsaltos-1;
            knockback=false;
        }
       
        saltalado=(saltox-finalboss.body.x)/movjefe;;
        if (numsaltos == 0)
        {
            descansa=true;
            calculasaltos=true;
        }
    }
    if (this.time.now >= tiempodescanso)
    {
        descansa=false;
        undesc=true;
    }
    return numsaltos;
  },
  balaboss:function(jefe,bala)
  {
    if(vuelve){
        bala.kill();
        vuelve=false;
        tienebala=true;
    }
  },
  logicabullet:function()
  {
    bossbullets.getFirstExists().angle +=10;
    this.physics.arcade.moveToXY(bossbullets.getFirstExists(),posbalx,posbaly,250);
    if(bossbullets.getFirstExists().x <= posbalx+3 && bossbullets.getFirstExists().x >=posbalx-3 )
    {
        atacabala=false;
        vuelve=true;
    }
    if(vuelve)
    {
        this.physics.arcade.moveToObject(bossbullets.getFirstExists(),finalboss,250);
    }
  },
  bossintocable:function()
  {
    if(this.time.now >= tiempbossinv)
    {
        finalboss.body.velocity.x=0;
        finalboss.alpha=1;
        bossinv=false;
    }
  },
  killboss:function(enemigo,bullet)
  {
    if(!bossinv)
    {
    bullet.kill();
    vidaboss=vidaboss-5;
    finalboss.alpha=0.5;
    if(bullet.body.velocity.x>0)
    {
        finalboss.body.velocity.x=finalboss.body.velocity.x+50;
    }
    else{
        finalboss.body.velocity.x=finalboss.body.velocity.x-50;
    }
    tiempbossinv=this.time.now + Phaser.Timer.SECOND*1.2;
    bossinv=true;
    }
    if(vidaboss == 0)
    {
        var dropboss=bossdrop.create(finalboss.body.x,finalboss.body.y,'bossdrop');
        dropboss.body.gravity.y=400;
        enemigo.kill();
        bossalive=false;
    }
  },
  updateboss:function()
  {
    if(!zonabo)
    {
    if (vidaboss<=25)
    {
        finalboss.tint=0xE21900;
        furioso=true;
        descanso=3.15;
    }
    if(!bossalive && !deadbullet && bossbullets.getFirstExists())
    {
    bossbullets.getFirstExists().kill();
    deadbullet=true;
    }
    if(!tienebala && bossalive)
    {
     this.logicabullet();
    }
    if(finalboss.body.onFloor())
    {
      finalboss.animations.play('iddleboss');
      if(this.logicaboss() === 0 && undesc)
      {
      tiempodescanso = this.time.now + Phaser.Timer.SECOND*descanso;
      undesc=false;
      }
      this.logicaboss();
    }
     else if(mueveboss && !finalboss.body.onFloor())
     {
     
     finalboss.body.velocity.x=saltalado;
     finalboss.animations.play('jumpboss');
    }
    if(finalboss.body.x>=saltox-3 && finalboss.body.x<=saltox+3 && !knockback)
    {
      finalboss.body.velocity.x=0;
      mueveboss=false;
      knockback = true;
    }
  }
  },
  bulletbosshitplayer:function(player,enemybullet)
  {
    if(!invulnerable)
    {
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
  enemydrop:function(enemmydrop)
  {
    drop=this.numeroAleatorio(1,11);
    if(drop>=5 && drop<=6)
    {
      var enemydrops=vidap.create(enemmydrop.body.x,enemmydrop.body.y,'vidapq');
      enemydrops.body.gravity.y =300;
      enemydrops.scale.setTo(2,2);
    }
    if(drop===7)
    {
      var enemydrops=vidag.create(enemmydrop.body.x,enemmydrop.body.y,'vidagr');
      enemydrops.body.gravity.y =300;
      enemydrops.scale.setTo(2,2);
    }
    if(drop>=8 && drop<=9)
    {
      var enemydrops= puntosp.create(enemmydrop.body.x,enemmydrop.body.y,'puntospq');
      enemydrops.body.gravity.y =300;
      enemydrops.scale.setTo(2,2);
    }
    if(drop===10)
    {
      var enemydrops= puntosg.create(enemmydrop.body.x,enemmydrop.body.y,'puntosgr');
      enemydrops.body.gravity.y =300;
      enemydrops.scale.setTo(2,2);
    }
    tiempoespera=this.time.now+100;
  },
  sumavidap:function(player,objeto)
  {
    objeto.kill();
    vidaJugador+=10;
    if(vidaJugador>100)
    {
    vidaJugador=100;
    }
  },
  sumavidag:function(player,objeto)
  {
    objeto.kill();
    vidaJugador+=25;
    if(vidaJugador>100)
    {
    vidaJugador=100;
    }
  },
  sumapuntosp:function(player,objeto)
  {
    objeto.kill();
    puntos+=100;
  },
  sumapuntosg:function(player,objeto)
  {
    objeto.kill();
    puntos+=250;
  },
  eliminadrops:function()
  {
    if(this.time.now>=tiempoespera){
    livingdrops.length=0;
    vidap.forEachAlive(function(vidapq){livingdrops.push(vidapq)});
    for(var i=0;livingdrops.length;i++)
    {
      var vidapqn=livingdrops[i];
      if(!vidapqn.inCamera)
      {
        vidapqn.kill();
      }

    }
    livingdrops.length=0;
    vidag.forEachAlive(function(vidagr){livingdrops.push(vidagr)});
    for(var i=0;livingdrops.length;i++)
    {
      var vidagrd=livingdrops[i];
      if(!vidagrd.inCamera)
      {
        vidagrd.kill();
      }
    }
    livingdrops.length=0;
    puntosp.forEachAlive(function(puntp){livingdrops.push(puntp)});
    for(var i=0;livingdrops.length;i++)
    {
      var pntspq=livingdrops[i];
      if(!pntspq.inCamera)
      {
        pntspq.kill();
      }
    }
    livingdrops.length=0;
    puntosg.forEachAlive(function(puntg){livingdrops.push(puntg)});
    for(var i=0;livingdrops.length;i++)
    {
      var pntgr=livingdrops[i];
      if(!pntgr.inCamera)
      {
        pntgr.kill();
      }
    }
  }
  },
  eliminabalas:function()
  {
    livingenemybullets.length=0;
    enemybullets.forEachAlive(function(enemybullet){livingenemybullets.push(enemybullet)});
    for(var i=0;i<livingenemybullets.length;i++)
    {
      var balaenemiga=livingenemybullets[i];
      if(!balaenemiga.inCamera)
      {
        balaenemiga.kill();
      }
    }
    livingplayerbullets.length=0;
    bullets.forEachAlive(function(bullet){livingplayerbullets.push(bullet)});
    for(var i=0;i<livingplayerbullets.length;i++)
    {
      var balajugador=livingplayerbullets[i];
      if(!balajugador.inCamera)
      {
        balajugador.kill();
      }
    }
  },
  finjuego:function(player,objeto)
  {
    objeto.kill();
    this.state.start('Boot');
  },
}
