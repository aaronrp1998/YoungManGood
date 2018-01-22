


logicaenemigosaltofuerte:function(){
  enemy3.body.velocity.y=-600;
 if(enemy3.body.x-player.body.x < 0) {
     enemy3.scale.x=1;
     enemy3.body.velocity.x=20;
 }
 else if (enemy3.body.x-player.body.x > 0) {
    enemy3.scale.x=-1;
    enemy3.body.velocity.x=-20;
 }
 else{
     enemy3.body.velocity.x=0;
 }
}
