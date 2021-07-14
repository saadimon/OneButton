import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import Landing from './src/components/pages/Auth/Landing';
import AppNavigator from './src/navigation/AppNavigator';
import variables from './src/util/variables';

const App: () => Node = () => {
  const backgroundStyle = {
    backgroundColor: '#fff',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        backgroundColor={variables.colorWhite}
        barStyle={'dark-content'}
      />
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;
