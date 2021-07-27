import React from 'react';
import {Text} from 'react-native';
import variables from '../../util/variables';
function H3({children, light, style}) {
  return (
    <Text
      style={{
        fontFamily: variables.font_Archivo_Black,
        fontSize: variables.getSize(30),
        fontWeight: variables.fontWeight_normal,
        color: light ? variables.colorWhite : variables.colorBlack,
        ...style,
      }}>
      {children}
    </Text>
  );
}

export default H3;
