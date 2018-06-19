Game.Level1Boss = function(game) {};

var mapBoss;
var layerBoss;

var player;
var controls = {};
var playerSpeed = 250;
var jumpTimer = 0;
var firebutton;
var playeralive=true;
var tiempoinv;
var invulnerable=false;
var vidajugador=100;
var dispderch=true;
var tiempodis=0;
var tiempo=0;
var bullets;

var movjefe=1.65;
var furioso=false;
var descanso=4.15;
var undesc=true;

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

Game.Level1Boss.prototype = {

  create:function() {

    this.stage.backgroundColor = '#2ECCFA';
    //2ECCFA

    mapBoss = this.add.tilemap('mapBoss',64,64);
    mapBoss.addTilesetImage('tileset');
    layerBoss = mapBoss.createLayer(0);
    layerBoss.resizeWorld();
    mapBoss.setCollisionBetween(13,39);
    mapBoss.setTileIndexCallback(12,this.SubirEscaleras,this);
    mapBoss.setTileIndexCallback(19,this.ResetPosition,this);


    player = this.add.sprite(64,321, 'player');
    player.anchor.setTo(0.5,0.5);
    player.animations.add('iddle',[0],1,true);
    player.animations.add('jump',[4],1,true);
    player.animations.add('run',[1,2,3],7,true);
    player.animations.add('stairs',[5,6,7],7,true);
    player.animations.add('stairsiddle'[6],1,true);
    player.animations.add('rundis',[9,10,11],7,true);
/*
    finalboss= game.add.sprite(3904, 321, 'boss');
    finalboss.anchor.setTo(0.5,0.1);
    game.physics.arcade.enable(finalboss);
    finalboss.body.gravity.y = 900;
    finalboss.body.collideWorldBounds = true;
*/


    this.physics.arcade.enable(player);
    this.camera.follow(player);
    player.scale.setTo(2,2);
    player.body.collisionWorldBounds = true;

    musica = this.add.audio('musica');
    musica.play();

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(6, 'bullet', 0, false);
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
/*
    bossbullets=game.add.group();
    bossbullets.enableBody = true;
    bossbullets.physicsBodyType = Phaser.Physics.ARCADE;
    bossbullets.createMultiple(30, 'bossbullet');
    bossbullets.setAll('anchor.x', 0.5);
    bossbullets.setAll('anchor.y', 0.5);
    bossbullets.setAll('outOfBoundsKill', true);
    bossbullets.setAll('checkWorldBounds', true);

    this.time.events.loop(Phaser.Timer.SECOND*2.5, bossfireing, this);
    this.time.events.loop(Phaser.Timer.SECOND*2, numerosaltos, this);
*/
    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.D),
      left: this.input.keyboard.addKey(Phaser.Keyboard.A),
      up: this.input.keyboard.addKey(Phaser.Keyboard.W),
      down: this.input.keyboard.addKey(Phaser.Keyboard.S),
      fireky: this.input.keyboard.addkey(Phaser.Keyboard.K),
    };

  },

  update:function() {

    this.physics.arcade.collide(player,layer);
    this.physics.arcade.gravity.y = 1400;

    player.body.velocity.x = 0;

    if(controls.right.isDown) {
      player.animations.play('run');
      player.scale.setTo(2,2);
      player.body.velocity.x += playerSpeed;
      dispderch=true;
    }
    if(controls.left.isDown) {
      player.animations.play('run');
      player.scale.setTo(-2,2);
      player.body.velocity.x -= playerSpeed;
      dispderch=false;
    }

    if(controls.fireky.isDown && playeralive){
      fire();
    }

    if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer){
      player.body.velocity.y = -800;
      jumpTimer = this.time.now + 750;
      player.animations.play('jump');
    }

    if(player.body.velocity.x == 0 && player.body.velocity.y == 0){
      player.animations.play('idle');
    }

    if (vidaboss<=25){
        finalboss.tint=0xE21900;
        furioso=true;
        descanso=3.15;
    }

    intocable();
    bossintocable();

    if(!bossalive && !deadbullet && bossbullets.getFirstExists()){
      bossbullets.getFirstExists().kill();
      deadbullet=true;
    }

    if(!tienebala && bossalive)
    {
      logicabullet();
    }

    if(hitPlatformboss){
      if(logicaboss()==0 && undexsc)
      {
        tiempodescanso = game.time.now + Phaser.Timer.SECOND*descanso;
        undesc=false;
      }
      logicaboss();
    } else if(mueveboss && !hitPlatformboss) {
      /// game.physics.arcade.moveToXY(finalboss,saltox,finalboss.body.y,250);
      finalboss.body.velocity.x=saltalado;
    }

    if(finalboss.body.x>=saltox-3 && finalboss.body.x<=saltox+3 && !knockback)
    {
      finalboss.body.velocity.x=0;
      mueveboss=false;
      knockback = true;
    }

    this.physics.arcade.overlap(finalboss, player, enemyhitplayer, null, this);
    this.physics.arcade.overlap(bullets, finalboss, killboss, null, this);
    this.physics.arcade.overlap(bossbullets, finalboss, balaboss, null, this);
    this.physics.arcade.overlap(bossbullets, player, bullethitplayer, null, this);

  },

  ResetPosition:function() {
    player.reset(64,321);
  },

  bossfire:function(enemigo){
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
/*bossangry:function(enemigo)
{
    var bossbullet = bossbullets.getFirstExists(false);
    if(bossbullet && bossalive && furioso)
    {
        bossbullet.reset(enemigo.body.x-2, enemigo.body.y+5);
        furioso=false;
        posbalx=player.body.x;
        posbaly=player.body.y;
    }
}*/
  bossfireing:function(){
    bossfire(finalboss);
  },

  fire:function() {
    if (game.time.now > tiempodis)
    {
    var bullet = bullets.getFirstExists(false);
      if (bullet){
             bullet.reset(player.body.x+10, player.body.y+30);
             if(dispderch){
                bullet.body.velocity.x=250;
             }
             else
             {
                bullet.body.velocity.x=-250;
             }
             tiempodis = game.time.now + 200;
             bullet.rotation=player.rotation;
        }
    }
  },

  resetBullet:function(bullet){
    bullet.kill();
  },

  enemyhitplayer:function(){
    if(!invulnerable){
    vidajugador=vidajugador-5;
    tiempoinv = game.time.now + Phaser.Timer.SECOND*2;
    player.alpha=0.5;
    invulnerable=true;
    }
    if(vidajugador <= 0)
    {
        player.kill();
        playeralive=false;
    }
  },

  bullethitplayer:function(player,enemybullet){
    if(!invulnerable){
    vidajugador=vidajugador-10;
    tiempoinv = game.time.now + Phaser.Timer.SECOND*2;
    player.alpha=0.5;
    invulnerable=true;
    }
    if(vidajugador <= 0)
    {
        player.kill();
        playeralive=false;
    }
  },

  intocable:function(){
    if(game.time.now >= tiempoinv)
    {
        player.alpha=1;
        invulnerable=false;
    }
  },

  killboss:function(enemigo,bullet){
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
    tiempbossinv=game.time.now + Phaser.Timer.SECOND*1.2;
    bossinv=true;
    }
    if(vidaboss == 0)
    {
        enemigo.kill();
        bossalive=false;
    }
  },

  bossintocable:function(){
    if(game.time.now >= tiempbossinv)
    {
        finalboss.body.velocity.x=0;
        finalboss.alpha=1;
        bossinv=false;
    }
  },

  numeroAleatorio:function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },

  numerosaltos:function(){
    if(calculasaltos){
    numsaltos=numeroAleatorio(1,4);
    calculasaltos=false;
    }
  },

  logicabullet:function(){
    bossbullets.getFirstExists().angle +=10;
    game.physics.arcade.moveToXY(bossbullets.getFirstExists(),posbalx,posbaly,250);
    if(bossbullets.getFirstExists().x <= posbalx+3 && bossbullets.getFirstExists().x >=posbalx-3 )
    {
        atacabala=false;
        vuelve=true;
    }
    if(vuelve)
    {
        game.physics.arcade.moveToObject(bossbullets.getFirstExists(),finalboss,250);
    }
  },

  balaboss:function(jefe,bala){
    if(vuelve){
        bala.kill();
        vuelve=false;
        tienebala=true;
    }
  },

  logicaboss:function() {
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
       /* if(finalboss.body.x-saltox >0){
            saltalado=(saltox-finalboss.body.x)/movjefe;
        }*/
        saltalado=(saltox-finalboss.body.x)/movjefe;;
        if (numsaltos == 0)
        {
            descansa=true;
            calculasaltos=true;
        }
    }
    if (game.time.now >= tiempodescanso)
    {
        descansa=false;
        undesc=true;
    }
    return numsaltos;
  }

}
