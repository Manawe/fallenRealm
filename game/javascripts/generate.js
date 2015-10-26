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
