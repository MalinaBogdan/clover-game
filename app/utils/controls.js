import Matter from 'matter-js';

import {deltaX, deltaY} from '../constants/controls';

export const movePlayer = (player, x, y) => {
  console.log(player, x, y);
  Matter.Body.setVelocity(player, {
    x,
    y,
  });
};

export const movePlayerByArrow = (direction, player) => {
  switch (direction) {
    case 'left': {
      movePlayer(player, -deltaX, 0);
      break;
    }
    case 'right': {
      movePlayer(player, deltaX, 0);
      break;
    }
    case 'up': {
      movePlayer(player, 0, deltaY);
      break;
    }
  }
};
