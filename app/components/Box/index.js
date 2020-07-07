import React, {Component} from 'react';
import {View} from 'react-native';

export default class Box extends Component {
  render() {
    const {
      size: {width, height},
    } = this.props;

    const x = this.props.position.x - width / 2;
    const y = this.props.position.y - height / 2;

    return (
      <View
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: this.props.color || 'grey',
        }}
      />
    );
  }
}
