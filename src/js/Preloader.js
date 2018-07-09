Game.Preloader = function(game){

  this.preloadBar = null;

};

Game.Preloader.prototype = {

  preload:function(){

    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,'preloaderBar');

    this.preloadBar.anchor.setTo(0.5,0.5);

    this.timeadvancedTiming = true;

    this.load.setPreloadSprite(this.preloadBar);

    //LOAD ASSETS

    this.load.tilemap('map', 'images/tilemapBueno.csv');

    this.load.image('tileset', 'images/Image3.png');

    this.load.spritesheet('player', 'images/Imagee.png', 32, 40);

    this.load.spritesheet('bossS','images/BossSprite.png',55,71);

    this.load.spritesheet('button','images/button.png',193, 71);

    this.load.image('fondo','images/fondo.png');

    this.load.image('bullet', 'images/bullet.png');

    this.load.image('bossdrop', 'images/bossdrop.png');

    this.load.image('enemy1','images/enemy.png');

    this.load.image('enemy2','images/enemy1.png');

    this.load.image('enemy3','images/enemy2.png');

    this.load.image('enemy4','images/enemy3.png');

    this.load.image('enemy5','images/enemy4.png');

    this.load.image('torreta','images/torreta.png');

    this.load.image('vidapq','images/vidapeq.png');

    this.load.image('vidagr','images/vidagr.png');

    this.load.image('puntospq','images/puntospq.png');

    this.load.image('puntosgr','images/puntosgr.png');

    this.load.image('boss', 'images/Boss.png');

    this.load.image('enemybullet','images/enemybullet.png');

    this.load.image('bossbullet','images/comecocos.png');

    this.load.audio('musica', 'audio/musica.mp3');

    this.load.audio('jumps', 'audio/jump.mp3');

    this.load.audio('shots', 'audio/shot.mp3');

    this.load.audio('enemyd', 'audio/enemykill.mp3');

    this.load.audio('enemysh', 'audio/enemyshot.mp3');
  },

  create:function() {

    this.state.start('MainMenu');

  }
}
