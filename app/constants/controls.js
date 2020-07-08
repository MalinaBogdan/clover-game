import {MAX_WIDTH, MAX_HEIGHT} from './index';

const margin = 65;
export const arrowSize = 60;
export const deltaX = 2.5;
export const deltaY = 10;
export const arrows = [
  {
    label: 'X',
    size: arrowSize,
    direction: 'left',
    style: {
      position: 'absolute',
      left: margin - margin,
      top: margin * 2,
      width: arrowSize,
      height: arrowSize,
      borderRadius: 50,
      backgroundColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    label: 'B',
    size: arrowSize,
    direction: 'right',
    style: {
      position: 'absolute',
      left: margin + margin,
      top: margin * 2,
      width: arrowSize,
      height: arrowSize,
      borderRadius: 50,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  {
    label: 'Y',
    size: arrowSize,
    direction: 'up',
    style: {
      position: 'absolute',
      left: margin,
      top: margin,
      width: arrowSize,
      height: arrowSize,
      borderRadius: 50,
      backgroundColor: 'yellow',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
];
