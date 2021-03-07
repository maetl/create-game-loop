import Game from "./game.js";

{% if preset.engine.updateStrategy == "priority-turn" %}

{% render "updates/priority-turn.js.tpl" %}

export {
  update: priorityTurnUpdate(Game.entities, Game.items, Game.effects)
}
{% else %}

function update() {
  if (action) {
    player.x = player.x + action[0];
    player.y = player.y + action[1];
    action = null;
    computeFov();

    for (let i=0; i<mobs.length; i++) {
      respond(sense(mobs[i]))
    }

    while (mob = cleanupMobs.pop()) {
      if (mob.isDead) {
        const index = mobs.indexOf(mob);
        mobs.splice(index, 1);
      }
    }
  }
}

export {
  update
}

{% endif %}
