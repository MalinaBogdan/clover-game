import Matter from 'matter-js';

import {blockSize} from '../constants/map';
import Box from '../components/Box';

const mapTypeToSize = (type, width, height) => {
  const mapping = {
    block: {height: blockSize, width: blockSize},
    floor: {width, height},
    edge: {width, height},
  };

  return mapping[type];
};

function getRenderer(type) {
  switch (type) {
    case 'block': {
      return Box;
    }
    default: {
      return Box;
    }
  }
}

let id = 0;
export function generateBlock({x, y, type, width, height, ...rest}) {
  const renderer = getRenderer(type);
  const {width: blockWidth, height: blockHeight} = mapTypeToSize(
    type,
    width,
    height,
  );

  return {
    type,
    ...rest,
    id: id++,
    position: {x, y},
    size: {width: blockWidth, height: blockHeight},
    renderer: renderer,
    body: Matter.Bodies.rectangle(x, y, blockWidth, blockHeight, {
      isStatic: true,
      isSensor: type === 'edge',
      label: type,
    }),
  };
}
