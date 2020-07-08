import React, {Component} from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';

import {movePlayerByArrow} from '../../../utils/controls';

const interval = 200;

export default class Box extends Component {
  onPress() {
    const {player, direction} = this.props;

    movePlayerByArrow(direction, player);
  }
  onPressIn() {
    this.interval = setInterval(() => this.onPress(), interval);
  }
  onPressOut() {
    clearInterval(this.interval);
  }
  render() {
    const {label, style} = this.props;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.onPress()}
        onPressIn={() => this.onPressIn()}
        onPressOut={() => this.onPressOut()}>
        <View style={style}>
          <Text>{label}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
