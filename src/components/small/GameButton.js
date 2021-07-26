import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import variables from '../../util/variables';

const GameButton = ({size = 300, onPress, ...props}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity onPress={onPress} {...props}>
        <View
          style={{
            borderRadius: variables.getSize(9999),
            backgroundColor: variables.colorPurpleDark2,
            width: variables.getSize(size),
            height: size,
          }}>
          <View
            style={{
              margin: variables.getSize(32),
              backgroundColor: variables.colorPurpleDark,
              borderRadius: variables.getSize(9999),
              flex: 1,
            }}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GameButton;
