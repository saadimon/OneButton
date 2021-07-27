import React from 'react';
import {Text} from 'react-native';
import variables from '../../util/variables';
function H2({children, light, style}) {
  return (
    <Text
      style={{
        fontFamily: variables.font_Archivo_Black,
        fontSize: variables.getSize(42),
        fontWeight: variables.fontWeight_normal,
        color: light ? variables.colorWhite : variables.colorBlack,
        ...style,
      }}>
      {children}
    </Text>
  );
}

export default H2;
