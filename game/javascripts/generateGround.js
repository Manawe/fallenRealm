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

function groundTiles(){
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
