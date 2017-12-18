Game.Level1 = function(game) {};

var map;
var layer;

Game.Level1.prototype = {

  create:function() {

    this.stage.backgroundColor = '#00CC00';

    map = this.add.tilemap('map');

    map.addTilesetImage('mundo1','tileset');

    layer = map.createLayer(0);

    layer.resizeWorld();

  },

  update:function() {

  },

}
