import React from 'react';
import {Text} from 'react-native';
import variables from '../../util/variables';
function P({children, light, bold, style}) {
  return (
    <Text
      style={{
        fontFamily: variables.font_Roboto_Regular,
        fontSize: variables.getSize(16),
        fontWeight: bold
          ? variables.fontWeight_bold
          : variables.fontWeight_normal,
        color: light ? variables.colorWhite : variables.colorBlack,
        ...style,
      }}>
      {children}
    </Text>
  );
}

export default P;
