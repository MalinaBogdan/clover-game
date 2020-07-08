import _ from 'lodash';
import React, {Component} from 'react';
import {View} from 'react-native';
import SpriteSheet from 'rn-sprite-sheet';

export default class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {walking: false};
  }

  static getDerivedStateFromProps(props) {
    const {
      body: {velocity},
    } = props;

    return {
      walking: !!Math.floor(velocity.x),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {walking} = this.state;

    if (walking && !prevState.walking) {
      this.player.play({type: 'walk'});
    } else if (!walking && prevState.walking) {
      this.player.stop();
    }
  }

  render() {
    const {
      size: {width, height},
    } = this.props;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <SpriteSheet
        ref={ref => (this.player = ref)}
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
          walk: _.range(11),
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
