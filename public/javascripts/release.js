//Canvas on which map is displayed. Those files once rendered stay the same.
var groundTilesCanvas = $("#groundTilesCanvas")[0];
var ctxGround = groundTilesCanvas.getContext('2d');

var objectTilesCanvas = $("#objectTilesCanvas")[0];
var ctxObject = objectTilesCanvas.getContext('2d');

var movingObjectCanvas = $("#movingObjectCanvas")[0];
var ctxMoving = movingObjectCanvas.getContext('2d');

{
	//Images from rpg.mo.ee
	var imgGround = new Image();
	imgGround.src = "https://1239889624.rsc.cdn77.org/sheet/ground.gif";

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

// var Engine = {
// 	FPS: 30,
// 	movementInProgress: false,
//
// 	movePlayer: function(coordinateX, coordinateY){
// 		if(!Engine.movementinprogress){
// 			player.x += coordinateX;
// 		  player.y += coordinateY;
// 			Engine.movementInProgress = true;
//
// 			function calculateDelay(){
// 				Engine.movementInProgress = false;
// 			}
//
// 			setTimeout( calculateDelay(), 200)
// 		}
// 	},
//
// 	doKeyDown: function (evt){
// 	  switch (evt.keyCode) {
// 		case 87:  /* Up arrow was pressed */
// 			if(	player.y  > 0) Engine.movePlayer(0, -14);;//28
// 		  break;
// 		case 83:  /* Down arrow was pressed */
// 			if(	player.y < 800) Engine.movePlayer(0, 14);
// 		  break;
// 		case 65:  /* Left arrow was pressed */
// 			if(	player.x > 0) Engine.movePlayer(-27, 0);
// 		  break;
// 		case 68:  /* Right arrow was pressed */
// 			if(	player.x < 1920)
// 			Engine.movePlayer(27, 0);
// 		  break;
// 	  }
// 	},
//
// 	mouseClick: function( a ){
// 		var mapX= -27;
// 		var mapY= -14;
// 		var row= 1;
// 		//Draws objects
// 		for(var i = 0; i < 2200; i++){
// 			if(a.x < mapX && a.y < mapY ) {
// 				movingObjectCanvas.drawImage(selectObject, 0, 0, 54, 49, mapX - 54, mapY - 28, 54, 49);
// 				break;
// 			}
// 			mapX += 54;
// 			if (mapX >= 1920){
// 				row++;
// 				if(row % 2 == 0){
// 					mapY += 14;
// 					mapX = 0;
// 				} else if (row % 2 == 1){
// 					mapY += 14;
// 					mapX = -27;
// 				}
// 			}
// 		}
// 		this.selectedObject = {'x': a.x, 'y': a.y};
// 	},
//
// 	selectedObject: "undefined",
//
// 	update: function( ) {
// 	//	movingObjectCanvas.clearRect(0, 0, 1920, 800);
// 	//	player.draw( );
// 	},
//
// 	a: setInterval(function() {
// 		Engine.update();
// 	}, 1000/ this.FPS),
//
// 	eventListeners: function() {
// 	window.addEventListener('keyup',Engine.doKeyDown);
// 	window.addEventListener('click', function(evt){Engine.mouseClick(evt)}, false);
// 	//monitorEvents($("body"), "click");
// 	}
// };
// 	Engine.eventListeners();

var generate = function(){
	//var mapX= -27, mapY= -14, row= 1;
	var mapX= 27, mapY= 0, row= 1;
	//array which stores generated mobs;
	var mobs = [];
	var groundTiles = [];
	var onGroundTiles = [];
	var mapObjects = [];

	//returns a value
	function random(max, min){
		max = max || 7;
		min = min || 0;
		return Math.floor(Math.random() * (max - min + 1)) + min
	}

	function generateMob(){
		if(random(50) == 0){
			var randomX = 32 * random(7);
			var randomY = 32 * random(6);
			//ctxGroundPlayer.drawImage(mob, randomX, randomY, 32, 32, mapX-14, mapY, 32, 32);
			mobs.push({'x':randomX, 'y':randomY, 'mapX': mapX, 'mapY': mapY});
		}
	}

	function generateGroundTiles(){
		var randmoX, objectRandom;
		randomX = 54 * random(7);
		groundTiles.push({'x':randomX, 'mapX': mapX, 'mapY': mapY});
		objectRandom = random(10);
		if( objectRandom == 0 || objectRandom > 7)	{
			generateObject(random(8));
		}

		function generateObject(randomize) {
			mapY -= 21;
			if(randomize >= 5){
				var randomX = 54 * random(8, 1);
				onGroundTiles.push({'x':randomX, 'mapX': mapX, 'mapY': mapY});
			} else {
				var randomX = 54 * random(12, 2);
				mapObjects.push({'x':randomX, 'mapX': mapX, 'mapY': mapY});
			}
			mapY += 21;
		}
	}

	function generateAll(argument) {
		for(var i = 2200; i > 0; i--){
			generateMob();
			generateGroundTiles();
			mapX += 54;
			if (mapX >= 1920){
				row++;
				if(row % 2 == 0){
					mapY += 14;
					mapX = 0;
				} else if (row % 2 == 1){
					mapY += 14;
					mapX = 27;
				}
			}
		}
	}
	generateAll();

			//Draws object from list into ctxMoving canvas
	var render = function(){
		for(var i in mobs){
			i = mobs[i]; //{x: 192, y: 128, mapX: 27, mapY: -14}
			ctxMoving.drawImage(imgMob, i.x, i.y, 312, 32, i.mapX, i.mapY, 32, 32);
		}
		for(var i in groundTiles){
			i = groundTiles[i];
			ctxGround.drawImage(imgGround, i.x, 0, 54, 28, i.mapX, i.mapY, 54, 28);
		}

		for(var i in onGroundTiles){
			i = onGroundTiles[i];
			ctxGround.drawImage(imgTop, i.x, 0, 54, 28, i.mapX, i.mapY, 54, 28);
		}

		for(var i in mapObjects){
			i = mapObjects[i];
			ctxObject.drawImage(imgObjects, i.x, 0, 54, 49, i.mapX, i.mapY, 54, 49);
		}
	}
	return {
		render: render,
		mobs: mobs,
	}
}
generate().render();
