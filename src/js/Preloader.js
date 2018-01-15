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

    this.load.tilemap('map', 'images/BossTiled.csv');

    this.load.image('tileset', 'images/Image3.png');

    this.load.spritesheet('player', 'images/Image.png', 32, 40);

    this.load.audio('musica', 'audio/musica.mp3');

    this.load.image('enemy1','images/enemy.png');

    this.load.image('bullet', 'assets/bullet.png');

    this.load.image('torreta','assets/torreta.png');

    this.load.image('boss','assets/Boss.png');

    this.load.image('bossbullet','assets/comecocos.png');

    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);

  },

  create:function() {

    this.state.start('Level1Boss');

  }
}
