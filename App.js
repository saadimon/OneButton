import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import H1 from './src/components/text/H1';

const App: () => Node = () => {
  const backgroundStyle = {
    backgroundColor: '#fff',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar backgroundColor="#fff" barStyle={'dark-content'} />
      <View style={{alignItems: 'center'}}>
        <H1>OneButton!</H1>
      </View>
    </SafeAreaView>
  );
};

export default App;
