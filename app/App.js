import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Matter from 'matter-js';
import {GameEngine} from 'react-native-game-engine';

import Player from './components/Player';
import Box from './components/Box';
import Arrow from './components/controls/Arrow';
import CameraRenderer from './components/CameraRenderer';

import Camera from './utils/camera';
import Physics, {resetPipes} from './utils/physics';
import constants from './constants';
import {arrowSize, arrows} from './constants/controls';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      running: true,
      score: 0,
    };

    this.gameEngine = null;

    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;

    world.gravity.y = 0.0;

    const boxSize = Math.trunc(
      Math.max(constants.MAX_WIDTH, constants.MAX_HEIGHT) * 0.075,
    );

    let player = Matter.Bodies.rectangle(
      constants.MAX_WIDTH / 2,
      constants.MAX_HEIGHT / 2,
      constants.BIRD_WIDTH,
      constants.BIRD_HEIGHT,
    );

    const floor = Matter.Bodies.rectangle(
      constants.MAX_WIDTH / 2,
      constants.MAX_HEIGHT - boxSize / 2,
      constants.MAX_WIDTH,
      boxSize,
      {isStatic: true},
    );

    const camera = {
      offsetY: 0,
      offsetX: 0,
    };

    Matter.World.add(world, [player, floor]);
    Matter.Events.on(engine, 'collisionStart', event => {
      var pairs = event.pairs;

      // this.gameEngine.dispatch({type: 'game-over'});
    });

    return {
      camera,
      physics: {engine: engine, world: world},
      floor: {
        body: floor,
        size: [constants.MAX_WIDTH, boxSize],
        color: 'green',
        renderer: Box,
      },
      player: {body: player, pose: 1, renderer: Player},
    };
  };

  onEvent = e => {
    if (e.type === 'game-over') {
      //Alert.alert("Game Over");
      this.setState({
        running: false,
      });
    } else if (e.type === 'score') {
      this.setState({
        score: this.state.score + 1,
      });
    }
  };

  reset = () => {
    resetPipes();
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      running: true,
      score: 0,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <GameEngine
          ref={ref => {
            this.gameEngine = ref;
          }}
          style={styles.gameContainer}
          systems={[Physics, Camera]}
          running={this.state.running}
          onEvent={this.onEvent}
          entities={this.entities}
          renderer={CameraRenderer}>
          <StatusBar hidden={true} />
        </GameEngine>
        <View style={styles.arrowsContainer}>
          {arrows.map(a => (
            <Arrow {...a} player={this.entities.player.body} />
          ))}
        </View>
        {!this.state.running && (
          <TouchableOpacity
            style={styles.fullScreenButton}
            onPress={this.reset}>
            <View style={styles.fullScreen}>
              <Text style={styles.gameOverText}>Game Over</Text>
              <Text style={styles.gameOverSubText}>Try Again</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: constants.MAX_WIDTH,
    height: constants.MAX_HEIGHT,
  },
  arrowsContainer: {
    position: 'absolute',
    bottom: 100,
    right: 50,
    width: arrowSize * 3,
    height: arrowSize * 2,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gameOverText: {
    color: 'white',
    fontSize: 48,
  },
  gameOverSubText: {
    color: 'white',
    fontSize: 24,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 50,
    left: constants.MAX_WIDTH / 2 - 20,
    textShadowColor: '#444444',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
});
