Game.Level1 = function(game) {};

var map;
var layer;

Game.Level1.prototype = {

  create:function() {

    this.stage.backgroundColor = '#00CC00';

    map = this.add.tilemap('mario');

    map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');

    layer = map.createLayer('World1');

    layer.resizeWorld();

  },

  update:function() {

  },

}
