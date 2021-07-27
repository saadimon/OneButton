import React from 'react';
import {Text} from 'react-native';
import variables from '../../util/variables';
function H1({children, light, style}) {
  return (
    <Text
      style={{
        fontFamily: variables.font_Archivo_Black,
        fontSize: variables.getSize(48),
        fontWeight: variables.fontWeight_normal,
        textShadowColor: 'rgba(104, 104, 104, 0.25)',
        textShadowOffset: {width: 0, height: 8},
        textShadowRadius: 18,
        letterSpacing: -4,
        color: light ? variables.colorWhite : variables.colorBlack,
        ...style,
      }}>
      {children}
    </Text>
  );
}

export default H1;
