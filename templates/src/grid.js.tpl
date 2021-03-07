function manhattanDistance(start, end) {
  return Math.abs(start.x - end.x) + Math.abs(start.y - end.y);
}

function chebyshevDistance(start, end) {
  return Math.max(Math.abs(end.x - start.x), Math.abs(end.y - start.y));
}

function lerpPoint(start, end, t) {
  return {
    x: start.x + t * (end.x-start.x),
    y: start.y + t * (end.y-start.y)
  }
}

function interpolateLine(from, to) {
  const points = [];
  const distance = chebyshevDistance(from, to);

  for (let step=0; step <= distance; step++) {
    const t = (distance == 0) ? 0.0 : step / distance;
    const point = lerpPoint(from, to, t);
    points.push({x: Math.round(point.x), y: Math.round(point.y)});
  }

  return points;
}

const Directions = {
  North: {x: 0, y: -1},
  East: {x: 1, y: 0},
  South: {x: 0, y: 1},
  West: {x: -1, y: 0},
  get cardinal() {
    return [this.North, this.South, this.East, this.West];
  }
}

return {
  Directions,
  interpolateLine,
  manhattanDistance,
  chebyshevDistance,
  lerpPoint
}
