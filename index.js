import React from 'react';
import {AppRegistry, SafeAreaView} from 'react-native';

import App from './app';
import {name as appName} from './app.json';

const CloverGame = () => {
  return (
    <SafeAreaView>
      <App />
    </SafeAreaView>
  );
};

AppRegistry.registerComponent(appName, CloverGame);
