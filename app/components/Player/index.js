import React, {Component} from 'react';
import {View} from 'react-native';
import SpriteSheet from 'rn-sprite-sheet';

export default class Player extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      size: {width, height},
    } = this.props;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <SpriteSheet
        ref={ref => (this.mummy = ref)}
        source={require('../../assets/sprites/SPRITE3000.png')}
        columns={11}
        rows={1}
        viewStyle={{
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
        }}
        animations={{
          walk: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          // appear: Array.from({length: 15}, (v, i) => i + 18),
          // die: Array.from({length: 21}, (v, i) => i + 33),
        }}
      />
      // <View
      //   style={{
      //     backgroundColor: 'red',
      //     position: 'absolute',
      //     left: x,
      //     top: y,
      //     width: width,
      //     height: height,
      //   }}
      // />
    );
  }
}
