function spawnDeath(pos) {
  effects.push({
    frames: 5,
    frame: 0,
    process: function() {
      if (this.frame == this.frames) return false;
      const result = [];

      result.push({
        position: {
          x: pos.x + Directions.North.x * this.frame,
          y: pos.y + Directions.North.y * this.frame
        },
        glyph: Tiles.Splat
      });

      result.push({
        position: {
          x: pos.x + Directions.South.x * this.frame,
          y: pos.y + Directions.South.y * this.frame
        },
        glyph: Tiles.Splat
      });

      result.push({
        position: {
          x: pos.x + Directions.West.x * this.frame,
          y: pos.y + Directions.West.y * this.frame
        },
        glyph: Tiles.Splat
      });

      result.push({
        position: {
          x: pos.x + Directions.East.x * this.frame,
          y: pos.y + Directions.East.y * this.frame
        },
        glyph: Tiles.Splat
      });

      this.frame++;

      return result;
    }
  });
}

function spawnProjectile(path, tile) {
  effects.push({
    frames: path.length,
    frame: 0,
    process: function() {
      this.frame++;
      if (this.frame == this.frames) return false;
      return [{
        position: path[this.frame],
        glyph: tile
      }];
    }
  })
}

export {
  spawnDeath,
  spawnProjectile
}
