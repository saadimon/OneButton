import React from 'react';
import {Text} from 'react-native';
import variables from '../../util/variables';

export const defaultH4Styles = {
  fontFamily: variables.font_Roboto_Regular,
  fontSize: variables.getSize(18),
  fontWeight: variables.fontWeight_normal,
};

function H4({children, style}) {
  return (
    <Text
      style={{
        ...defaultH4Styles,
        ...style,
      }}>
      {children}
    </Text>
  );
}

export default H4;
