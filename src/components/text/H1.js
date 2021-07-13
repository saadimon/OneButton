import React from 'react';
import {Text} from 'react-native';
import variables from '../../util/variables';
function H1({children}) {
  return (
    <Text
      style={{
        fontFamily: variables.headingFont,
        fontSize: 48,
        fontWeight: variables.fontWeightNormal,
        textShadowColor: 'rgba(104, 104, 104, 0.25)',
        textShadowOffset: {width: 0, height: 8},
        textShadowRadius: 18,
      }}>
      {children}
    </Text>
  );
}

export default H1;
