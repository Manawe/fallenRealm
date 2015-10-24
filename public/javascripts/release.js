//Canvas on which map is displayed. Those files once rendered stay the same.
var groundTilesCanvas = $("#groundTilesCanvas")[0];
var ctxGround = groundTilesCanvas.getContext('2d');

var objectTilesCanvas = $("#objectTilesCanvas")[0];
var ctxObject = objectTilesCanvas.getContext('2d');

var movingObjectCanvas = $("#movingObjectCanvas")[0];
var ctxMoving = movingObjectCanvas.getContext('2d');

{
	var imgGround = new Image();
	imgGround.src = "https://rpgssl.r.worldssl.net/sheet/ground.gif";

	var imgMob = new Image();
	imgMob.src = "https://rpgssl.r.worldssl.net/sheet/dg_uniques32.gif";

	var imgPlayer = new Image();
	imgPlayer.src = "https://rpgssl.r.worldssl.net/sheet/pets.gif";

	var imgObjects = new Image();
	imgObjects.src = "https://rpgssl.r.worldssl.net/sheet/pots_crates.gif";

	var imgTop = new Image();
	imgTop.src = "https://rpgssl.r.worldssl.net/sheet/ground_tops.gif";

	var imgSelect = new Image();
	imgSelect.src = "https://rpgssl.r.worldssl.net/selected.png"
};

var groundTiles = function(){
	var mapX= -27, mapY= -14, row= 1;
	function generateGroundTiles(){
		var randmize, randmX, objectRandom;
		for(var i = 0; i < 2200; i++){
			randomize = Math.floor(Math.random() * (8 - 0)) + 0;
			randomX = 54 * randomize;
			ctxGround.drawImage(imgGround, randomX, 0, 54, 34, mapX, mapY, 54, 34);
			objectRandom = Math.floor(Math.random() * ( 10 - 0)) + 0;

			if( objectRandom == 0 || objectRandom > 7)	{
				drawObject(randomize);
			}
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
		}
	}

	function drawObject(randomize) {
		mapY -= 21;
		if(randomize >= 5){
			var randomX = 54 * (Math.floor(Math.random() * ( 8 - 1)) + 1);
			ctxObject.drawImage(imgObjects, randomX, 49, 54, 49, mapX, mapY, 54, 49);
		} else {
			var randomX = 54 * ( Math.floor(Math.random() * ( 12 - 2)) + 2 );
			ctxGround.drawImage(imgTop, randomX, 392, 54, 49, mapX, mapY, 54, 49);
		}
		mapY += 21;
  }

  //Render map on canvas
  generateGroundTiles();
}
groundTiles();
groundTiles();

//Classical Prototypal

//Define constructor for map object
var MapObject = {
  type: "groundObject",
  name: "MapObjectDefault",
  img:{
    file: "fileName.png",
    x: 0,
    y: 0,
  },
  property:{
    collide: true,
  }
}

var Monster = Object.create(MapObject);
Monster = Monster.prototype = {
  type: "monsterObject",
  img: {
    file: "fileName.png",
  },
  property: {
    stats: {
      health: 10,
      strength: 10,
      magic: 10,
    }
  }
}
//var banana = Object.create(Monster.prototype);


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

var Engine = {
	FPS: 30,
	movementInProgress: false,

	movePlayer: function(coordinateX, coordinateY){
		if(!Engine.movementinprogress){
			player.x += coordinateX;
		  player.y += coordinateY;
			Engine.movementInProgress = true;

			function calculateDelay(){
				Engine.movementInProgress = false;
			}

			setTimeout( calculateDelay(), 200)
		}
	},

	doKeyDown: function (evt){
	  switch (evt.keyCode) {
		case 87:  /* Up arrow was pressed */
			if(	player.y  > 0) Engine.movePlayer(0, -14);;//28
		  break;
		case 83:  /* Down arrow was pressed */
			if(	player.y < 800) Engine.movePlayer(0, 14);
		  break;
		case 65:  /* Left arrow was pressed */
			if(	player.x > 0) Engine.movePlayer(-27, 0);
		  break;
		case 68:  /* Right arrow was pressed */
			if(	player.x < 1920)
			Engine.movePlayer(27, 0);
		  break;
	  }
	},

	mouseClick: function( a ){
		var mapX= -27;
		var mapY= -14;
		var row= 1;
		//Draws objects
		for(var i = 0; i < 2200; i++){
			if(a.x < mapX && a.y < mapY ) {
				movingObjectCanvas.drawImage(selectObject, 0, 0, 54, 49, mapX - 54, mapY - 28, 54, 49);
				break;
			}
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
		}
		this.selectedObject = {'x': a.x, 'y': a.y};
	},

	selectedObject: "undefined",

	update: function( ) {
	//	movingObjectCanvas.clearRect(0, 0, 1920, 800);
	//	player.draw( );
	},

	a: setInterval(function() {
		Engine.update();
	}, 1000/ this.FPS),

	eventListeners: function() {
	window.addEventListener('keyup',Engine.doKeyDown);
	window.addEventListener('click', function(evt){Engine.mouseClick(evt)}, false);
	//monitorEvents($("body"), "click");
	}
};
	Engine.eventListeners();
