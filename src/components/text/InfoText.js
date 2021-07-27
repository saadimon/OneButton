import React from 'react';
import {Text} from 'react-native';
import variables from '../../util/variables';
function InfoText({children, light, style}) {
  return (
    <Text
      style={{
        fontFamily: variables.font_Archivo,
        fontSize: variables.getSize(20),
        fontWeight: variables.fontWeight_bold,
        color: light
          ? variables.colorWhite + 'cc'
          : variables.colorBlack + 'cc',
        ...style,
      }}>
      {children}
    </Text>
  );
}

export default InfoText;
