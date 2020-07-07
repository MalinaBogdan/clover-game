import constants from './index';
import {generateBlock} from '../utils/map';

export const blockSize = 50;
export default [
  {
    x: constants.MAX_WIDTH / 2,
    y: constants.MAX_HEIGHT,
    width: constants.MAX_WIDTH * 10,
    height: 10,
    type: 'edge',
    color: 'red',
  },
  {
    x: constants.MAX_WIDTH / 2,
    y: constants.MAX_HEIGHT - blockSize,
    width: constants.MAX_WIDTH,
    height: blockSize,
    type: 'floor',
  },
  {
    x: 0,
    y: 0,
    type: 'block',
  },
  {
    x: 1 * blockSize,
    y: 5 * blockSize,
    type: 'block',
  },
  {
    x: 2 * blockSize,
    y: 6 * blockSize,
    type: 'block',
  },
  {
    x: 3 * blockSize,
    y: 7 * blockSize,
    type: 'block',
  },
].map(b => generateBlock(b));
