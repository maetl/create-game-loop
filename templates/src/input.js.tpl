let action;

const MoveUp = { id: "MoveUp", x: 0, y: -1 }
const MoveDown = { id: "MoveDown", x: 0, y: 1 }
const MoveLeft = { id: "MoveLeft", x: -1, y: 0 }
const MoveRight = { id: "MoveRight", x: 1, y: 0 }

function bindAction(key) {
  switch(key) {
    case "ArrowUp": action = MoveUp; break;
    case "ArrowDown": action = MoveDown; break;
    case "ArrowLeft": action = MoveLeft; break;
    case "ArrowRight": action = MoveRight; break;
  }
}

function inputLegacy(keyCode) {
  switch(keyCode) {
    case 37: action = [-1, 0]; break;
    case 38: action = [0, -1]; break;
    case 39: action = [1, 0]; break;
    case 40: action = [0, 1]; break;
    case 90: action = [0, 1]; break;
  }
}

document.addEventListener("keydown", (ev) => bindAction(ev.key));

function input() {
  let currentAction = action;
  action = null;
  return currentAction;
}

export {
  input
}
