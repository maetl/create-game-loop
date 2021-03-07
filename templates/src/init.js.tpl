function spawnMob(pos, faction, weapon) {
  const mob = {
    x: pos.x,
    y: pos.y,
    faction: faction,
    weapon: weapon,
    health: 10
  };

  mobs.push(mob);

  const index = pos.x + width * pos.y;
}

function generateMap() {
  map.fill(Tiles.Floor);
  // map[330] = Tiles.Wall;
  // map[331] = Tiles.Wall;
  // map[332] = Tiles.Wall;
  // map[333] = Tiles.Wall;
  // map[334] = Tiles.Wall;
  // map[335] = Tiles.Wall;
  // map[336] = Tiles.Wall;
  // map[337] = Tiles.Wall;
  // map[740] = Tiles.Wall;
  // map[741] = Tiles.Wall;
  // map[742] = Tiles.Wall;
  // map[780] = Tiles.Wall;
  // map[782] = Tiles.Wall;
}

function generateMobs() {
  spawnMob({x:12, y: 7}, "Steel", "bow");
  spawnMob({x: 11, y: 22}, "Coral", "bow");
  spawnMob({x: 29, y: 7}, "Coral", "bow");
  spawnMob({x: 13, y: 8}, "Steel", "bow");
  spawnMob({x: 14, y: 9}, "Steel", "bow");
  spawnMob({x: 12, y: 9}, "Steel", "bow");
  spawnMob({x: 4, y: 4}, "Gunslinger", "pistol");
}

function init() {
  generateMap();
  generateMobs();
}

export {
  init
}
