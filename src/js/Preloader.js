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

    this.load.tilemap('mario', 'images/super_mario.json', null, Phaser.Tilemap.TILED_JSON);

    this.load.image('tiles', 'images/super_mario.png');

  },

  create:function() {

    this.state.start('Level1');

  }
}
