import _ from 'lodash';
import Matter from 'matter-js';

import {deltaX, deltaY} from '../constants/controls';

export const movePlayer = (player, x, y) => {
  Matter.Body.setVelocity(player.body, {
    x,
    y,
  });

  // const mech = {};
  // mech.pos.x = player.body.position.x;
  // mech.pos.y = player.body.position.y;
  // mech.Vx = player.velocity.x;
  // mech.Vy = player.velocity.y;
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
      movePlayer(player, 0, -deltaY);
      break;
    }
  }
};
