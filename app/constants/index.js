import {Dimensions} from 'react-native';
import {blockSize} from './map';

export default {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  GAP_SIZE: 320,
  PIPE_WIDTH: 100,
  PLAYER_WIDTH: blockSize * 1.2,
  PLAYER_HEIGHT: blockSize * 1.6,
};
