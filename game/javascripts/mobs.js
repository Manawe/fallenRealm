
var Mob = {
	list: [],
	selected: false,
	generate: function(){
		var mapX = -27;
		var mapY = -14;
		var row = 1;
		for(var i = 2200; i > 0; i--){
			var randomize = Math.floor(Math.random() * 100) ;
			mapX += 54;
			if (mapX >= 1920){
				row++;
				if(row % 2 == 0){
					mapY += 14;
					mapX = 0;
				} else if (row % 2 == 1){
					mapY += 14;
					mapX = -27;
				}
			}
			if(randomize == 0){
				var randomX = 32 * Math.floor(Math.random() * (7 - 0)) + 0;
				var randomY = 32 * Math.floor(Math.random() * (6 - 0)) + 0;
				//ctxGroundPlayer.drawImage(mob, randomX, randomY, 32, 32, mapX-14, mapY, 32, 32);
				this.list.push({'x':randomX, 'y':randomY, 'mapX': mapX -14, 'mapY': mapY});
			}
		}
	},

	draw: function(){
		for(var i in this.list){
			i = this.list[i]; //{x: 192, y: 128, mapX: 27, mapY: -14}
			//console.log(i);
			var randomize = Math.floor(Math.random() * 40) ;
			ctxGround.drawImage(mob, i.x, i.y, 32, 32, i.mapX, i.mapY, 32, 32);
		}
	},

	proximity: function(i){
		var p = Player;
		if( ( p.x + 100 > i.mapX &&  p.x - 100 < i.mapX )&& ( p.y + 100 > i.mapY &&  p.y - 100 < i.mapY) ) {
			return true;
		}
	},

	move: function() {
		for(var c in this.list){
			//if mob is selected move selection too
			var i = this.list[c];
			if( Engine.selectedObject != "undefined" && Engine.selectedObject.x - 27 == i.mapX
      && Engine.selectedObject.y - 34 == i.mapX ){
				this.selected = true;
			}
			if(this.proximity(i)) {
				//prevents movement if mob already on that square
				for(var z in this.list){
					var o = this.list[z];//old map
					if (c != z ) {
						if((i.mapY == o.mapY  ) && (i.mapX == o.mapX  )){
							i.mapX -= 54;
							i.mapY -= 28;
							if(this.selected){
								Engine.selectedObject.x = i.mapX;
								Engine.selectedObject.y = i.mapY;
								this.selected = false;
							}
							break;
						}
					}
				}
				if(Player.x + 54 < i.mapX ) {
					i.mapX -= 54;

				} else if(Player.x - 54 > i.mapX ) {
					i.mapX += 54;

				}
				if( Player.y + 34 < i.mapY ) {
					i.mapY -= 28;

				} else if( Player.y -34 > i.mapY  ) {
				i.mapY += 28;

				}//move down
				if(this.selected){
					Engine.selectedObject.x = i.mapX;
					Engine.selectedObject.y = i.mapY;
					this.selected = false;
				}
			}

		}
	}
};
