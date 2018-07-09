Game.MainMenu=function(game){};


var buttonplay;
var fondo;

Game.Boot.prototype = {
create:function() 
    {
        buttonplay=this.add.button(this.world.centerX , this.world.centerY, 'button', actionOnClick, this, 2, 1, 0);
        fondo=this.add.sprite(0,0,'fondo');
    },
actionOnClick:function()
{
    this.state.start('Level1');
},
}