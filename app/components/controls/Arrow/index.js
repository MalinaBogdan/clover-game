import React, {Component} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {movePlayerByArrow} from '../../../utils/controls';

export default class Box extends Component {
  onPress() {
    const {player, direction} = this.props;
    movePlayerByArrow(direction, player);
  }
  render() {
    const {color, size, x, y, label} = this.props;

    return (
      <TouchableOpacity
        onPress={() => this.onPress()}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: size,
          height: size,
          backgroundColor: color || 'grey',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{label}</Text>
      </TouchableOpacity>
    );
  }
}
