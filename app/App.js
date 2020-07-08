import _ from 'lodash';
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
import Arrow from './components/controls/Arrow';
import CameraRenderer from './components/CameraRenderer';

import Camera from './utils/camera';
import Physics from './utils/physics';
import constants from './constants';
import map from './constants/map';
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

    let player = Matter.Bodies.rectangle(
      constants.MAX_WIDTH / 2,
      constants.MAX_HEIGHT / 2,
      constants.PLAYER_WIDTH,
      constants.PLAYER_HEIGHT,
      {
        inertia: Infinity, //prevents player rotation
        friction: 0.002,
        frictionAir: 0.001,
        frictionStatic: 0.5,
        restitution: 0,
        sleepThreshold: Infinity,
      },
    );

    const camera = {
      offsetY: 0,
      offsetX: 0,
    };

    Matter.Body.setMass(player, 5);
    Matter.World.add(world, [player, ...map.map(({body}) => body)]);
    Matter.Events.on(engine, 'collisionStart', event => {
      const {bodyA} = _.cloneDeep(event.pairs[0]);
      // console.log(bodyA);

      if (bodyA.label === 'edge') {
        setTimeout(() => this.gameEngine.dispatch({type: 'game-over'}), 1000);
      }
    });

    return {
      ...map,
      camera,
      physics: {engine, world},
      player: {
        body: player,
        pose: 1,
        renderer: Player,
        size: {width: constants.PLAYER_WIDTH, height: constants.PLAYER_HEIGHT},
      },
    };
  };

  onEvent = e => {
    if (e.type === 'game-over') {
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
            <Arrow key={a.direction} {...a} player={this.entities.player} />
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
    opacity: 0.1,
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
