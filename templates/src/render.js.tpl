function isVisible(x, y) {
  return visibleTiles.has(`${x},${y}`);
}

function renderMap() {
  for (const [index, mapTile] of map.entries()) {
    const x = Math.floor(index % width);
    const y = Math.floor(index / width);
    const tile = (isVisible(x, y)) ? mapTile : Tiles.Hidden;
    terminal.writeGlyph(x, y, tile);
  }
}

function renderMobs() {
  for (const mob of mobs) {
    if (!mob) continue;
    if (isVisible(mob.x, mob.y)) {
      const tile = Tiles[mob.faction] || Tiles.Coral;
      terminal.writeGlyph(mob.x, mob.y, tile);
    }
  }

  terminal.writeGlyph(player.x, player.y, Tiles.Player);
}

function renderEffects() {
  const completed = [];
  for (effect of effects) {
    const particles = effect.process();
    if (particles) {
      console.log(particles)
      for (particle of particles) {
        terminal.writeGlyph(particle.position.x, particle.position.y, particle.glyph);
      }
    } else {
      completed.push(effect);
    }
  }

  while (effect = completed.pop()) {
    effects.splice(effects.indexOf(effect), 1);
  }
}

function render() {
  renderMap();
  renderMobs();
  renderEffects();
  terminal.render();
}

export {
  render
}
