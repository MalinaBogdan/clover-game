import React, {Component} from 'react';
import {View, Image, Animated} from 'react-native';
// import Images from './assets/Images';

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.animatedValue = new Animated.Value(this.props.body.velocity.y);
  }

  render() {
    const width = 50;
    const height = 50;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    this.animatedValue.setValue(this.props.body.velocity.y);
    let rotation = this.animatedValue.interpolate({
      inputRange: [-10, 0, 10, 20],
      outputRange: ['-20deg', '0deg', '15deg', '45deg'],
      extrapolate: 'clamp',
    });

    // let image = Images['bird' + this.props.pose];

    return (
      <Animated.View
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          left: x,
          top: y,
          width: width,
          height: height,
          transform: [{rotate: rotation}],
        }}
      />
    );
  }
}
