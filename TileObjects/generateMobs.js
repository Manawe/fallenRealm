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
var banana = Object.create(Monster.prototype);
