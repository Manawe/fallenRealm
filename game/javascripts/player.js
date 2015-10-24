
var player = function(){
  var x = 540 - 14, //initial localization when loading
  y = 340,
  speed= 1,
  color= "#00A",
  width= 20,
  height= 30,

  draw = function(){
    Mob.move();
    Mob.draw();
    movingObjectCanvas.drawImage(selectObject, 0, 0, 54, 49, Player.x-12, Player.y +10, 54, 49);
    movingObjectCanvas.drawImage(player1, 96, 64, 32, 32, Player.x, Player.y, 32, 32);
    if(Engine.selectedObject != "undefined" && Mob.selected == false) {
      Engine.mouseClick( Engine.selectedObject );
    };
  }

  return {
    draw: draw,
    x:x,
    y: y,
  }
}
