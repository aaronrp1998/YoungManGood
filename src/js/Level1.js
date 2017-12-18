Game.Level1 = function(game) {};

var map;
var layer;

Game.Level1.prototype = {

  create:function() {

    this.stage.backgroundColor = '#00CC00';

    map.addTilesetImage('tileset');

    layer = map.createLayer(0);

    layer.resizeWorld();

  },

  update:function() {

  },

}
