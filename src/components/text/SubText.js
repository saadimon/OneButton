import React from 'react';
import {Text} from 'react-native';
import variables from '../../util/variables';
function SubText({children, light, style}) {
  return (
    <Text
      style={{
        fontFamily: variables.font_Roboto_Regular,
        fontSize: variables.getSize(12),
        fontWeight: variables.fontWeight_normal,
        color: light
          ? variables.colorWhite + 'cc'
          : variables.colorBlack + 'cc',
        ...style,
      }}>
      {children}
    </Text>
  );
}

export default SubText;
