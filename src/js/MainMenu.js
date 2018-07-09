Game.MainMenu=function(game){};


var buttonplay;
var fondo;

Game.MainMenu.prototype = {
create:function() 
    {
        fondo=this.add.sprite(0,0,'fondo');
        buttonplay=this.add.button(this.world.centerX , this.world.centerY, 'button', this.actionOnClick, this, 2, 1, 0);
    },
actionOnClick:function()
{
    this.state.start('Level1');
},
}