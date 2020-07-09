import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Box extends Component {
  render() {
    const {
      id,
      size: {width, height},
    } = this.props;

    const x = this.props.position.x - width / 2;
    const y = this.props.position.y - height / 2;

    return (
      <View
        style={{
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
          backgroundColor: this.props.color || 'grey',
        }}>
        <Text>{id}</Text>
      </View>
    );
  }
}
