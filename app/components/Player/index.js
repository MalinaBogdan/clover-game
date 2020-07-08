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
      <View
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
        }}
      />
    );
  }
}
