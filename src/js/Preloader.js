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

    this.load.tilemap('mapBoss', 'images/BossTiled.csv');

    this.load.image('tileset', 'images/Image3.png');

    this.load.spritesheet('player', 'images/Image.png', 32, 40);

    this.load.image('enemy3', 'images/enemy3.png');

    this.load.audio('musica', 'audio/musica.mp3');

  },

  create:function() {

    this.state.start('Level1');

  }
}
