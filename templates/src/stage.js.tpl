function isWalkable(pos) {
  if (pos.x < 0 || pos.x >= width) return false;
  if (pos.y < 0 || pos.y >= height) return false;

  const index = pos.x + width * pos.y;

  if (!map[index]) return false;

  switch (map[index].char) {
    case ".": return true;
    case "#": return false;
    default: return false;
  }
}

function getWalkablePositions(mob) {
  const targets = [];
  for (direction of Directions.cardinal) {
    const pos = {
      x: mob.x + direction.x,
      y: mob.y + direction.y
    }
    if (isWalkable(pos)) targets.push(pos);
  }
  return targets;
}


export {
  getWalkablePositions
}
