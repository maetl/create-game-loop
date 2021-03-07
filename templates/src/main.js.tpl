import { input } from "./input.js";
import { update } from "./update.js";
import { render } from "./render.js";

{% assign style = "mixed" %}
{% case style %}
{% when "oo" %}
// Not implemented
{% when "fp" %}
const gameState = {};

function gameLoop() {
  render(update(input(gameState)));
  requestAnimationFrame(gameLoop);
}
{% when "mixed" %}
function gameLoop() {
  input();
  update();
  render();
  requestAnimationFrame(gameLoop);
}
{% else %}
// Not implemented
{% endcase %}

requestAnimationFrame(gameLoop);
