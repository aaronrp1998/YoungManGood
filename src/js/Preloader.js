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

    this.load.image('tileset', 'images/super_mario.png');

    this.load.image('megaman', 'images/Megaman.png')

  },

  create:function() {

    this.state.start('Level1');

  }
}
