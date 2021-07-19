import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import variables from '../../util/variables';

const GameButton = ({size = 350, onPress, ...props}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={onPress} {...props}>
        <View
          style={{
            borderRadius: variables.getSize(9999),
            backgroundColor: '#2A005F',
            width: variables.getSize(size),
            height: size,
          }}>
          <View
            style={{
              margin: variables.getSize(32),
              backgroundColor: '#3D008A',
              borderRadius: variables.getSize(9999),
              flex: 1,
            }}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GameButton;
