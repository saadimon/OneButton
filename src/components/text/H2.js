import React from 'react';
import {Text} from 'react-native';
import variables from '../../util/variables';
function H2({children, style}) {
  return (
    <Text
      style={{
        fontFamily: variables.font_Archivo_Black,
        fontSize: variables.getSize(42),
        fontWeight: variables.fontWeight_normal,
        ...style,
      }}>
      {children}
    </Text>
  );
}

export default H2;
