import { generateLevel, generateEntities } from "./{{ preset.contentBindings.game }}";

const Game = {
  entities: generateEntities(),
  level: generateLevel(),
  items: [],
  effects: []
};

export default Game;
