import React from 'react';
import {Text} from 'react-native';
import variables from '../../util/variables';
function P({children, style}) {
  return (
    <Text
      style={{
        fontFamily: variables.font_Roboto_Regular,
        fontSize: variables.getSize(16),
        fontWeight: variables.fontWeight_normal,
        ...style,
      }}>
      {children}
    </Text>
  );
}

export default P;
