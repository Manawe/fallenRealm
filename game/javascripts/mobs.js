// function Mob (){
// 	var list = [];
// 	var selected = false;
//
// 	//Draws object from list into ctxMoving canvas
// 	var draw = function(){
// 		for(var i in list){
// 			i = list[i]; //{x: 192, y: 128, mapX: 27, mapY: -14}
// 			var randomize = Math.floor(Math.random() * 40) ;
// 			ctxMoving.drawImage(mob, i.x, i.y, 32, 32, i.mapX, i.mapY, 32, 32);
// 		}
// 	},
//
// 	proximity: function(i){
// 		var p = Player;
// 		if( ( p.x + 100 > i.mapX &&  p.x - 100 < i.mapX )&& ( p.y + 100 > i.mapY &&  p.y - 100 < i.mapY) ) {
// 			return true;
// 		}
// 	},
//
// 	//when mob is close to player within a range, it should move towards player
// 	move: function() {
// 		for(var c in this.list){
// 			//if mob is selected move selection too
// 			var i = this.list[c];
// 			if( Engine.selectedObject != "undefined" && Engine.selectedObject.x - 27 == i.mapX
//       && Engine.selectedObject.y - 34 == i.mapX ){
// 				this.selected = true;
// 			}
// 			if(this.proximity(i)) {
// 				//prevents movement if mob already on that square
// 				for(var z in this.list){
// 					var o = this.list[z];//old map
// 					if (c != z ) {
// 						if((i.mapY == o.mapY  ) && (i.mapX == o.mapX  )){
// 							i.mapX -= 54;
// 							i.mapY -= 28;
// 							if(this.selected){
// 								Engine.selectedObject.x = i.mapX;
// 								Engine.selectedObject.y = i.mapY;
// 								this.selected = false;
// 							}
// 							break;
// 						}
// 					}
// 				}
// 				if(Player.x + 54 < i.mapX ) {
// 					i.mapX -= 54;
//
// 				} else if(Player.x - 54 > i.mapX ) {
// 					i.mapX += 54;
//
// 				}
// 				if( Player.y + 34 < i.mapY ) {
// 					i.mapY -= 28;
//
// 				} else if( Player.y -34 > i.mapY  ) {
// 				i.mapY += 28;
//
// 				}//move down
// 				if(this.selected){
// 					Engine.selectedObject.x = i.mapX;
// 					Engine.selectedObject.y = i.mapY;
// 					this.selected = false;
// 				}
// 			}
//
// 		}
// 	}
// }
