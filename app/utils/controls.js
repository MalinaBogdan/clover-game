import _ from 'lodash';
import Matter from 'matter-js';

import {deltaX, deltaY} from '../constants/controls';

export const movePlayer = (player, x, y) => {
  // Matter.Body.applyForce(player.body, player.body.position, {
  //   x: -player.body.velocity.x,
  //   y: -player.body.velocity.y,
  // });
  // Matter.Body.applyForce(player.body, player.body.position, {x, y});
  console.log(player.body.id, player.body.position.x);
  Matter.Body.setVelocity(player.body, {x, y});

  // Matter.Body.translate(player.body, {x, y});

  const gameDelta = 30;
  const vxMax = 7;
  const mass = 5;
  const fx = 0.004 * mass; //run Force on ground
  const fxAir = 0.006 * mass; //run Force in Air

  // if (player.body.velocity.x > -vxMax) {
  //   player.body.force.x = -fx / gameDelta;
  // }
  // if (player.body.velocity.x < vxMax) {
  //   player.body.force.x = fx / gameDelta;
  // }

  // if (player.body.velocity.x > -vxMax + 2) {
  //   player.body.force.x = -deltaX;
  // }

  // if (player.body.velocity.x < vxMax - 2) {
  //   player.body.force.x = deltaX;
  // }
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
